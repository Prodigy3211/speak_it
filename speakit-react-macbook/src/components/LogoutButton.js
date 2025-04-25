import React from 'react';
import { useNavigate } from 'react-router-dom';

//When user clicks the button. The login Token will be removed
//Then the page will redirect to the /login page.

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //clear token from local storage or session storage
    localStorage.removeItem('token');

    //naviagte to login page
    navigate('/login');
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
