import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { faHome, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BottomNavigation () {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedButton, setSelectedButton] = useState('');

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/dashboard')) {
            setSelectedButton('home');
        } else if (path.includes('/create-claim')) {
            setSelectedButton('create-claim');
        } else if (path.includes('/my-profile')) {
            setSelectedButton('my-profile');
        }
    }, [location]);

    const handleButtonSelect = (item) => {    
        setSelectedButton(item);
    }

    const buttonClass = (item) => {
        return selectedButton === item ? 'text-white' : 'text-gray-400';
    }

    const buttonTextClass = (item) => {
        return selectedButton === item ? 'text-white' : 'text-gray-400';
    }

    return (
        <div className='fixed bottom-0 left-0 right-0 w-screen border-2 bg-gray-900/90'>
            <div className='flex justify-around p-4'>
                <div className='hover:cursor-pointer'>
                <button
                className={`${buttonClass('home')} flex flex-col items-center`}
                onClick={() => {
                    navigate('/dashboard');
                    handleButtonSelect('home');
                }}>
                <FontAwesomeIcon icon={faHome} alt="Home"/>
                <span className={buttonTextClass('home')}>Home</span>
                </button>
                </div>
                <div className='hover:cursor-pointer'>
                <button
                className={`${buttonClass('create-claim')} flex flex-col items-center`}
                onClick={() => {
                    navigate('/create-claim');
                    handleButtonSelect('create-claim');
                }}>
                    <FontAwesomeIcon icon={faPlus} alt="Create Claim"/>
                <span className={buttonTextClass('create-claim')}>Create Claim</span>
                </button>
                </div>
                
                <div className='hover:cursor-pointer'>
                <button
                className={`${buttonClass('my-profile')} flex flex-col items-center`}
                onClick={() => { 
                    navigate('/my-profile');
                    handleButtonSelect('my-profile');
                }}>
                <FontAwesomeIcon icon={faUser} alt="My Profile"
                />
                <span className={buttonTextClass('my-profile')}>My Profile</span>
                </button>
                </div>
            </div>
        </div>
    )
}

export default BottomNavigation;