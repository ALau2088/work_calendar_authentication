import axios from 'axios';

import { GET_USERS } from './types';
import { GET_USER_INFO } from './types';
import { ADD_USER } from './types';

export const getUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
      dispatch(getUserInfo(res.data[0]['email']));
    })
    .catch(err => console.log(err));
};

export const getUserInfo = email => dispatch => {
  axios
    .get('/api/user', {
      params: {
        email
      }
    })
    .then(res => {
      dispatch({
        type: GET_USER_INFO,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addUser = userInfo => dispatch => {
  axios
    .post('/api/user', userInfo)
    .then(() =>
      dispatch({
        type: ADD_USER,
        payload: userInfo
      })
    )
    .then(() => dispatch(getUserInfo(userInfo.email)))
    .catch(err => console.log(err));
};
