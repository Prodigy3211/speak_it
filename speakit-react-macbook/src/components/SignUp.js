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
        <div>
        <img src='/speak-itHeader.png' alt='Speak It Logo' className='w-full px-24' onClick={() => navigate('/login')}/>
        { success && 
        <div className="text-center p-4">
            <p className="text-lg font-bold text-green-600">
                Thank you for signing up!
            </p>
            <p className='text-gray-700'>
                Please check your email for a verification link. You will be redirected to login in 15 seconds.
            </p>
        </div>
        }
        
        <form onSubmit={handleSignUp} className='border-2 border-gray-300 border-solid mt-8 rounded-md p-4 mx-4'>
            <div className='flex flex-col items-center'>
                <div>
                    <p className='text-center text-lg font-bold'>Sign Up</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-4 px-16'>
                    <div>
                        <label>What's your Email? </label>
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
                        <label>Create a Password: </label>
                        <p className='text-xs text-gray-500'>At least 6 characters, a number, and a special character</p>
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
        </>
    );
}

export default SignUp;

