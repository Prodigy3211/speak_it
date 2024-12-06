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
        let { data, error } = await supabase.auth.signUp({
            email:email,
            password:password,
        });

        console.log(email, password, username);

        if (error) {
            setError(error.message);
            console.error('SignUp Failed!')
            console.log('Sign Up Error', error);
            return;
        }  else {
            const userId = data?.user.id;
            console.log('Sign Up Successful!' , data.user);
            console.log ('Confirmation Email sent' , data.user.email);
        
        
         //Send Profile Data to profiles table in Supabase

         
         const { data: profileData, error: profileError } = await supabase
         .from('profiles')
         .insert([
            {
                id: userId, //userid from users table
                username:username,
            },
         ]);

         if (!data?.user?.id){
            setError('User ID is missing');
            return;
         }

        if (profileError) {
            console.error('Profile Insert Error', profileError);
            setError(profileError.message);
        } else{
            setSuccess(true);
            console.log('Sign Up Successful');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
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

