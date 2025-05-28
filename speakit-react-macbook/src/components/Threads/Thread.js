import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import supabase from '../../server/supabaseClient';
import AddComment from '../Forms/AddComment';
import TopNavigation from '../TopNavigation';
import CommentThread from '../Comments/CommentThread';

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
      // .is('parent_comment_id', null) //Top Levels Comments only
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching comments:', error);
      setComments([]); // Ensure comments is always an array even on error
    } else{
      setComments(data || []);
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
          <div className = "space-y-4">
            {Array.isArray(comments) && comments.length > 0 ? (
              <CommentThread comments={comments} />
          
            ) : (
              <li>No comments yet</li>
            )}
            </div>
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
