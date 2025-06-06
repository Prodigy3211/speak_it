import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import supabase from '../../server/supabaseClient';
import EditProfile from './EditProfile';
import TopNavigation from '../../components/TopNavigation';
import Statistics from '../../components/Statistics/Statistics';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null); //User Profile Data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] =useState(false); //Profile Updates
  const [userComments, setUserComments] = useState([]);
  const [userClaims, setUserClaims] = useState([]);
  

  

  
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
          <div className='mt-4'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2' onClick={() => setEditing (true)}>Edit Profile</button>
          </div>
          <div>
          <p className='text-lg font-bold mt-4'>Stats: (coming soon)
          </p>
          <p>Votes:</p>
          <p>Upvotes: {} </p>
          <p>Downvotes: </p>
          <p>Claims: {userClaims.length || "0"}</p>
          <p>Comments: {userComments.length || "0"}</p>

          <Statistics userId={userProfile?.id}/>
          </div>
        </div>
        </>
      )}
      <div className='mx-4'>
      <LogoutButton />
      </div>
    </div>
    </div>
  );
}; 

export default Profile;
