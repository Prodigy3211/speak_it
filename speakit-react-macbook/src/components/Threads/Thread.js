import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import supabase from '../../server/supabaseClient';
import AddComment from '../Forms/AddComment';
import TopNavigation from '../TopNavigation';
import CommentItem from '../Comments/CommentItem';

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
      .is('parent_comment_id', null) //Top Levels Comments only
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching comments:', error);
      setComments([]); // Ensure comments is always an array even on error
    } else {
      const commentsWithReplies = await Promise.all(
        (data || []).map(async (comment) => {
          const {data:replies} = await supabase
          .from('comments')
          .select('*')
          .eq('parent_comment_id', comment.id)
          .order('created_at', { ascending: true });

          return {
            ...comment,
            replies: replies || []
          };
        })
      )
      setComments(commentsWithReplies); // Ensure we set an empty array if data is null/undefined
    }
  }, [claimId]);

  useEffect(() => {
    const fetchClaim = async () => {
      
      
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .eq('id', claimId)
        .single();
      
      if (error) {
        console.error('Error fetching claim:', error);
      } else {
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
      <div className='mt-4'>
      {claim ? (
        <>
        <div>
        <div id='op-claim' className='border-2 border-black rounded-md p-4'>
          <div className='text-2xl font-bold'>
          <h1>Claim: {claim.title}</h1>
          </div>
          <div>
            <div className='text-lg font-bold'>
            <p>Explanation:</p>
            </div>
          <p>{claim.claim}</p>
          </div>
          <div className='border-2 border-black rounded-md p-4'>
          <AddComment 
         claimId={claimId} 
         onCommentAdded={fetchComments} />
         </div>
          </div>
          <h3 className='text-2xl font-bold my-4 '>Comments: </h3>
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
                  
                  <CommentItem comment={comment} />
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4">
                      {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} />
                      ))}
                    </div>
                  )}
                  </li>
              ))
            ) : (
              <li>No comments yet</li>
            )}
          </ul>
         </div>
        </>
      ) : (
        <p>Loading claim data...</p>
      )}
    </div>
    </div>
  );
};

export default Thread;
