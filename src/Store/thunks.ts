import { SET_TOKEN, REMOVE_TOKEN, SET_USER, REMOVE_USER } from './actions';
import { Token, UserProfile } from '../Types/Types';

export const setToken = (token: Token) => ({ type: SET_TOKEN, payload: token });

export const removeToken = () => ({ type: REMOVE_TOKEN });

export const setUser = (user: UserProfile) => ({ type: SET_USER, payload: user });

export const removeUser = () => ({ type: REMOVE_USER});