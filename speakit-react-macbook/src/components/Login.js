import { useState } from "react";
import axios from 'axios';

function Login () {
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('https://localhost:5000/login', {
                email,
                password,
            });

            alert(response.data.message);
            localStorage.setItem('token',response.data.token); //saves data for later
        } catch (error){
            console.error(error);
            alert('Error Logging In :(');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
            type ="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type ="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit">Login</button>
        </form>
    );
}


export default Login;