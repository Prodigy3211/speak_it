import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './components/SignUp';
import Profile from './pages/Profile/Profile';
import './index.css';
import ProtectedRoutes from './components/ProtectedRoutes';
// import supabase from './server/supabaseClient';

// const fetchData = async () => {
//   const {data , error} = await supabase
//   .from('profiles')
//   .select('*')

//   if (error) {
//     console.error ('error fetching data! (-_-)' , error.message);
//   } else {
//     console.log ('fetched data:', data);
//   }
// };

// fetchData();

function App() {
  return (
      <div className='navBar'>
        <Routes>
          <Route path = "/" element = {<SignUp />} />
          <Route path ="/login" element ={<Login />} />
          <Route path = "/signup" element = {<SignUp />} />
          <Route path='/my-profile' element = {
            <ProtectedRoutes>
            <Profile />
            </ProtectedRoutes>
          } />
        </Routes>
      </div>
  );
}

export default App;
