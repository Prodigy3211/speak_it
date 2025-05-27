import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../server/supabaseClient';


function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try{

        // email and password uploading to supabase
        const { data, error } = await supabase.auth.signUp({
            email:email,
            password:password,
        });
       
    
        if (error) {
            setError(error.message);
            return;
        } 

        if(!data?.user?.id){
            setError('User ID is missing');
            return;
        } else{
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 15000);
        }
    } catch (error){
        setError(error.message);
    }
    };
    
    return (
        <>
        <div>
        <img src='/speak-itHeader.png' alt='Speak It Logo' className='w-full px-24' onClick={() => navigate('/login')}/>
        { success && 
        <div>
        <p className="text-center text-lg font-bold">
            Thank you For signing up!</p>
            <p className='text-center'>Check your Email for a Confirmation Link from Supabase</p>
            </div>
            }
        
        <form onSubmit={handleSignUp} className=' border-2 border-gray-300 border-solid mt-8 rounded-md p-4'>
        <div className='flex flex-col items-center'>
        <div>
            <p className='text-center text-lg font-bold'>Create an account</p>
        </div>
            <div className='flex flex-col justify-center items-center gap-4 px-16'>
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
            {success && <p className="text-green-500">Validation Email Sent</p>}
            <button className='bg-blue-500 text-white rounded-md p-2 mt-4' type='submit'>Create Account</button>
            </div>
            </div>
        </form>
        </div>
        </>
    );
}

export default SignUp;

