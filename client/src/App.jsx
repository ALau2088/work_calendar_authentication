import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/Navbar.jsx';
import Calendar from './components/Calendar.jsx';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Navbar />
          <Calendar />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
