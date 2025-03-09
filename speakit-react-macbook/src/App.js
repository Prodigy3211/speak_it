import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './components/SignUp';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import './index.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Thread from './components/Thread';
import ThreadList from './components/ThreadList';
import CreateClaim from './components/Forms/CreateClaim';
import AddComment from './components/Forms/AddComment';

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
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/my-profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-claim' element={<CreateClaim />} />
          <Route path='/add-comment' element={<AddComment />} />
          {/* Dynamic Routes for Categories and threads  */}
          <Route path='/category/:category' element={<ThreadList />} />
          <Route
            path='/category/:category/thread/:claimId'
            element={<Thread />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
