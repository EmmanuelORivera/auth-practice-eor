import React, { useEffect } from 'react';
import './App.css';
import M from 'materialize-css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Wellcome from './components/Wellcome/Wellcome';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container z-depth-1'>
          <Switch>
            <Route exact path='/' component={Wellcome} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
