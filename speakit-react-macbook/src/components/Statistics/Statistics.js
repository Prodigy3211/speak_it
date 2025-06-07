import { useState, useEffect } from 'react';
import supabase from '../../server/supabaseClient';


export default function Statistics({ userId }) {

    const [votes, setVotes] = useState({
        upvotesRecieved: 0, 
        downvotesRecieved: 0,
        totalVotesRecieved:0
    });

    useEffect(() => {
    const fetchVotes = async () => {
        try{
            const {data: userComments, error: commentsError} = await supabase
                .from('comments')
                .select('id')
                .eq('user_id', userId);
            if (commentsError) {
                throw new Error('Error fetching comments');
            }

            const {data: upvotes, error: upError} = await supabase
                .from ('votes')
                .select('*', {count: 'exact'})
                .eq('vote_type', 'up')
                .in('comment_id', userComments.map(comment => comment.id))
            const {data: downvotes, error: downError} = await supabase
                .from ('votes')
                .select('*', {count: 'exact'})
                .eq('vote_type', 'down')
                .in('comment_id', userComments.map(comment => comment.id))
            if (upError || downError) {
                throw new Error('Error fetching votes');
            }
            setVotes({
                upvotesRecieved: upvotes?.length || 0,
                downvotesRecieved: downvotes?.length || 0,
                totalVotesRecieved: (upvotes?.length || 0) + (downvotes?.length || 0)
            });
        } catch (error) {
            console.error('Error fetching votes:', error);
        }
    };

    if (userId) {
        fetchVotes();
    }   
}, [userId]);

    return (
        <div>
            <h1>Statistics</h1>
            <p>Upvotes Recieved: {votes.upvotesRecieved}</p>
            <p>Downvotes Recieved: {votes.downvotesRecieved}</p>
            <p>Total Votes Recieved: {votes.totalVotesRecieved}</p>
        </div>
    )
}