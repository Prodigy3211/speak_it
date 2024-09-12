import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './index.css';

function App() {
  return (
      <div className='navBar'>
        <Routes>
          <Route path = "/" element = {<SignUp />} />
          <Route path ="/login" element ={<Login />} />
          <Route path = "/signup" element = {<SignUp />} />
          <Route path='/my-profile' element = {<Profile />} />
        </Routes>
      </div>
  );
}

export default App;
