import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../server/supabaseClient';


function SignUp(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setAuth(false);

        // email and password uploading to supabase
        const { data, error } = await supabase.auth.signUp({
            email:email,
            password:password,
        });
       
    
        if (error) {
            setError(error.message);
            console.error('SignUp Failed!', data);
            console.log('Sign Up Error', error);
            return;
        }  else {
            // const userId = data?.user.id;
            console.log('Sign Up Successful!' , data.user);
            console.log ('Confirmation Email sent to:' , data.user.email);
            navigate('/login');
        
        
        //  Send Profile Data to profiles table in Supabase

         const { data: profileData, error: profileError } = await supabase
         .from('profiles')
         .insert([
            {
                user_id: data.user.id, //userid from users table
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
            console.log('Sign Up Successful',profileData);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
    }
        }
    };
    
    return (
        <form onSubmit={handleSignUp} className='flex flex-col items-center justify-center bg-gray-200 mx-8 rounded-md p-4'>
            <div>
            <label>Username: </label>
            <input 
                type ='text'
                placeholder='Username'
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Email: </label>
            <input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Password: </label>
            <input
                type='Password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <button className='bg-blue-500 text-white rounded-md p-2' type='submit'>Create Account</button>
            </div>
        </form>
    );
}

export default SignUp;

