import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { faHome, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function BottomNavigation () {
    const navigate = useNavigate();

    return (
        <div className='fixed bottom-0 left-0 right-0 bg-white border-2 border-gray-300 w-screen p-4'>
            <div className='flex justify-evenly p-2'>
                <FontAwesomeIcon icon={faHome} onClick={() => navigate('/dashboard')} />
                <FontAwesomeIcon icon={faPlus} onClick={() => navigate('/create-claim')} />
                <FontAwesomeIcon icon={faUser} onClick={() => navigate('/my-profile')} />
            </div>
        </div>
    )
}

export default BottomNavigation;