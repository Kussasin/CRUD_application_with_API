import { createStore } from "redux";

interface IState {
    counter: number;
}

const initialState = { counter: 0 };

enum ActionTypes {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT",
}

interface IIncrementAction {
    type: ActionTypes.INCREMENT;
}

interface IDecrementAction {
    type: ActionTypes.DECREMENT;
}

type Action = IIncrementAction | IDecrementAction;

function reducer(state: IState = initialState, action: Action): IState {
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return { ...state, counter: state.counter + 1 };
        case ActionTypes.DECREMENT:
            return { ...state, counter: state.counter - 1 };
        default:
            return state;
    }
}

const store = createStore(reducer);

const increment = () => ({ type: ActionTypes.INCREMENT });
const decrement = () => ({ type: ActionTypes.DECREMENT });

export { increment, decrement, store };
export type RootState = ReturnType<typeof store.getState>;