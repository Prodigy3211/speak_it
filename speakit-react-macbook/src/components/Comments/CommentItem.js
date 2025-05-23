import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import supabase from "../../server/supabaseClient";

const CommentItem = ({comment}) => {
    const [voteCount, setVoteCount] = useState({up: 0, down: 0});
    const [userVote, setUserVote] = useState(null);

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
                console.log('User vote:', userVote);
                console.log('User:', user.id);
            }
        } else {
            console.error('Error fetching votes:', votesError);
        }
    }, [comment.id]);

    // useEffect(() => {
    //     fetchVotes();
    // }, [fetchVotes]);

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
        
        
    

    return (
        <div className={`p-4 rounded-lg ${
            comment.affirmative
            ? 'bg-blue-100 text-blue-900'
            : 'bg-orange-100 text-orange-900'
         }`}>
            <p>{comment.content || comment.comment}</p>
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
                
            </div>
        </div>
    );

};

export default CommentItem;