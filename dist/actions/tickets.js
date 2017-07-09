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
exports.FETCHING_TICKET = 'FETCHING_TICKET';
exports.FETCHED_TICKET = 'FETCHED_TICKET';
exports.ERROR_FETCHING_TICKET = 'ERROR_FETCHING_TICKET';
exports.FETCHING_TICKETS = 'FETCHING_TICKETS';
exports.FETCHED_TICKETS = 'FETCHED_TICKETS';
exports.ERROR_FETCHING_TICKETS = 'ERROR_FETCHING_TICKETS';
function fetchTickets(options) {
    return function (dispatch) {
        var promise = new Promise(function (yes, no) {
            fetch('https://qa7.fantasydraft.com/api/v1/tickets/', {
                credentials: 'include',
                method: 'GET',
                mode: 'cors'
            }).then(function (response) {
                response.json().then(function (_a) {
                    var objects = _a.objects;
                    return yes(objects);
                }, function () {
                    return no([{ type: 'JSON_ERROR' }]);
                });
            }, function () {
                return no([{ type: 'NOT_FOUND' }]);
            });
        });
        dispatch({ type: exports.FETCHING_TICKETS, options: options });
        promise.then(function (tickets) {
            dispatch({ type: exports.FETCHED_TICKETS, options: options, tickets: tickets });
        }, function (errors) {
            dispatch({ type: exports.ERROR_FETCHING_TICKETS, options: options, errors: errors });
        });
        return promise;
    };
}
exports.fetchTickets = fetchTickets;
function fetchTicket(options) {
    return function (dispatch) {
        var promise = new Promise(function (yes, no) {
            var id = options.id;
            fetch("https://qa7.fantasydraft.com/api/v1/tickets/" + id + "/", {
                credentials: 'include',
                method: 'GET',
                mode: 'cors'
            }).then(function (response) {
                response.json().then(function (raw) {
                    // FIXME Parse this information into normalized format
                    var ticket = __assign({}, raw);
                    ticket.id = String(ticket.id);
                    ticket.eventId = String(ticket.event.id);
                    console.log('HYDRATED TICKET', ticket);
                    return yes(ticket);
                }, function () {
                    return no([{ type: 'JSON_ERROR' }]);
                });
            }, function () {
                return no([{ type: 'NOT_FOUND' }]);
            });
        });
        dispatch({ type: exports.FETCHING_TICKET, options: options });
        promise.then(function (ticket) {
            dispatch({ type: exports.FETCHED_TICKET, options: options, ticket: ticket });
        }, function (errors) {
            dispatch({ type: exports.ERROR_FETCHING_TICKET, options: options, errors: errors });
        });
        return promise;
    };
}
exports.fetchTicket = fetchTicket;
//# sourceMappingURL=tickets.js.map