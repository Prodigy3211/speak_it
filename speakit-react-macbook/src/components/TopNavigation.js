import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';


 function TopNavigation (){

    const navigate = useNavigate();

   return( 
 <>
 <div>
 <div className="flex flex-row text-center text-md text-bold items-center justify-center gap-4">
      <img src='/speak-itHeader.png' alt='Speak It Logo' className='w-32' onClick={() => navigate('/dashboard')}/>
    <h1 className='text-2xl'>Speak Now Or Forever Hold Your Peace</h1>
 </div>
 </div>
 <div className='bg-gray-200 border-1 border-gray-300 rounded-lg flex flex-row justify-evenly p-4'>
    <div>
      <FontAwesomeIcon icon={faUser} onClick={() => navigate('/my-profile')} />
   </div>
   <div>
    <p onClick={() => navigate('/dashboard')}>Dashboard</p>
    </div>
    <div>
    <p onClick={() => navigate('/create-claim')}>Create Claim</p>
    </div>
 </div>
 {/* <FontAwesomeIcon icon={faHouse} />
 <FontAwesomeIcon icon={faCamera} /> */}
 </>
   )
 };

 export default TopNavigation;