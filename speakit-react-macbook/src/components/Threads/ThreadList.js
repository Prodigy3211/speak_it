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
      console.log('Fetching claims for category:', category);
      console.log('Category type:', typeof category);
      
      // First try exact match
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .eq('category', category) // Exact match
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error Fetching claims: ', error);
      } else {
        console.log('Fetched claims data with exact match:', data);
        
        // If no results, try case-insensitive match
        if (data.length === 0) {
          console.log('No exact matches, trying case-insensitive...');
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
        } else {
          setClaims(data);
        }
      }
    };
    
    // fetchAllClaims();
    fetchClaims();
  }, [category]);


  return (
    <div>
      <TopNavigation />
      {/* pull in category name */}
      <h1>{category} and the Claims We've Made</h1>
      <p>
        <button type='button' onClick={() => navigate('/create-claim')}>
          Create Claim
        </button>
      </p>
      
      <ul>
        {/* Map out the threads from the API call sorting by claim.id */}
        {claims && claims.length > 0 ? (
          claims.map((claim) => (
            <li key={claim.id}>
              {/* Link to the Dynamic Route - updated to use claimId parameter name */}
              <Link to={`/category/${category}/thread/${claim.id}`}>
                {claim.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No claims found in: "{category}" </li>
        )}
      </ul>
    </div>
  );
};

export default ThreadList;
