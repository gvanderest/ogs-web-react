"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateReducer(initialState, handlers) {
    if (initialState === void 0) { initialState = {}; }
    if (handlers === void 0) { handlers = {}; }
    return function generatedReducer(state, action) {
        if (state === void 0) { state = initialState; }
        if (action === void 0) { action = {}; }
        var handler = handlers[action.type];
        return handler ? handler(state, action) : state;
    };
}
exports.default = generateReducer;
//# sourceMappingURL=generateReducer.js.map