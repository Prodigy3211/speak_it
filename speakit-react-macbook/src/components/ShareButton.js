import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import supabase from '../server/supabaseClient';
import { Helmet } from 'react-helmet';

const ShareButton = ({ claimId }) => {
    const [showCopied, setShowCopied] = useState(false);
    const [claim, setClaim] = useState(null);

    useEffect(() => {
        const fetchClaim = async () => {
            if (!claimId) return;
            
            const { data, error } = await supabase
                .from('claims')
                .select('title', 'content')
                .eq('id', claimId)
                .single();
            
            if (error) {
                console.error('Error fetching claim:', error);
            } else {
                setClaim(data);
            }
        };
        fetchClaim();
    }, [claimId]);

    const handleShare = async () => {
        const url = window.location.href;
        
        // Try to use Web Share API first (works on iOS and Android)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: claim ? `${claim.title} - Do you agree or disagree?` : 'Check out this claim',
                    url: url
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            try {
                // Try modern clipboard API
                await navigator.clipboard.writeText(url);
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    setShowCopied(true);
                    setTimeout(() => setShowCopied(false), 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
                document.body.removeChild(textArea);
            }
        }
    };

    return (
        <>
        <Helmet>
            {/* Meta tags for Sharing*/}
            <title>{claim ? `${claim.title} - Do you agree or disagree?` : 'Check out this claim'}</title>
            <meta name="description" content = {claim ? `${claim.title} - Join the discussion on Speak It!` : 'Check out this claim'} />

            {/* Open Graph tags for Sharing*/}
            <meta property="og:title" content = {claim ? `${claim.title} - Do you agree?` : 'Check out this Hot Take'} />
            <meta property="og:description" content = {claim?.content || 'Join the discussion!'} />
            <meta property="og:url" content= {window.location.href} />
            <meta property = "og:type" content="website" />

            {/* Twitter Card tags for Sharing*/}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name = "twitter:title" content = {claim ? `${claim.title} - Do you agree or disagree?` : 'Check out this Hot Take!'} />
            <meta name = "twitter:description" content = {claim?.content || 'Join the discussion!'} />

            {/* Defaul Image */}
            <meta property="og:image" content= "https://qdpammoeepwgapqyfrrh.supabase.co/storage/v1/object/public/speak-it-brand-assets//PodiumLogo.png"/>
            <meta name="twitter:image" content= "https://qdpammoeepwgapqyfrrh.supabase.co/storage/v1/object/public/speak-it-brand-assets//speak-itHeader.png"/>

        </Helmet>
        <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
            onClick={handleShare}
        >
            <FontAwesomeIcon icon={faShare} />
            {showCopied ? 'Copied!' : 'Share Claim'}
        </button>
        </>
    );
};

export default ShareButton;