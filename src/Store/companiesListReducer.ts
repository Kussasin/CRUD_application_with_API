import { CompanyList } from '../Types/Types';
import { SET_COMPANIES, GET_COMPANY_BY_ID, CompanyListActionTypes, REMOVE_COMPANY } from './actions';

const initialUserState: CompanyList = {
    companies: [],
    company_by_id: null,
};

const companiesListReducer = (state = initialUserState, action: CompanyListActionTypes): CompanyList => {
    switch (action.type) {
        case SET_COMPANIES:
            return { ...state, companies: action.payload.companies };
        case GET_COMPANY_BY_ID:
            return { ...state, company_by_id: action.payload };
        case REMOVE_COMPANY:
            return { ...state, company_by_id: null };
        default:
            return state;
    }
};

export default companiesListReducer;
