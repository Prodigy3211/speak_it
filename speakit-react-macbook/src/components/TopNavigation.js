import { useNavigate } from 'react-router-dom';


 function TopNavigation (){

    const navigate = useNavigate();

   return( 

 <div>
 <div className="bg-gray-900 flex flex-row text-center text-md text-bold items-center justify-center gap-4 border-b-2 border-gray-300">
      <img src='/speak-itHeader.png' alt='Speak It Logo' className='w-32' onClick={() => navigate('/dashboard')}/>
    <h1 className='text-lg text-white'>Speak Now Or Forever Hold Your Peace</h1>
 </div>
 </div>
   )
 };

 export default TopNavigation;