import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//Allows a user to enter their username and password
//If successful, will redirect to "My Profile page"

function Login () {
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
            });
            if (response.data.message === 'Login Successful!')
                {
                    alert(response.data.message);
                    //saves data for later
                    localStorage.setItem('token',response.data.token);
                    //Send to My Profile page.
                    navigate('/my-profile');
            }
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