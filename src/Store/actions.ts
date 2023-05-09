import { Token, UserProfile } from '../Types/Types';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'ADD_USER';
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

export type UserActionTypes = SetUserAction | RemoveUserAction;
export type TokenActionTypes = SetTokenAction | RemoveTokenAction;

