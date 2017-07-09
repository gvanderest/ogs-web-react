export default function generateReducer(initialState = {}, handlers = {}) {
    return function generatedReducer(state = initialState, action = {}) {
        let handler = handlers[action.type];
        return handler ? handler(state, action) : state;
    };
}
