import { SET_TOKEN, REMOVE_TOKEN, SET_USER, REMOVE_USER, SET_USERS, GET_USER_BY_ID, GET_COMPANY_BY_ID, SET_COMPANIES, REMOVE_COMPANY } from './actions';
import { Company, CompanyList, Token, UserList, UserProfile } from '../Types/Types';

export const setToken = (token: Token) => ({ type: SET_TOKEN, payload: token });

export const removeToken = () => ({ type: REMOVE_TOKEN });

export const setUser = (user: UserProfile) => ({ type: SET_USER, payload: user });

export const removeUser = () => ({ type: REMOVE_USER});

export const setUsers = (users: UserList) => ({ type: SET_USERS, payload: users });

export const getUserFromList = (user_by_id: UserProfile) => ({ type: GET_USER_BY_ID, payload: user_by_id });

export const setCompanies = (companies: CompanyList) => ({ type: SET_COMPANIES, payload: companies });

export const getCompanyFromList = (company_by_id: Company) => ({ type: GET_COMPANY_BY_ID, payload: company_by_id });

export const removeCompany = () => ({ type: REMOVE_COMPANY});

export const clearUserDetails = () => {
    return {
      type: 'CLEAR_USER_DETAILS',
    };
  }