import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import supabase from '../../server/supabaseClient';
import EditProfile from './EditProfile';
import TopNavigation from '../../components/TopNavigation';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null); //User Profile Data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] =useState(false); //Profile Updates
  

  
  useEffect(() => {
    //Fetch the user data after login
    const fetchUserProfile = async () => {
      setLoading(true);

      const {
        data: {user}
      } = await supabase.auth.getUser(); //Check currently logged in user
      
      

      if (!user){
        setError('Not Logged In');
        setLoading(false);
        return;
      }
  
// Fetch user data
      const user_Id = user.id;
        const {data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        setError(error.message);
        console.log(user_Id)
      } else {
        setUserProfile(data);
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

  console.log(userProfile);

  return (
    <div><TopNavigation />
    <div>
      {editing ? (
        <EditProfile profile={userProfile} setProfile = {setUserProfile} setEditing={setEditing} />
      ): (
        <>
        <div className='flex flex-col items-centermx-8 rounded-md p-4'>
          <div className='text-2xl font-bold'>
            <h1>Welcome, {userProfile?.username || "User"}!</h1>
          </div>
          <div>
            <div className='text-lg font-bold mt-4'>
            <label>Bio</label>
            </div>
          <p>{userProfile?.bio || "No Bio Available."}</p>
          </div>
          <div>
          <button onClick={() => setEditing (true)}>Edit Profile</button>
          </div>
          <div>
          <p className='text-lg font-bold mt-4'>Stats:</p>
          <p>Votes: {userProfile?.votes || "0"}</p>
          <p>Claims: {userProfile?.claims || "0"}</p>
          <p>Comments: {userProfile?.comments || "0"}</p>
          </div>
        </div>
        </>
      )}
      <LogoutButton />
    </div>
    </div>
  );
}; 

export default Profile;
