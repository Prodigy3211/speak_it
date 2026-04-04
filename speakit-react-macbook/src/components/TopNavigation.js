import { useNavigate } from 'react-router-dom';


 function TopNavigation (){

    const navigate = useNavigate();

   return( 

 <div>
 <div className="flex flex-row text-center text-md text-bold items-center justify-center gap-4 border-b-2 pb-2 border-gray-300">
      <img src='https://qdpammoeepwgapqyfrrh.supabase.co/storage/v1/object/public/speak-it-brand-assets/speak_itLogo.png' alt='Speak It Logo' className='w-32' onClick={() => navigate('/dashboard')}/>
    <h1 className='text-lg italic'>Speak Now Or Forever Hold Your Peace</h1>
 </div>
 </div>
   )
 };

 export default TopNavigation;