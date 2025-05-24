import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../server/supabaseClient';
import TopNavigation from '../TopNavigation';

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
    <div>
    <div>
      <TopNavigation />
    </div>
    <div className='border-2 border-black rounded-md p-2 flex flex-col'>
    <form onSubmit={handleSubmit}>
      <div className=  "font-bold">
      <h2>What's your Claim?</h2>
      </div>
      <div className='bg-white border-2 border-black rounded-md p-4 mr-4'>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Pizza is a Vegetable...'
        required
        />
        </div>
      <label className='font-bold'>Support that Claim with all your soul:</label>
        <div className='bg-white border-2 border-black rounded-md p-4 mr-4'>
      <input
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder='Back in ancient Ghana...'
        required
        type="textarea"
        />
        </div>
        
        <div>
      <label className='font-bold'>Select a Category: </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        >
        <option value='provemewrong'>Prove-Me-Wrong</option>
        <option value='entertainment'>Entertainment</option>
        <option value='philosphy'>Philosophy</option>
        <option value='relationships'>Relationships</option>
        <option value='politics'>Politics</option>
        <option value='war'>War</option>
      </select>
      </div>
      <div className='bg-blue-500 text-white px-4 py-1 mt-4 mb-4 rounded-md hover:bg-blue-600'>
      <button type='submit'>Create Claim</button>
      </div>
    </form>
    </div>
        </div>
  );
};

export default CreateClaim;
