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

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Votes You've Recieved</th>
                  <th className="border border-gray-300 p-2 text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">🙌  Up Votes</td>
                  <td className="border border-gray-300 p-2">{votes.upvotesRecieved || "0"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">🫠  Down Votes</td>
                  <td className="border border-gray-300 p-2">{votes.downvotesRecieved || "0"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">✅  Total Votes</td>
                  <td className="border border-gray-300 p-2">{votes.totalVotesRecieved || "0"}</td>
                </tr>
              </tbody>
            </table>
        </div>
    )
}