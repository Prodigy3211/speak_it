import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import './index.css';
import ProtectedRoutes from './components/ProtectedRoutes';

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
