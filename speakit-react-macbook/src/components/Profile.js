import React, { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';
import supabase from '../server/supabaseClient';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null); //User Profile Data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updates, setUpdates] =useState({}); //Form Updates
  const [bio, setBio] = useState('');

 
  
  useEffect(() => {
    //Fetch the user data after login
    const fetchUserProfile = async (userId) => {
      setLoading(true);

      const {
        data: {user},
      } = await supabase.auth.getUser(); //Check currently logged in user
      if (!user){
        setError('Not Logged In');
        setLoading(false);
        return;
      }
        const {data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single('');
        
      if (error) {
        setError(error.message);
      } else {
        setUserProfile(data);
      }
        setLoading(false);
    };
      fetchUserProfile ();
  }, []);

  //Profile Updates



  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    const {data : user} = await supabase.auth.getUser();

    if(!user){
      setError('Not Logged in');
      return;
    }

    const {data , error} = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id');

    if (error){
      setError(error.message);
    } else {
      setUserProfile(data[0]); //Update Local profile state
    }

  };

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>

  return (
    <div>
      <h1>My Profile Page</h1>
      <p> I hate my life</p>
      {userProfile && (
        <div>

          <h2>Edit Bio</h2>
          <form onSubmit={handleProfileUpdate}>
            <div>
              <label>Bio:</label>
              <textarea
                value={bio}
                onChange={handleBioChange}
                placeholder='Tell us about yourself..'
              />
            </div>
            <button type='submit'> Save changes</button>
          </form>
      
        </div>
      )};

      <LogoutButton />
    </div>
  );
  }; 

export default Profile;
