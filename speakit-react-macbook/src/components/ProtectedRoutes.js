import React from "react";
import { Navigate } from "react-router-dom";

//Check for login token before sending to profile page
//No token? Send to login page.

const ProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
       return <Navigate to ='/login' />;
    }

    return children;
};

export default ProtectedRoutes;

