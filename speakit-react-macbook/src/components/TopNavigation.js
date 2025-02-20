import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faCamera } from '@fortawesome/free-regular-svg-icons';

 function TopNavigation (){

   return( 
 <>
 <div>
    Speak Now Or Forever Hold Your Peace
 </div>
 <FontAwesomeIcon icon={faUser} />
 <FontAwesomeIcon icon={faHouse} />
 <FontAwesomeIcon icon={faCamera} />
 </>
   )
 };

 export default TopNavigation;