import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../server/supabaseClient';

function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setVerificationSent(false);

        try {
            // Sign up the user
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo: `${window.location.origin}/login`,
                }
            });
       
            if (error) {
                setError(error.message);
                return;
            } 

            if (!data?.user?.id) {
                setError('User ID is missing');
                return;
            }

            setVerificationSent(true);
            setSuccess(true);
            
            // Redirect to login after 15 seconds
            setTimeout(() => {
                navigate('/login');
            }, 15000);
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.message);
        }
    };
    
    return (
        <>
        <div className='bg-gray-900 min-h-screen text-white'>
            <div classname="max-w-2xl mx-auto">
        <img src='/speak-itHeader.png' alt='Speak It Logo' className='w-full max-w-md mx-auto px-8 rounded-md' onClick={() => navigate('/login')}/>
        </div>
        { success && 
        <div className="text-center p-2">
            <p className="text-lg font-bold text-green-600">
                Thank you for signing up!
            </p>
            <p className='text-gray-700'>
                Please check your email for a verification link. You will be redirected to login in 15 seconds.
            </p>
        </div>
        }
        <div className="flex flex-col items-center justify-center mx-8 rounded-md p-2">
        <form onSubmit={handleSignUp} className='w-full max-w-md border-2 border-gray-300 border-solid mt-8 rounded-md p-4 mx-4'>
            <div className='flex flex-col items-center'>
                <div>
                    <p className='text-center text-lg font-bold mb-4'>Sign Up</p>
                </div>
                <div className='flex flex-col justify-center gap-4 px-16'>
                    <div className='flex flex-col mt-4'>
                        <div className='mb-2'>
                        <label>What's your Email? </label>
                        </div>
                        <input
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 bg-gray-800 border-gray-500 border-solid rounded-md p-2'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Create a Password </label>
                        <input
                            type='Password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-2 bg-gray-800 border-gray-500 border-solid rounded-md p-2'
                            required
                        />
                        <p className='text-xs text-gray-300 p-1'>At least 6 characters, a number, and a special character</p>
                    </div>
                </div>
                <div>
                    {error && <p className="text-red-600">{error}</p>}
                    {success && <p className="text-green-500">Validation Email Sent</p>}
                    <button 
                        className='bg-blue-500 text-white rounded-md p-2 mt-4' 
                        type='submit'
                        disabled={verificationSent}
                    >
                        {verificationSent ? 'Verification Email Sent' : 'Create Account'}
                    </button>
                </div>
            </div>
        </form>
        </div>  
        </div>
        </>
    );
}

export default SignUp;

