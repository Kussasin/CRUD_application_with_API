import { TokenState } from '../Types/Types';
import { TokenActionTypes, SET_TOKEN, REMOVE_TOKEN } from './actions';

const initialTokenState: TokenState = {
    token: null,
};

const tokenReducer = (
    state = initialTokenState,
    action: TokenActionTypes,
): TokenState => {
    switch (action.type) {
        case SET_TOKEN:
            return { ...state, token: action.payload };
        case REMOVE_TOKEN:
            return { ...state, token: null };
        default:
            return state;
    }
};

export default tokenReducer;
