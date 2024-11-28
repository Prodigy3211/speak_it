import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../server/supabaseClient';

//Allows a user to enter their username and password
//If successful, will redirect to "My Profile page"
console.log(supabase);

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

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error){
      setError(error.message); //Display error message
    } else {
      setSuccess(true); //login successful!
      console.log('Login Successful');
      navigate('/my-profile')
    };
    
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;
