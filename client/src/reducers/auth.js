import { SET_CURRENT_USER } from '../actions/types';

const TEST_DISPATCH = 'TEST_DISPATCH';

const initialState = {
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
