"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
exports.FETCHING_EVENT = 'FETCHING_EVENT';
exports.FETCHED_EVENT = 'FETCHED_EVENT';
exports.ERROR_FETCHING_EVENT = 'ERROR_FETCHING_EVENT';
function fetchEvent(options) {
    return function (dispatch, getState) {
        var promise = new Promise(function (yes, no) {
            var id = options.id;
            var state = getState();
            var existing = state.events.byId[id];
            if (existing && !existing.fetching) {
                return yes(existing);
            }
            dispatch({ type: exports.FETCHING_EVENT, options: options });
            fetch("https://qa7.fantasydraft.com/api/v1/events/" + id + "/", {
                method: 'GET',
                credentials: 'include'
            }).then(function (response) {
                response.json().then(function (rawEvent) {
                    var event = {
                        id: String(rawEvent.id),
                        description: rawEvent.description,
                        ticketCount: rawEvent.ticket_count,
                        ticketMax: rawEvent.ticket_max,
                        ticketMaxPerUser: rawEvent.ticket_max_per_user,
                        ticketMin: rawEvent.ticket_min,
                        externalId: String(rawEvent.external_id),
                        closeTimestamp: moment_1.default.utc(rawEvent.close_ts).unix(),
                        cashOnly: rawEvent.cash_only,
                        payoutBreakdown: rawEvent.breakdown,
                        payoutBreakdownEnhanced: rawEvent.breakdown_enhanced,
                        lateSwap: rawEvent.can_late_swap,
                        checkTimestamp: moment_1.default.utc(rawEvent.check_ts).unix(),
                        finalizeTimestamp: moment_1.default.utc(rawEvent.finalize_ts).unix(),
                        passwordProtected: rawEvent.is_password_protected,
                        payout: rawEvent.payout,
                        payoutCurrency: rawEvent.payoutCurrency,
                        adminId: String(rawEvent.pool_admin_id),
                        profit: rawEvent.profit,
                        proPlayer: rawEvent.proplayer,
                        resourceUri: rawEvent.resource_uri,
                        selectionConstraints: rawEvent.selection_constraints,
                        ticketCost: rawEvent.ticket_cost,
                        ticketCostCurrency: rawEvent.ticket_cost_currency,
                        eventGamesConfigName: rawEvent.eventgamesconfig,
                        blacklisted: rawEvent.blacklisted,
                        blacklisterUsername: rawEvent.blacklister_username,
                        blacklistedEntrants: rawEvent.blacklisted_entrants,
                        blacklistedEntrantsUsernames: rawEvent.blacklisted_entrants_usernames,
                        ticketWithdrawable: rawEvent.allow_contestant_withdrawal,
                        ticketPurchasable: rawEvent.enterable,
                        featured: rawEvent.featured,
                        lobbySort: rawEvent.lobbysort,
                        lobbyTab: rawEvent.lobbytab,
                        notes: rawEvent.notes
                    };
                    return yes(event);
                }, function () {
                    return no([{ type: 'JSON_ERROR' }]);
                });
            }, function () {
                return no([{ type: 'NOT_FOUND' }]);
            });
        });
        promise.then(function (event) {
            dispatch({ type: exports.FETCHED_EVENT, options: options, event: event });
        }, function (errors) {
            dispatch({ type: exports.ERROR_FETCHING_EVENT, options: options, errors: errors });
        });
        return promise;
    };
}
exports.fetchEvent = fetchEvent;
exports.FETCHING_EVENTS = 'FETCHING_EVENTS';
exports.FETCHED_EVENTS = 'FETCHED_EVENTS';
exports.ERROR_FETCHING_EVENTS = 'ERROR_FETCHING_EVENTS';
function fetchEvents(options) {
    return function (dispatch) {
        dispatch({ type: exports.FETCHING_EVENTS, options: options });
        var promise = new Promise(function (yes, no) {
            fetch('https://qa7.fantasydraft.com/api/v1/fantasy/events/', {
                method: 'GET',
                credentials: 'include'
            }).then(function (response) {
                response.json().then(function (rawEvents) {
                    var events = rawEvents.objects.map(function (rawEvent) {
                        return {
                            id: String(rawEvent.i),
                            context: rawEvent.ctx,
                            closeTimestamp: rawEvent.ct,
                            description: rawEvent.d,
                            ticketMax: rawEvent.max,
                            ticketCount: rawEvent.tc,
                            externalId: String(rawEvent.eid),
                            ticketMaxPerUser: rawEvent.maxu,
                            ticketMin: rawEvent.min,
                            payout: rawEvent.p,
                            payoutCurrency: rawEvent.pc,
                            status: rawEvent.s,
                            ticketCost: rawEvent.tc,
                            ticketCostCurrency: rawEvent.tcc,
                            lobbyTab: rawEvent.lt,
                            adminId: rawEvent.adm
                        };
                    });
                    yes(events);
                }, function () {
                    return no([{ type: 'JSON_ERROR' }]);
                });
            }, function () {
                no([{ type: 'NOT_FOUND' }]);
            });
        });
        promise.then(function (events) {
            dispatch({ type: exports.FETCHED_EVENTS, options: options, events: events });
        }, function (errors) {
            dispatch({ type: exports.ERROR_FETCHING_EVENTS, options: options, errors: errors });
        });
        return promise;
    };
}
exports.fetchEvents = fetchEvents;
//# sourceMappingURL=events.js.map