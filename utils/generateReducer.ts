import { IReduxAction, IReduxState } from "../interfaces";

type IHandler = (state: IReduxState, action: IReduxAction) => IReduxState;

type IGeneratedReducer = (state: IReduxState, action: IReduxAction) => IReduxState;

const defaultAction: IReduxAction = { type: null };

export default function generateReducer(
    initialState: IReduxState,
    handlers: { [key: string]: IHandler },
): IGeneratedReducer {
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
