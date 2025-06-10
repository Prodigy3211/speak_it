import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { faHome, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function BottomNavigation () {
    const navigate = useNavigate();

    return (
        <div className='fixed bottom-0 left-0 right-0 opacity-90 bg-gray-900 border-2 w-screen p-4'>
            <div className='flex justify-around p-2 opacity-80'>
                <FontAwesomeIcon icon={faHome} alt="Home"
                className='text-white opacity-100'
                onClick={() => navigate('/dashboard')} />
                <FontAwesomeIcon icon={faPlus} alt="Create Claim"
                className='text-white opacity-100'
                onClick={() => navigate('/create-claim')} />
                <FontAwesomeIcon icon={faUser} alt="My Profile"
                className='text-white opacity-100'
                onClick={() => navigate('/my-profile')} />
            </div>
        </div>
    )
}

export default BottomNavigation;