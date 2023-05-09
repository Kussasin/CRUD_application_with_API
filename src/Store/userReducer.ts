import { UserState } from '../Types/Types';
import { SET_USER, REMOVE_USER, UserActionTypes } from './actions';

const initialUserState: UserState = {
    user: null,
};

const userReducer = (
    state = initialUserState,
    action: UserActionTypes,
): UserState => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default userReducer;
