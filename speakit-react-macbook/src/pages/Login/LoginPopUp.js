//This will popup when a user is not logged in and tries to do something that requires them to be logged in
import { useNavigate } from 'react-router-dom';

export default function LoginPopUp() {
    const navigate = useNavigate();
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Join the Discussion!</h1>
                <p className="mb-4">Sign up or login to continue</p>
                <div className="flex flex-col gap-2">
                <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                    navigate('/login');
                }}
                >Login</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                    navigate('/signup');
                }}
                >Sign Up</button>
                </div>
            </div>
        </div>
    )
}