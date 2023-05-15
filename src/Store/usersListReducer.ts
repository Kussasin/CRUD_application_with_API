import { UserList } from '../Types/Types';
import {SET_USERS, GET_USER_BY_ID, UserListActionTypes } from './actions';

const initialUserState: UserList = {
  users: [],
  user_by_id: null,
};

const userListReducer = (state = initialUserState, action: UserListActionTypes): UserList => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload.users };
    case GET_USER_BY_ID:
      return { ...state, user_by_id: action.payload };
    default:
      return state;
  }
};

export default userListReducer;
