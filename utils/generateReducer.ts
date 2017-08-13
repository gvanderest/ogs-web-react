import ReduxAction from "../classes/ReduxAction";

type ReduxHandler = (state: any, action: ReduxAction) => any;

type IGeneratedReducer = (state: any, action: ReduxAction) => any;

const defaultAction: ReduxAction = { type: null };

export default function generateReducer(
    initialState: any,
    handlers: { [key: string]: ReduxHandler },
): IGeneratedReducer {
    return function generatedReducer(
        state: any = initialState,
        action: ReduxAction = defaultAction,
    ): any {
        const handler: ReduxHandler = handlers[action.type];

        if (typeof handler === "function") {
            return handler(state, action);
        } else {
            return state;
        }
    };
}
