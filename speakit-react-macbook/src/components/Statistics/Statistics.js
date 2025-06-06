import { useState, useEffect } from 'react';


export default function Statistics({ userId }) {

    const [votes, setVotes] = useState({upvotesRecieved: 0, 
        downvotesRecieved: 0,
        totalVotes:0
    });

    useEffect(() => {
    const fetchVotes = async () => {
        try{
            console.log('Fetching votes for comment:', userId);
            const response = await fetch(`http://localhost:3000/api/comment/${userId}/counts`);
            const data = await response.json();
            setVotes(data);
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
            <p>Total Votes: {votes.totalVotes}</p>
        </div>
    )
}