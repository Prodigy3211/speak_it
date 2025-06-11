import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../server/supabaseClient';

//Allows a user to enter their username and password
//If successful, will redirect to "My Profile page"


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    //sign in user

    let {error} = await supabase.auth.signInWithPassword({
      email:email,
      password:password,
    });

    if (error){
      setError(error.message); //Display error message
    } else {
      setSuccess(true); //login successful!
      console.log('Login Successful');
      navigate('/dashboard')
    };
    
  };

  return (
    <>
    <div className='bg-gray-900 min-h-screen'>
    <div className="max-w-2xl mx-auto">
      <img src='/speak-itHeader.png' alt='Speak It Logo' className='w-full max-w-md mx-auto p-1'/>
    </div>
    <div className='text-white flex flex-col items-center justify-center p-4 mt-2'>
    <form onSubmit={handleLogin}
    className='border-2 border-gray-300 flex flex-col items-center justify-center mx-8 rounded-md p-8 mb-8'>
      <div>
      <label>Email: </label>
      </div>
      <div><input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='border-2 bg-gray-800 border-gray-500 border-solid rounded-md p-2'
        />
        </div>
        <div>
          <div>
          <label>Password: </label>
          </div>
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className='border-2 bg-gray-800 border-gray-500 border-solid rounded-md p-2'
        />
        </div>
        <div className='flex flex-col items-center justify-center'>
      {error && <p className="text-red-600">{error}, Did You Validate Your Email?</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button type='submit'
        className='bg-blue-500 text-white rounded-md p-2 w-full mt-4'
      >Login</button>
      <p>Don't have an account?</p>
        <div>
        <button 
        onClick={() => navigate('/Signup')}
        className='bg-blue-500 border-2 border-solid text-white p-2 rounded-md w-full'
          >Sign up</button>
        </div>
      </div>
    </form>
    </div>
    </div>
        </>
  );
}

export default Login;
