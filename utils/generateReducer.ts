import IAction from "../interfaces/IAction";

export default function generateReducer(initialState = {}, handlers = {}) {
    return function generatedReducer(state = initialState, action: IAction = { type: null }) {
        const handler: (object, IAction) => object = handlers[action.type];
        return handler ? handler(state, action) : state;
    };
}
