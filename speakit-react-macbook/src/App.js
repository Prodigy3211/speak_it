import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './components/SignUp';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import './index.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Thread from './components/Threads/Thread';
import ThreadList from './components/Threads/ThreadList';
import CreateClaim from './components/Forms/CreateClaim';
import AddComment from './components/Forms/AddComment';
import ResetPassword from './pages/Login/ResetPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reset-password' element={<ResetPassword />} />

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
