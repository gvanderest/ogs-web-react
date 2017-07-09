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
var generateReducer_1 = require("../utils/generateReducer");
var eventGamesCollections_1 = require("../actions/eventGamesCollections");
function handleFetchedEventGamesCollection(state, action) {
    var eventGamesCollection = action.eventGamesCollection;
    return __assign({}, state, { byId: __assign({}, state.byId, (_a = {}, _a[eventGamesCollection.id] = __assign({}, state.byId[eventGamesCollection.id], eventGamesCollection, { fetching: false }), _a)) });
    var _a;
}
function handleFetchingEventGamesCollection(state, action) {
    var id = action.id;
    return __assign({}, state, { byId: __assign({}, state.byId, (_a = {}, _a[id] = {
            fetching: true
        }, _a)) });
    var _a;
}
exports.default = generateReducer_1.default({
    byId: {}
}, (_a = {},
    _a[eventGamesCollections_1.FETCHING_EVENT_GAMES_COLLECTION] = handleFetchingEventGamesCollection,
    _a[eventGamesCollections_1.FETCHED_EVENT_GAMES_COLLECTION] = handleFetchedEventGamesCollection,
    _a));
var _a;
//# sourceMappingURL=eventGamesCollections.js.map