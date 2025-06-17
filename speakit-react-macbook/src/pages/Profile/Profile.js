import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import supabase from '../../server/supabaseClient';
import EditProfile from './EditProfile';
import TopNavigation from '../../components/TopNavigation';
import Statistics from '../../components/Statistics/Statistics';
import BottomNavigation from '../../components/BottomNavigation';

// Fallback UI component for when profile creation fails
const ProfileErrorFallback = ({ error, onRetry, user }) => {
  return (
    <div className='p-4 pb-20 bg-gray-900 min-h-screen'>
      <TopNavigation />
      <div className='mt-4 flex flex-col items-center justify-center min-h-[60vh]'>
        <div className='bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md w-full text-center'>
          <div className='text-red-400 text-2xl mb-4'>⚠️</div>
          <h2 className='text-white text-xl font-bold mb-2'>Profile Setup Failed</h2>
          <p className='text-gray-300 mb-4'>
            We couldn't set up your profile. This might be due to a temporary issue.
          </p>
          <div className='bg-gray-800 rounded p-3 mb-4 text-left'>
            <p className='text-gray-400 text-sm'>Error: {error}</p>
          </div>
          <div className='space-y-3'>
            <button 
              onClick={onRetry}
              className='w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md p-3 font-medium transition-colors'
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.reload()}
              className='w-full bg-gray-600 hover:bg-gray-700 text-white rounded-md p-3 font-medium transition-colors'
            >
              Refresh Page
            </button>
          </div>
        </div>
        <div className='mt-6'>
          <LogoutButton />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null); //User Profile Data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] =useState(false); //Profile Updates
  const [userComments, setUserComments] = useState([]);
  const [userClaims, setUserClaims] = useState([]);
  const [user, setUser] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: {user}
      } = await supabase.auth.getUser(); //Check currently logged in user
      setUser(user);

      if (!user){
        setError('Not Logged In');
        setLoading(false);
        return;
      }
  
      // Fetch user data
      const {data: profiles, error: profileError} = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id);

      if (profileError) {
        throw new Error(`Failed to fetch profile: ${profileError.message}`);
      }

      // If no profile exists, create one
      if (!profiles || profiles.length === 0) {
        const {data: newProfile, error: createError} = await supabase
          .from('profiles')
          .insert([
            {
              user_id: user.id,
              username: 'Anonymous',
              created_at: new Date().toISOString()
            }
          ])
          .select()
          .single();

        if (createError) {
          throw new Error(`Failed to create profile: ${createError.message}`);
        }
        setUserProfile(newProfile);
      } else {
        // If multiple profiles exist, use the first one
        setUserProfile(profiles[0]);
      }

      //fetch user comments
      const {data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('user_id', user.id);

      if (!commentsError) {
        setUserComments(comments);
      }

      // fetch user claims
      const {data: claims, error: claimsError } = await supabase
      .from('claims')
      .select('*')
      .eq('op_id', user.id);

      if (!claimsError) {
        setUserClaims(claims);
      }
        
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchUserProfile();
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Show fallback UI if there's an error and we've tried a few times
  if (error && retryCount >= 2) {
    return <ProfileErrorFallback error={error} onRetry={handleRetry} user={user} />;
  }

  if (error && retryCount < 2) {
    return (
      <div className='p-4 pb-20 bg-gray-900 min-h-screen'>
        <TopNavigation />
        <div className='mt-4 flex flex-col items-center justify-center min-h-[60vh]'>
          <div className='bg-yellow-900/20 border border-yellow-500 rounded-lg p-6 max-w-md w-full text-center'>
            <div className='text-yellow-400 text-2xl mb-4'>🔄</div>
            <h2 className='text-white text-xl font-bold mb-2'>Loading Profile...</h2>
            <p className='text-gray-300 mb-4'>
              Attempt {retryCount + 1} of 3
            </p>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto'></div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if(loading){
    return (
      <div className='p-4 pb-20 bg-gray-900 min-h-screen'>
        <TopNavigation />
        <div className='mt-4 flex flex-col items-center justify-center min-h-[60vh]'>
          <div className='bg-blue-900/20 border border-blue-500 rounded-lg p-6 max-w-md w-full text-center'>
            <div className='text-blue-400 text-2xl mb-4'>📱</div>
            <h2 className='text-white text-xl font-bold mb-2'>Loading Profile...</h2>
            <p className='text-gray-300 mb-4'>
              Setting up your profile
            </p>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto'></div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className='p-4 pb-20 bg-gray-900 min-h-screen'>
      <TopNavigation />
    <div className='mt-4'>
      {editing ? (
        <EditProfile profile={userProfile} setProfile = {setUserProfile} setEditing={setEditing} />
      ): (
        <>
        <div className='flex flex-col items-center mx-8 rounded-md p-4'>
          <div className='text-lg font-bold mb-2 text-white'>
            <h1>Welcome, {userProfile?.username || "User"}!</h1>
          </div>
          {/* <div>
            <div className='text-lg font-bold mt-4'>
            <label>Bio</label>
            </div>
          <p>{userProfile?.bio || "No Bio Available."}</p>
          </div> */}
          
          <div>
          <div className="mt-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Your Activity</th>
                  <th className="border border-gray-300 p-2 text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-white">Claims Made</td>
                  <td className="border border-gray-300 p-2 text-white">{userClaims.length || "0"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-white">Comments Left</td>
                  <td className="border border-gray-300 p-2 text-white">{userComments.length || "0"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Statistics userId={user.id} />
          </div>
          </div>
          <div className='mt-4'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 text-sm' onClick={() => setEditing (true)}>Change Username</button>
          </div>
          <div className='mx-4 items-center mt-4'>
      <LogoutButton />
      </div>
        </div>
        
        </>
      )}
    </div>
    <BottomNavigation />
    </div>
  );
}; 

export default Profile;
