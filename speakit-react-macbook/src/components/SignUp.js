import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../server/supabaseClient';


function SignUp(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [ setAuth] = useState(false);
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
        <>
        <div>
        <img src='/speak-itHeader.png' alt='Speak It Logo' className='w-full px-24' onClick={() => navigate('/login')}/>
        <form onSubmit={handleSignUp} className=' border-2 border-gray-300 border-solid mt-8 rounded-md p-4'>
        <div className='flex flex-col items-center'>
        <div>
            <p className='text-center text-lg font-bold'>Create an account</p>
        </div>
            <div className='flex flex-col justify-center items-center gap-4 px-16'>
            <div className='mt-4'>
            <label>Choose A Username: </label>
            <input 
                type ='text'
                placeholder='Username'
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='border-2 border-black border-solid'
            />
        </div>
        <div>
            <label>Email: *Must validate before logging in</label>
            <input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-2 border-black border-solid'
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
                className='border-2 border-black border-solid'
                required
            />
            </div>
            </div>
            <div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-500">Validate Email Before Logging In{success}</p>}
            <button className='bg-blue-500 text-white rounded-md p-2 mt-4' type='submit'>Create Account</button>
            </div>
            </div>
        </form>
        </div>
        </>
    );
}

export default SignUp;

