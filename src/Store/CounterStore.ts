import { createStore, combineReducers, applyMiddleware } from 'redux';
import tokenReducer from './tokenReducer';
import thunk from 'redux-thunk';
import { IIncrementAction, IDecrementAction, ActionTypes, IState } from '../Types/Types';
import userReducer from './userReducer';

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
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const increment = () => ({ type: ActionTypes.INCREMENT });
const decrement = () => ({ type: ActionTypes.DECREMENT });

export { increment, decrement, store };

export type RootState = ReturnType<typeof store.getState>;