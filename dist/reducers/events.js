"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("../actions/events");
var events_2 = require("../actions/events");
var initialState = {
    fetchingAll: false,
    byId: {}
};
function handleFetchedEvent(state, action) {
    var event = action.event;
    return __assign({}, state, { byId: __assign({}, state.byId, (_a = {}, _a[event.id] = __assign({}, state.byId[event.id], event, { fetching: false }), _a)) });
    var _a;
}
function handleFetchedEvents(state, action) {
    var events = action.events;
    state = __assign({}, state, { fetchingAll: false, byId: __assign({}, state.byId) });
    events.forEach(function (event) {
        var id = event.id;
        var existing = state.byId[id];
        state.byId[id] = __assign({}, existing, event);
    });
    return state;
}
function handleFetchingEvent(state, action) {
    var id = action.options.id;
    var existing = state.byId[id];
    return __assign({}, state, { byId: __assign({}, state.byId, (_a = {}, _a[id] = __assign({}, existing, { fetching: true, failed: false }), _a)) });
    var _a;
}
function handleErrorFetchingEvent(state, action) {
    var id = action.options.id;
    return __assign({}, state, { byId: __assign({}, state.byId, (_a = {}, _a[id] = {
            fetching: false,
            failed: true
        }, _a)) });
    var _a;
}
function handleFetchingEvents(state) {
    return __assign({}, state, { fetchingAll: true });
}
function eventsReducer(state, action) {
    if (state === void 0) { state = initialState; }
    if (action === void 0) { action = {}; }
    var handlers = (_a = {},
        _a[events_1.FETCHING_EVENT] = handleFetchingEvent,
        _a[events_1.FETCHED_EVENT] = handleFetchedEvent,
        _a[events_1.ERROR_FETCHING_EVENT] = handleErrorFetchingEvent,
        _a[events_2.FETCHING_EVENTS] = handleFetchingEvents,
        _a[events_2.FETCHED_EVENTS] = handleFetchedEvents,
        _a);
    var handler = handlers[action.type];
    return handler ? handler(state, action) : state;
    var _a;
}
exports.default = eventsReducer;
//# sourceMappingURL=events.js.map