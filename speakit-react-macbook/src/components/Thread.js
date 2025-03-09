import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../server/supabaseClient';
import AddComment from './Forms/AddComment';

const Thread = () => {
  const { claimId } = useParams();
  const [claim, setClaim] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchClaim = async () => {
      const { data } = await supabase
        .from('claims')
        .select('*')
        .eq('id', claimId)
        .single();
      setClaim(data);
    };

    const fetchComments = async () => {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('claim_id', claimId)
        .order('created_at', { ascending: true });
      setComments(data);
    };

    fetchClaim();
    fetchComments();
  }, [claimId]);

  return (
    <div>
      {claim && (
        <>
          <h1>{claim.title}</h1>
          <p>{claim.content}</p>
          <h3>comments: </h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
          <AddComment claimId={claimId} onCommentAdded={setComments} />
        </>
      )}
    </div>
  );
};

export default Thread;
