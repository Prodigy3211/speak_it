import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import supabase from '../../server/supabaseClient';
import AddComment from '../Forms/AddComment';
import TopNavigation from '../TopNavigation';
import CommentThread from '../Comments/CommentThread';
import BottomNavigation from '../BottomNavigation';

const Thread = () => {
  // Get the parameter from the URL
  const params = useParams();
  
  // This should match the :claimId parameter name in your route
  const { claimId } = params;
  
  const [claim, setClaim] = useState(null);
  const [comment, setComment] = useState([]);

  // Function to fetch comments - memoized with useCallback
  const fetchComments = useCallback(async () => {
    if (!claimId) return;
    
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        parent_comment_id,
        images (
        id,
        image_url,
        file_name,
        file_size,
        content_type,
        created_at
        )
        `)
      .eq('claim_id', claimId)
      // .is('parent_comment_id', null) //Top Levels Comments only
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching comments:', error);
      setComment([]); // Ensure comments is always an array even on error
    } else{
      setComment(data || []);
    }
  }, [claimId]);

  const fetchCommentImages = async (commentId) => {
    if (!commentId) return;
    
  const {data, error} = await supabase
    .from('images')
    .select('*')
    .eq('comment_id', commentId);

    if (error) {
      console.error('Error fetching comment images:', error);
    } else {
      return data;
    }
  }


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
      setComment([]); // Ensure comments is an array if no claimId
    }
  }, [claimId, fetchComments]);
  
  return (
    <div className='p-4 pb-20'>
      <TopNavigation />
      <div className='mt-4'>
      {claim ? (
        <>
        <div>
        <div id='op-claim' className='bg-white shadow-lg rounded-md p-4 border border-gray-300'>
          <div className='text-2xl font-bold mb-2'>
          <h1>{claim.title}</h1>
          </div>
          <div>
           
          <p>{claim.claim}</p>
          </div>
          <div className='bg-white shadow-lg rounded-md mt-4 p-4 border border-gray-300'>
          <AddComment 
         claimId={claimId} 
         onCommentAdded={fetchComments}
         fetchCommentImages={fetchCommentImages} />
         </div>
          </div>
          <h3 className='text-2xl font-bold my-4 '>Comments: </h3>
          <div className = "space-y-4">
            {Array.isArray(comment) && comment.length > 0 ? (
              <CommentThread comments={comment} onCommentAdded={fetchComments} />
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
    <BottomNavigation />
    </div>
  );
};


export default Thread;
