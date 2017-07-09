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
var reduceRecord_1 = require("../utils/reduceRecord");
var generateReducer_1 = require("../utils/generateReducer");
var tickets_1 = require("../actions/tickets");
function handleFetchingTickets(state) {
    return __assign({}, state, { fetchingAll: true });
}
function handleFetchedTickets(state, action) {
    var tickets = action.tickets;
    var newState = __assign({}, state, { byId: __assign({}, state.byId) });
    tickets.forEach(function (ticket) {
        newState.byId[ticket.id] = __assign({}, newState.byId[ticket.id], ticket);
    });
    return newState;
}
function handleFetchedTicket(state, action) {
    var ticket = action.ticket;
    return reduceRecord_1.default(state, ticket);
}
exports.default = generateReducer_1.default({
    byId: {},
    fetchingAll: false
}, (_a = {},
    _a[tickets_1.FETCHING_TICKETS] = handleFetchingTickets,
    _a[tickets_1.FETCHED_TICKETS] = handleFetchedTickets,
    _a[tickets_1.FETCHED_TICKET] = handleFetchedTicket,
    _a));
var _a;
//# sourceMappingURL=tickets.js.map