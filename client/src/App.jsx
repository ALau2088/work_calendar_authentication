import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Calendar from './components/Calendar.jsx';
import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/calendar' component={Calendar} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
