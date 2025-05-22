import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{faThumbsUp, faThumbsDown, faTrash} from "@fortawesome/free-solid-svg-icons";
import supabase from "../../server/supabaseClient";

const CommentItem = ({comment}) => {
    const [voteCount, setVoteCount] = useState({up: 0, down: 0});
    const [userVote, setUserVote] = useState(null);

//Get the vote count for this comment
   

    const fetchVotes = useCallback(async () => {
        //Get Upvotes
        const {data: upvotes, error: upVoteError} = await supabase
        .schema('public')
        .from('votes')
        .select('*')
        .eq('comment_id', comment.id)
        .eq('vote_type', 'up');

        //Get Downvotes
        const {data: downvotes, error: downVoteError} = await supabase
        .from('votes')
        .select('*')
        .eq('comment_id', comment.id)
        .eq('vote_type', 'down');
    
        if(!upVoteError && !downVoteError) {
            setVoteCount({
                up: upvotes.length,
                down: downvotes.length
            });
        }

        //Has user already voted?
        const {data: {user }} = await supabase.auth.getUser();
        if(user) {
            const {data: userVoterData} = await supabase
            .from ('votes')
            .select('vote_type')
            .eq('comment_id', comment.id)
            .eq('user_id', user.id)
            .single();

            if(userVoterData) {
                setUserVote(userVoterData.vote_type);
        }
    }
}, [comment.id]);

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

        //Toggle vote
        if(userVote === voteType) {
            //remove that vote
        const {error} = await supabase
        .from('votes')
        .delete()
        .eq('comment_id', comment.id)
        .eq('user_id', user.id);

        if(error) {
            setUserVote(null);
            fetchVotes();
            console.error('Error removing vote:', error);
        }
        } else {
            //If changed votetype, remove old vote and add new one
            if(userVote) {
                const {error} = await supabase
                .from('votes')
                .update({vote_type: voteType})
                .eq('comment_id', comment.id)
                .eq('user_id', user.id);

                if(!error) {
                 setUserVote(voteType);
                 fetchVotes();   
                }
            } else {
                //Add new vote
                const {error} = await supabase
                .from('votes')
                .insert([{
                    comment_id: comment.id,
                    user_id: user.id,
                    vote_type: voteType
                }]);

                if(!error) {
                    setUserVote(voteType);
                    fetchVotes();
                }
            }
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
                    className={`flex items-center ${userVote === 'up' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                        <FontAwesomeIcon icon={faThumbsUp} />
                        {voteCount.up}
                </button>
                <button
                    onClick={() => handleVote('down')}
                    className={`flex items-center ${userVote === 'down' ? 'text-orange-600' : 'text-gray-500'}`}
                >
                    <FontAwesomeIcon icon={faThumbsDown} />
                    {voteCount.down}
                </button>
                <button
                    // onClick={() => handleDelete()}
                    className="text-red-500 hover:text-red-700"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                </div>
            </div>
    );

};

export default CommentItem;