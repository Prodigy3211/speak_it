import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';

function Profile() {
    const [userData, setUserData ] = useState(null);
        
        useEffect(() => {
            //Fetch the user data after login
            const fetchUserData = async () => {
                const token = localStorage.getItem('token');
                    if (!token) {
                        console.error('No Token Found. Please Log in again.');
                    }
                const config = {
                    headers:
                    {Authorization : `Bearer ${token}`}
                };
                try {
                    const response = await axios.get(
                        'http://localhost:8000/my-profile', config);
                    
                    setUserData(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchUserData();
        }, []);
    
    return(
        <div>
            <h1>My Profile Page</h1>
            <p> I hate my life</p>
            {userData ?(
            <div>
                <p>
               Username: {userData.username}
            </p>
            <p>
                Email: {userData.email}
            </p>
            </div>
            ) : (
                <p>Loading...</p>
            )}

            <LogoutButton />
        </div>
    );
}

export default Profile;