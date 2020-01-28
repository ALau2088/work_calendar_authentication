import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, getUserInfo } from '../actions/users';

class UserSelect extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUserEmail: '',
      users: []
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setState({
        currentUserEmail: this.props.currentUser.email
      });
    }
  }

  handleChange(e) {
    const changeUserEmail = e.target.value;
    this.props.getUserInfo(changeUserEmail);
    this.setState({ currentUserEmail: changeUserEmail });
  }

  render() {
    return (
      <label>
        Pick a user:
        <select
          className='form-control'
          value={this.state.currentUserEmail}
          onChange={(this.handleChange = this.handleChange.bind(this))}
        >
          {this.props.users.map((user, index) => (
            <option key={index} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  currentUser: state.users.user
});

export default connect(mapStateToProps, { getUsers, getUserInfo })(UserSelect);
