import React, {useState} from 'react';
import axios from 'axios';

function SignUp(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/signup',{
                username,
                email,
                password,
            });
            
            alert(response.data.message);
        } catch (error){
            console.error(error);
            alert('Error Signing Up');
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
            <button type='submit'>Create Account</button>
        </form>
    );
}

export default SignUp;

