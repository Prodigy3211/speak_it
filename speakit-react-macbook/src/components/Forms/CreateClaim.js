import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../server/supabaseClient';

const CreateClaim = () => {
  // const { categoryName } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [claim, setClaim] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const checkAuthorization = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    };
    checkAuthorization();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    const { data, error } = await supabase
      .from('claims')
      .insert([{ title, claim, category: category, op_id: user.id }])
      .select();

    if (error) {
      console.error('Error creating claim: ', error);
    } else {
      //Navigate to the new thread
      navigate(`/category/${category}/thread/${data[0].id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new Claim in {category}</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Claim Title'
        required
      />
      <input
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder='Make Your Claim'
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value='prove-me-wrong'>Prove-Me-Wrong</option>
        <option value='entertainment'>Entertainment</option>
        <option value='philosphy'>Philosophy</option>
        <option value='relationships'>Relationships</option>
        <option value='politics'>Politics</option>
        <option value='war'>War</option>
      </select>
      <button type='submit'>Create Claim</button>
    </form>
  );
};

export default CreateClaim;
