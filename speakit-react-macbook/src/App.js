import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Router } from 'express';

function App() {
  return (
    <Router>
      <div>
        <switch>
          <Route exact path ="/login" component ={Login} />
          <Route exact path = "/signup" component = {SignUp} />
        </switch>
      </div>
    </Router>
  );
}

export default App;
