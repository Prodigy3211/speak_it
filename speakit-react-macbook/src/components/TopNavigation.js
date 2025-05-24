import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';


 function TopNavigation (){

    const navigate = useNavigate();

   return( 
 <>
 <div className="text-center text-lg text-bold">
    <h1>Speak Now Or Forever Hold Your Peace</h1>
 </div>
 <div className='bg-gray-200 border-1 border-gray-300 rounded-lg flex justify-center gap-8'>
    <FontAwesomeIcon icon={faUser} onClick={() => navigate('/my-profile')} />
    <p onClick={() => navigate('/dashboard')}>Dashboard</p>
    <p onClick={() => navigate('/create-claim')}>Create Claim</p>
 </div>
 {/* <FontAwesomeIcon icon={faHouse} />
 <FontAwesomeIcon icon={faCamera} /> */}
 </>
   )
 };

 export default TopNavigation;