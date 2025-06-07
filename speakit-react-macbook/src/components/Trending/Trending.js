import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../server/supabaseClient";

const Trending = () => {
    const [trendingClaims, setTrendingClaims] = useState([]);

    useEffect(() => {
        const fetchTrendingClaims = async () => {
            // Fetch all claims
            const { data: claims, error: claimsError } = await supabase
                .from('claims')
                .select('*');

            if (claimsError) {
                console.error('Error fetching claims:', claimsError);
                return;
            }

            // Fetch all comments
            const { data: comments, error: commentsError } = await supabase
                .from('comments')
                .select('*');

            if (commentsError) {
                console.error('Error fetching comments:', commentsError);
                return;
            }

            // Count comments per claim
            const claimCommentCounts = comments.reduce((acc, comment) => {
                acc[comment.claim_id] = (acc[comment.claim_id] || 0) + 1;
                return acc;
            }, {});

            // Combine claims with their comment counts and sort
            const claimsWithCommentCounts = claims.map(claim => ({
                ...claim,
                commentCount: claimCommentCounts[claim.id] || 0
            }));

            // Sort by comment count and take top 3
            const topClaims = claimsWithCommentCounts
                .sort((a, b) => b.commentCount - a.commentCount)
                .slice(0, 3);

            setTrendingClaims(topClaims);
        };

        fetchTrendingClaims();
    }, []);

    return (
        <div className="border-2 border-gray-300 rounded-lg p-4 mt-4">
            <h1 className="text-2xl font-bold mb-4">The Hottest Takes</h1>
            <div className="space-y-4">
                {trendingClaims.map((claim) => (
                    <div key={claim.id} className="border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                        <Link to={`/category/${claim.category}/thread/${claim.id}`}>
                            <h2 className="text-xl font-semibold mb-2">{claim.title}</h2>
                            {/* <p className="text-gray-600 mb-2">{claim.claim}</p> */}
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="mr-2">Comments: {claim.commentCount}</span>
                                <span>Category: {claim.category}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trending;