import { IReduxAction, IReduxState } from "../interfaces";

type IHandler = (IReduxState, IReduxAction) => IReduxState;

interface IHandlers {
    [key: string]: IHandler;
}

type IGeneratedReducer = (state: IReduxState, action: IReduxAction) => IReduxState;

const defaultAction = { type: null };

export default function generateReducer(initialState: IReduxState, handlers: IHandlers): IGeneratedReducer {
    return function generatedReducer(
        state: IReduxState = initialState,
        action: IReduxAction = defaultAction,
    ): IReduxState {
        const handler: IHandler = handlers[action.type];

        if (typeof handler === "function") {
            return handler(state, action);
        } else {
            return state;
        }
    };
}
