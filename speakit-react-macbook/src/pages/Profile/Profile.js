import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import supabase from '../../server/supabaseClient';
import EditProfile from './EditProfile';
import TopNavigation from '../../components/TopNavigation';
import Statistics from '../../components/Statistics/Statistics';
import BottomNavigation from '../../components/BottomNavigation';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null); //User Profile Data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] =useState(false); //Profile Updates
  const [userComments, setUserComments] = useState([]);
  const [userClaims, setUserClaims] = useState([]);
  const [user, setUser] = useState(null);
  

  

  
  useEffect(() => {
    //Fetch the user data after login
    const fetchUserProfile = async () => {
      setLoading(true);

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
      const {data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

        if (error) {
          setError(error.message);
        } else {
          setUserProfile(data);
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
    };
      fetchUserProfile ();
  }, []);


  if (error){
    return <p>{error}</p>
  }
  if(loading){
    return <p>Profile is loading...</p>;
  }

  return (
    <div className='p-4 pb-20'>
      <TopNavigation />
    <div className='mt-4'>
      {editing ? (
        <EditProfile profile={userProfile} setProfile = {setUserProfile} setEditing={setEditing} />
      ): (
        <>
        <div className='flex flex-col items-center mx-8 rounded-md p-4'>
          <div className='text-lg font-bold mb-2'>
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
                  <td className="border border-gray-300 p-2">Claims Made</td>
                  <td className="border border-gray-300 p-2">{userClaims.length || "0"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Comments Left</td>
                  <td className="border border-gray-300 p-2">{userComments.length || "0"}</td>
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
