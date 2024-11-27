import React, {useState} from 'react';
import supabase from '../server/supabaseClient';

function SignUp(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('null');
    const [success, setSuccess] = useState('false')

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // email and password uploading to supabase
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });


        if (authError) {
            setError(authError.message);
            return;
        } 
        
         //Send Profile Data to profiles table in Supabase

         const {user} = authData;
         const { error:profileError } = await supabase.from('profiles').insert([
            {
                id:user.id, //userid from users table
                email,
            },
         ]);

        if (profileError) {
            setError(profileError.message);
        } else{
            setSuccess(true);
            console.log('Sign Up Successful');
        }

       


        // try {
        //     const response = await axios.post('http://localhost:8000/signup',{
        //         username,
        //         email,
        //         password,
        //     });
            
        //     alert(response.data.message);
        // } catch (error){
        //     console.error(error);
        //     alert('Error Signing Up');
        // }
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
            <button type='submit'>Create Account</button>
        </form>
    );
}

export default SignUp;

