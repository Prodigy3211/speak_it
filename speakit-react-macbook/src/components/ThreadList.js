import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import supabase from '../server/supabaseClient';

const ThreadList = () => {
  const { category } = useParams(); //Get's category from URL
  const [claims, setClaims] = useState([]);
  const [allClaims, setAllClaims] = useState([]);
  const navigate = useNavigate();

  //Fetch Data from Supabase
  useEffect(() => {
    // First, get ALL claims to see what's in the database
    const fetchAllClaims = async () => {
      console.log('Fetching ALL claims to debug');
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all claims:', error);
      } else {
        console.log('ALL claims in database:', data);
        setAllClaims(data);
        
        // Log all unique categories to help debug
        const categories = [...new Set(data.map(claim => claim.category))];
        console.log('All available categories:', categories);
      }
    };
    
    // Then fetch filtered claims for the specified category
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
    
    fetchAllClaims();
    fetchClaims();
  }, [category]);

  console.log('Claims state:', claims);
  console.log('Category param:', category);

  return (
    <div>
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
          <li>No claims found for category: "{category}" - Check console for debug info</li>
        )}
      </ul>
      
      {/* Debug section - Only visible during development */}
      {allClaims && allClaims.length > 0 && (
        <div style={{marginTop: '30px', padding: '15px', border: '1px solid #ccc'}}>
          <h3>Debug: All Categories in Database</h3>
          <ul>
            {[...new Set(allClaims.map(claim => claim.category))].map(cat => (
              <li key={cat}>
                {cat} ({allClaims.filter(c => c.category === cat).length} claims)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreadList;
