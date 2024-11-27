import React, {useState} from 'react';
import supabase from '../server/supabaseClient';
import { useNavigate } from 'react-router-dom';

function SignUp(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // email and password uploading to supabase
        const { data, error } = await supabase.auth.signUp({
            email:email,
            password:password,
        });


        if (error) {
            setError(error.message);
            return;
        } 
        
         //Send Profile Data to profiles table in Supabase

         const {user} = data;
         const { profileError } = await supabase.from('profiles').insert([
            {
                user_id:user.user_id, //userid from users table
                username,
            },
         ]);

        if (profileError) {
            setError(profileError.message);
        } else{
            setSuccess(true);
            console.log('Sign Up Successful');
            navigate('./login');
        }
    };
    
    return (
        <form onSubmit={handleSignUp}>
            <input 
                type ='text'
                placeholder='Username'
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type='Password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <button type='submit'>Create Account</button>
        </form>
    );
}

export default SignUp;

