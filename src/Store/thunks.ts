import { SET_TOKEN, REMOVE_TOKEN, SET_USER, REMOVE_USER, SET_USERS, GET_USER_BY_ID } from './actions';
import { Token, UserList, UserProfile } from '../Types/Types';

export const setToken = (token: Token) => ({ type: SET_TOKEN, payload: token });

export const removeToken = () => ({ type: REMOVE_TOKEN });

export const setUser = (user: UserProfile) => ({ type: SET_USER, payload: user });

export const removeUser = () => ({ type: REMOVE_USER});

export const setUsers = (users: UserList) => ({ type: SET_USERS, payload: users });

export const getUserFromList = (user_by_id: UserProfile) => ({ type: GET_USER_BY_ID, payload: user_by_id });

export const clearUserDetails = () => {
    return {
      type: 'CLEAR_USER_DETAILS',
    };
  }