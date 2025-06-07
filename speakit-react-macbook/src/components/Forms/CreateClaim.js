import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../server/supabaseClient';
import TopNavigation from '../TopNavigation';
import BottomNavigation from '../BottomNavigation';

const CreateClaim = () => {
  // const { categoryName } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [claim, setClaim] = useState('');
  const [category, setCategory] = useState('Prove Me Wrong');

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
      <div className="p-4 pb-20">
        <TopNavigation />
        <div className='bg-white border-2 border-gray-300 shadow-md rounded-md p-2 flex flex-col mt-8'>
          <p className="text-xl font-bold mb-4">Creating a Claim</p>
          <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Can you turn your claim into a Hot Take?</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-200 text-lg">
              <li>First make a "claim" - this can be a statement or a question.</li>
              <li>Write a short paragraph supporting that claim. Make it as convincing as possible.</li>
              <li>Select a category that best fits your claim.</li>
              <li>Click "Create Claim" and you're done!</li>
            </ol>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="font-bold mb-2">
              <h2>What's your Claim?</h2>
            </div>
            <div className='bg-white border-2 border-gray-300 rounded-md p-4 mr-4'>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Pizza is a Vegetable...'
                required
              />
            </div>
            <div className='my-2'>
              <label className='font-bold'>Support that Claim with all your soul:</label>
            </div>
            <div className='bg-white border-2 border-gray-300 rounded-md p-4 mr-4'>
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
                className='mt-2 border-2 border-black rounded-md p-2'
              >
                <option value='Prove Me Wrong'>Prove Me Wrong</option>
                <option value='entertainment'>Entertainment</option>
                <option value='philosphy'>Philosophy</option>
                <option value='relationships'>Relationships</option>
                <option value='politics'>Politics</option>
                <option value='war'>War</option>
              </select>
            </div>
            <div>
              <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 mt-2' type='submit'>Create Claim</button>
            </div>
          </form>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default CreateClaim;
