import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import supabase from '../../server/supabaseClient';
import AddComment from '../Forms/AddComment';
import TopNavigation from '../TopNavigation';
const Thread = () => {
  // Get the parameter from the URL
  const params = useParams();
  
  // This should match the :claimId parameter name in your route
  const { claimId } = params;
  
  const [claim, setClaim] = useState(null);
  const [comments, setComments] = useState([]);

  // Function to fetch comments - memoized with useCallback
  const fetchComments = useCallback(async () => {
    if (!claimId) return;
    
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('claim_id', claimId)
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching comments:', error);
      setComments([]); // Ensure comments is always an array even on error
    } else {
      setComments(data || []); // Ensure we set an empty array if data is null/undefined
    }
  }, [claimId]);

  useEffect(() => {
    const fetchClaim = async () => {
      
      // Try both with and without parsing to number
      const numericId = parseInt(claimId, 10);
      console.log('Numeric ID:', numericId, 'Type:', typeof numericId);
      
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .eq('id', claimId)
        .single();
      
      if (error) {
        console.error('Error fetching claim:', error);
      } else {
        console.log('Fetched claim successfully:', data);
        setClaim(data);
      }
    };

    if (claimId) {
      fetchClaim();
      fetchComments();
    } else {
      console.error('No claimId found in URL params');
      setComments([]); // Ensure comments is an array if no claimId
    }
  }, [claimId, fetchComments]);
  
  return (
    <div>
      <TopNavigation />
      {claim ? (
        <>
          <h1>{claim.title}</h1>
          <p>{claim.claim}</p>
          <h3>comments: </h3>
          <ul className="space-y-4">
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((comment) => (
                <li 
                  key={comment.id} 
                  className={`p-4 rounded-lg ${
                    comment.affirmative 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-orange-100 text-orange-900'
                  }`}
                >
                  {comment.content || comment.comment}
                </li>
              ))
            ) : (
              <li>No comments yet</li>
            )}
          </ul>
          <AddComment claimId={claimId} onCommentAdded={fetchComments} />
        </>
      ) : (
        <p>Loading claim data...</p>
      )}
    </div>
  );
};

export default Thread;
