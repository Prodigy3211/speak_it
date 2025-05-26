import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import supabase from "../server/supabaseClient";

//Check for login token before sending to profile page
//No token? Send to login page.

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const {data, error} = await supabase.auth.getUser();
            if (error || !data.user) {
                console.log ('Error fetching user');
                setUser(false);
            } else {
                setUser(true);
            }
           
        };
        checkUser();
    }, []);

     if (user === null) return <p>Loading...</p>;
     
     return user ? <Outlet /> : navigate('/login');
       
    }; 
    

    

export default ProtectedRoutes;

