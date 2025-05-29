import { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{faThumbsUp, faThumbsDown, faReply} from "@fortawesome/free-solid-svg-icons";
import supabase from "../../server/supabaseClient";

const CommentItem = ({comment, onParentClick, onCommentAdded}) => {
    const [voteCount, setVoteCount] = useState({up: 0, down: 0});
    const [userVote, setUserVote] = useState(null);
    const [username, setUsername] = useState('');
    const[showReplyForm, setShowReplyForm] = useState(false);
    const[isAffirmative, setIsAffirmative] = useState(null);
    const[replyContent, setReplyContent] = useState('');
    const[error, setError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


//Get the username for this comment
useEffect(() => {
        const fetchUsername = async () => {
        try{
            const {data, error} = await supabase
            .from('profiles')
            .select('username')
            .eq('user_id', comment.user_id)
            .maybeSingle();

        if(error) {
            console.error('Error fetching username:', error);
            setUsername('anon');
        } else if (data?.username) {
            setUsername(data.username);
        } else {
            setUsername('anon');
        }
    } catch (error) {
        console.error('Error fetching username:', error);
        setUsername('anon');
        }
    };
    fetchUsername();
}, [comment.user_id]);

    
//Get the vote count for this comment
   

    const fetchVotes = useCallback(async () => {
        const {data: {user}} = await supabase.auth.getUser();
        // Get all votes for this comment in a single API call
        const {data: votes, error: votesError} = await supabase
        .from('votes')
        .select('*')
        .eq('comment_id', comment.id);
        
        if(!votesError && votes) {
            // Count upvotes and downvotes
            const upvotes = votes.filter(vote => vote.vote_type === 'up');
            const downvotes = votes.filter(vote => vote.vote_type === 'down');
            
            setVoteCount({
                up: upvotes.length,
                down: downvotes.length
            });
            
            // Check if user has voted
            if(user) {
                const userVote = votes.find(vote => vote.user_id === user.id);
                setUserVote(userVote ? userVote.vote_type : null);
            }
        } else {
            console.error('Error fetching votes:', votesError);
        }
    }, [comment.id]);

    // Fetch votes when component mounts
    useEffect(() => {
        fetchVotes();
    }, [fetchVotes]);

    const handleVote = async (voteType) => {
        //Check if user is authenticated
        const {data: {user}} = await supabase.auth.getUser();
        if(!user) {
            alert('Please login to vote');
            return;
        }

        const previousVote = userVote;
        
        try {
            if(previousVote === voteType) {
                // Remove vote
                const {error} = await supabase
                    .from('votes')
                    .delete()
                    .match({
                        comment_id: comment.id,
                        user_id: user.id
                    });
                
                if(!error) {
                    setUserVote(null);
                    // Update counts
                    setVoteCount(prev => ({
                        ...prev,
                        [voteType]: prev[voteType] - 1
                    }));
                }
            } else {
                // First remove any existing vote
                if(previousVote) {
                    await supabase
                        .from('votes')
                        .delete()
                        .match({
                            comment_id: comment.id,
                            user_id: user.id
                        });
                }
                
                // Then add the new vote
                const {error} = await supabase
                    .from('votes')
                    .insert([{
                        comment_id: comment.id,
                        user_id: user.id,
                        vote_type: voteType
                    }]);

                if(!error) {
                    setUserVote(voteType);
                    // Update counts
                    setVoteCount(prev => {
                        const newCount = {...prev};
                        if(previousVote) newCount[previousVote]--;
                        newCount[voteType]++;
                        return newCount;
                    });
                }
            }
        } catch(error) {
            console.error('Error voting:', error);
            // Revert to previous state on error
            setUserVote(previousVote);
            // Refresh counts from server
            fetchVotes();
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();

        //is User Authenticated?
        const {data: {user}} = await supabase.auth.getUser();
        if(!user) {
            alert('Please login to reply');
            return;
        }

        if (isAffirmative === null) {
            error.message = 'Please select for or against before replying';
            return;
        }

        try {
            const {error: replyError, data: newReply} = await supabase
            .from('comments')
            .insert([{
            claim_id: comment.claim_id,
            user_id: user.id,
            content: replyContent,
            affirmative: isAffirmative,
            parent_comment_id: comment.id
        }])
        .select()
        .single();

        if (replyError) throw replyError;

        if (imageFile && newReply) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;


            const {error: uploadError} = await supabase.storage
            .from('comment-images')
            .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const {data: {publicUrl}} = supabase.storage
        .from('comment-images')
        .getPublicUrl(fileName);

        const {error: imageError} = await supabase
        .from('images')
        .insert([{
            comment_id: newReply.id,
            user_id: user.id,
            image_url: publicUrl,
            file_name: fileName,
            file_size: imageFile.size,
            content_type: imageFile.type
        }]);
        if (imageError) throw imageError;
        }
        
        setImageFile(null);
        setReplyContent('');
        setIsAffirmative(null);
        setShowReplyForm(false);

        if(onCommentAdded) {
            onCommentAdded();
        }
    } catch(error) {
        console.error('Error adding reply:', error);
        setError('Failed to add reply. Please try again.');
    }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Create a preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const clearImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

const shortenId = (id) => {
    return id.toString().slice(-6);
}

const formatDate = (dateString) =>{
const date = new Date (dateString);
return date.toLocaleDateString('en-US', {
    month:'numeric',
    day:'numeric',
    hour:'2-digit',
    minute:'2-digit',
    year:'numeric',
    hour12:false
})
}

    return (
        <div className={`p-4 rounded-lg ${
            comment.affirmative
            ? 'bg-blue-100 text-blue-900'
            : 'bg-orange-100 text-orange-900'
         }`}>
            {comment.parent_comment_id && (
                <div className="mb-2">
                    <button
                    onClick={onParentClick}
                    className="text-blue-500 text-sm hover:text-blue-700"
                    >
                        In reply to: {shortenId(comment.parent_comment_id)}
                    </button>
                </div>
            )}
            <p>{formatDate(comment.created_at)} - No.{shortenId(comment.id)}</p>
            <p>{comment.content || comment.comment} - {username || 'anon'}</p>
            {/* Display images */}
            {comment.images && comment.images.length > 0 && (
                    <div className="mt-2">
                        {comment.images.map((image) => (
                            <img
                            key={image.id}
                            src={image.image_url}
                            alt="Comment attachment"
                            className="w-full h-auto rounded-md"
                            />
                        ) )}
                    </div>
                )}
            <div className="flex items-center mt-2 space-x-4">
                <button
                    onClick={() => handleVote('up')}
                    className={`flex items-center space-x-1 px-2 py-1 rounded ${
                        userVote === 'up' 
                        ? 'bg-blue-200 text-blue-700' 
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{voteCount.up}</span>
                </button>
                <button
                    onClick={() => handleVote('down')}
                    className={`flex items-center space-x-1 px-2 py-1 rounded ${
                        userVote === 'down' 
                        ? 'bg-orange-200 text-orange-700' 
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                >
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <span>{voteCount.down}</span>
                </button>
                <button
                    onClick={() => setShowReplyForm(!showReplyForm)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <FontAwesomeIcon icon={faReply} />
                    <span>Reply</span>
                </button>
                </div>
                

                {showReplyForm && (
                    <form onSubmit={handleReply} className="mt-2">
                        <div>
                            <input
                                type="text"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Add a reply..."
                                required
                                className="w-full p-2 border rounded-md"
                                />

                        </div>
                        <div className="mt-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id={`image-upload-${comment.id}`}
                            />
                            <label
                                htmlFor={`image-upload-${comment.id}`}
                                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer"
                            >
                                Upload Image
                            </label>
                            
                            {imagePreview && (
                                <div className="mt-2 relative inline-block">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-w-xs rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={clearImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                    >
                                        cancel
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="sentiment"
                                    checked={isAffirmative === true}
                                    onChange={() => setIsAffirmative(true)}
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span>For</span>
                            </label>
                            <label className="flex items-center gap-2">
                            <input
                                    type="radio"
                                    name="sentiment"
                                    checked={isAffirmative === false}
                                    onChange={() => setIsAffirmative(false)}
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span>Against</span>
                            </label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Reply
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowReplyForm(false);
                                    clearImage();
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Replies</h3>
                    </div>
                )} 
                </div>
    );
};

export default CommentItem;