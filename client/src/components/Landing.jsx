import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>Landing</div>
        <div className='row'>
          <Link to='/register'>Sign Up</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    );
  }
}

export default Landing;
