import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

 function TopNavigation (){

    const navigate = useNavigate();

   return( 
 <>
 <div>
    <h1>Speak Now Or Forever Hold Your Peace</h1>
 </div>
 <div>
    <FontAwesomeIcon icon={faUser} onClick={() => navigate('/my-profile')} />
    <p onClick={() => navigate('/dashboard')}>Dashboard</p>
    <p>Create Thread</p>
 </div>
 {/* <FontAwesomeIcon icon={faHouse} />
 <FontAwesomeIcon icon={faCamera} /> */}
 </>
   )
 };

 export default TopNavigation;