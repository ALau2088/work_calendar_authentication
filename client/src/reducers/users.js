import { GET_USERS, GET_USER_INFO, ADD_USER } from '../actions/types.js';

const initialState = {
  users: [],
  currentUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_USER_INFO:
      return {
        ...state,
        currentUser: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
}
