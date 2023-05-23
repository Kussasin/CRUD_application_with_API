import { Company, CompanyList, Token, UserList, UserProfile } from '../Types/Types';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'ADD_USER';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const SET_USERS = 'SET_USERS';
export const SET_COMPANIES = 'SET_COMPANIES';
export const GET_COMPANY_BY_ID = 'GET_COMPANY_BY_ID';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const REMOVE_USER = 'REMOVE_USER';
export const REMOVE_COMPANY = 'REMOVE_COMPANY';

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

interface SetCompaniesAction {
  type: typeof SET_COMPANIES;
  payload: CompanyList;
}

interface GetCompanyByIdAction {
  type: typeof GET_COMPANY_BY_ID;
  payload: Company;
}

interface RemoveCompanyAction {
  type: typeof REMOVE_COMPANY;
}

export type CompanyListActionTypes = SetCompaniesAction | GetCompanyByIdAction | RemoveCompanyAction;
export type UserListActionTypes = SetUsersAction | GetUserByIdAction;
export type UserActionTypes = SetUserAction | RemoveUserAction;
export type TokenActionTypes = SetTokenAction | RemoveTokenAction;