import { Token, UserList, UserProfile } from '../Types/Types';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'ADD_USER';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const SET_USERS = 'SET_USERS';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const REMOVE_USER = 'REMOVE_USER';

interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: Token;
}

interface RemoveTokenAction {
  type: typeof REMOVE_TOKEN;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: UserProfile;
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

interface SetUsersAction {
  type: typeof SET_USERS;
  payload: UserList;
}

interface GetUserByIdAction {
  type: typeof GET_USER_BY_ID;
  payload: UserProfile;
}


export type UserListActionTypes = SetUsersAction | GetUserByIdAction;
export type UserActionTypes = SetUserAction | RemoveUserAction;
export type TokenActionTypes = SetTokenAction | RemoveTokenAction;