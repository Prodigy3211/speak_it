import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import supabase from '../../server/supabaseClient';
import TopNavigation from '../TopNavigation';
const ThreadList = () => {
  const { category } = useParams(); //Get's category from URL
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();

  //Fetch Data from Supabase
  useEffect(() => {
    
    // fetch filtered claims for the specified category
    const fetchClaims = async () => {
      
        // case-insensitive match
          const { data: icontains_data } = await supabase
            .from('claims')
            .select('*')
            .ilike('category', `%${category}%`) // Case-insensitive partial match
            .order('created_at', { ascending: false });
          
          console.log('Results with case-insensitive match:', icontains_data);
          if (icontains_data && icontains_data.length > 0) {
            setClaims(icontains_data);
          } else {
            setClaims([]);
          }
        }
    fetchClaims();
  }, [category]);


  return (
    <div>
      <TopNavigation />
      {/* pull in category name */}
      <div>
        <div className='my-4 flex flex-col border-2 items-center border-black rounded-md p-4'>
        <div className='text-2xl font-bold'>
      <h1>{category} </h1>
        </div>
      <div>
        <button 
        type='button' 
        onClick={() => navigate('/create-claim')}
        className='bg-blue-500 text-white px-4 py-1 mt-4 rounded-md hover:bg-blue-600'
        >
          Create New Claim
        </button>
        </div>
        </div>

      <div className="border-2 border-black rounded-md p-4">
        <div className='italic text-lg mb-4'>They said what they said, do you agree?</div>
      <ul>
        {/* Map out the threads from the API call sorting by claim.id */}
        {claims && claims.length > 0 ? (
          claims.map((claim) => (
            <li 
            key={claim.id}
            className=' my-4 border-2 text-center border-black rounded-md p-4 hover:bg-gray-100'
            >
              {/* Link to the Dynamic Route - updated to use claimId parameter name */}
              <Link to={`/category/${category}/thread/${claim.id}`}>
                {claim.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No claims found in "{category}"!</li>
        )}
      </ul>
      </div>
        </div>
    </div>
  );
};

export default ThreadList;
