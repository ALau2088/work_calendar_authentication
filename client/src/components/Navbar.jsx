import React, { Component, Fragment } from 'react';
import UserSelect from './UserSelect.jsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddUserModal from './AddUserModal.jsx';

class Navbar extends Component {
  static propTypes = {
    currentUserFirstName: PropTypes.string.isRequired,
    currentUserLastName: PropTypes.string.isRequired
  };
  render() {
    return (
      <Fragment>
        <nav className='navbar navbar-light bg-light'>
          <a className='navbar-brand'>
            {this.props.currentUserFirstName} {this.props.currentUserLastName}'s
            Work Calendar
          </a>
          <AddUserModal />

          <UserSelect />
        </nav>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUserFirstName: state.users.currentUser.first_name,
  currentUserLastName: state.users.currentUser.last_name
});
export default connect(mapStateToProps, null)(Navbar);
