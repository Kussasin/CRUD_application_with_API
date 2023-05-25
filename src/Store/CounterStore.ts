import { createStore, combineReducers, applyMiddleware } from 'redux';
import tokenReducer from './tokenReducer';
import thunk from 'redux-thunk';
import { IIncrementAction, IDecrementAction, ActionTypes, IState } from '../Types/Types';
import userReducer from './userReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userListReducer from './usersListReducer';
import companiesListReducer from './companiesListReducer';

const initialState = { counter: 0 };

type Action = IIncrementAction | IDecrementAction;

function counterReducer(state: IState = initialState, action: Action): IState {
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return { ...state, counter: state.counter + 1 };
        case ActionTypes.DECREMENT:
            return { ...state, counter: state.counter - 1 };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    counter: counterReducer,
    token: tokenReducer,
    user: userReducer,
    users: userListReducer,
    companies: companiesListReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

const increment = () => ({ type: ActionTypes.INCREMENT });
const decrement = () => ({ type: ActionTypes.DECREMENT });

export { increment, decrement, store, persistor };
export type RootState = ReturnType<typeof store.getState>;
