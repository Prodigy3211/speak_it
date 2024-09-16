import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState('');

  useEffect(() => {
    //Fetch the user data after login
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No Token Found. Please Log in again.');
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(
          'http://localhost:8000/my-profile',
          config
        );

        setUserData(response.data);
        setBio(response.data.bio);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token);

    try {
      const response = await axios.put(
        'http://localhost:8000/my-profile',
        {
          bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //Update User Data with new information
      setUserData({ ...userData, bio });
      alert(response.data.message);
    } catch (error) {
      console.log('error updating profile', error);
      alert('error updating profile');
    }
  };

  return (
    <div>
      <h1>My Profile Page</h1>
      <p> I hate my life</p>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Bio {userData.bio}</p>

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
      ) : (
        <p>Loading...</p>
      )}

      <LogoutButton />
    </div>
  );
}

export default Profile;
