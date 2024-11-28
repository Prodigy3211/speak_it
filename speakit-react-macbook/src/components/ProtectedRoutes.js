import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../server/supabaseClient";

//Check for login token before sending to profile page
//No token? Send to login page.

const ProtectedRoutes = ({ children }) => {
    const [isLoading , setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const {data : {user} , error} = await supabase.auth.getUser();
            if (error) {
                console.log ('Error fetching user', error.message);
            }
            setUser(user);
            setLoading(false);
        };
        checkUser();
    }, []);

        if (isLoading) {
            return <p>Loading...</p>
        }
        if (!user){
            navigate('/login');
            return 
        }
        return children;
    } 
    

    

export default ProtectedRoutes;

