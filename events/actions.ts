import * as moment from "moment";
import * as Promise from "promise";

export const FETCHING_EVENT = "FETCHING_EVENT";
export const FETCHED_EVENT = "FETCHED_EVENT";
export const ERROR_FETCHING_EVENT = "ERROR_FETCHING_EVENT";

import Event from "../classes/Event";
import ReduxDispatch from "../classes/ReduxDispatch";

export interface IMinifiedFantasyEvent {
    i: number;
    adm: number;
    ct: number;
    ctx: string;
    d: string;
    eid: number;
    ls: string;
    lt: string | string[];
    p: number;
    pc: string;
    s: string;
    tc: number;
    tcc: string;
    max: number;
    maxu: number;
    co: boolean;
    min: number;
    evgcn: string;
    rg: any;
}

interface IFetchEventOptions {
    id: string;
}

export function fetchEvent(options: IFetchEventOptions) {
    return (dispatch: ReduxDispatch) => {
        const promise = new Promise((yes, no) => {
            const { id } = options;

            dispatch({ type: FETCHING_EVENT, options });

            fetch(`https://qa7.fantasydraft.com/api/v1/events/${ id }/`, {
                credentials: "include",
                method: "GET",
            }).then((response) => {
                response.json().then((rawEvent) => {
                    const event = {
                        adminId: String(rawEvent.pool_admin_id),
                        blacklisted: rawEvent.blacklisted,
                        blacklistedEntrants: rawEvent.blacklisted_entrants,
                        blacklistedEntrantsUsernames: rawEvent.blacklisted_entrants_usernames,
                        blacklisterUsername: rawEvent.blacklister_username,
                        cashOnly: rawEvent.cash_only,
                        checkTimestamp: moment.utc(rawEvent.check_ts).unix(),
                        closeTimestamp: moment.utc(rawEvent.close_ts).unix(),
                        description: rawEvent.description,
                        eventGamesConfigName: rawEvent.eventgamesconfig,
                        externalId: String(rawEvent.external_id),
                        featured: rawEvent.featured === "true",
                        finalizeTimestamp: moment.utc(rawEvent.finalize_ts).unix(),
                        id: String(rawEvent.id),
                        lateSwap: rawEvent.can_late_swap,
                        lobbySort: rawEvent.lobbysort ? parseInt(rawEvent.lobbysort, 10) : 0,
                        lobbyTabs: rawEvent.lobbytab,
                        notes: rawEvent.notes,
                        passwordProtected: rawEvent.is_password_protected,
                        payout: rawEvent.payout,
                        payoutBreakdown: rawEvent.breakdown,
                        payoutBreakdownEnhanced: rawEvent.breakdown_enhanced,
                        payoutCurrency: rawEvent.payoutCurrency,
                        proPlayer: rawEvent.proplayer,
                        profit: rawEvent.profit,
                        resourceUri: rawEvent.resource_uri,
                        selectionConstraints: rawEvent.selection_constraints,
                        ticketCost: rawEvent.ticket_cost,
                        ticketCostCurrency: rawEvent.ticket_cost_currency,
                        ticketCount: rawEvent.ticket_count,
                        ticketMax: rawEvent.ticket_max,
                        ticketMaxPerUser: rawEvent.ticket_max_per_user,
                        ticketMin: rawEvent.ticket_min,
                        ticketPurchasable: rawEvent.enterable,
                        ticketWithdrawable: rawEvent.allow_contestant_withdrawal,
                    };
                    return yes(event);
                }, () => {
                    return no([{ type: "JSON_ERROR" }]);
                });
            }, () => {
                return no([{ type: "NOT_FOUND" }]);
            });
        });

        promise.then((event) => {
            dispatch({ type: FETCHED_EVENT, options, event });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_EVENT, options, errors });
        });

        return promise;
    };
}

export const FETCHING_EVENTS = "FETCHING_EVENTS";
export const FETCHED_EVENTS = "FETCHED_EVENTS";
export const ERROR_FETCHING_EVENTS = "ERROR_FETCHING_EVENTS";

interface IFetchEventsOptions {
    id?: number;
}

export function fetchEvents(options?: IFetchEventsOptions) {
    return (dispatch: ReduxDispatch) => {
        dispatch({ type: FETCHING_EVENTS, options });

        const promise: Promise<Event[]> = new Promise((yes, no) => {
            fetch("https://qa7.fantasydraft.com/api/v1/fantasy/events/", {
                credentials: "include",
                method: "GET",
            }).then((response) => {
                response.json().then((rawEvents) => {
                    const events: Event[] = rawEvents.objects.map((rawEvent: IMinifiedFantasyEvent): Event => {
                        const event: Event = {
                            adminId: String(rawEvent.adm),
                            closeTimestamp: rawEvent.ct,
                            context: rawEvent.ctx,
                            denyGroups: rawEvent.rg ? JSON.parse(rawEvent.rg) : [],
                            description: rawEvent.d,
                            externalId: String(rawEvent.eid),
                            id: String(rawEvent.i),
                            lobbySort: rawEvent.ls ? parseInt(rawEvent.ls, 10) : 0,
                            lobbyTabs: [],
                            payout: rawEvent.p,
                            payoutCurrency: rawEvent.pc,
                            status: rawEvent.s,
                            ticketCost: rawEvent.tc,
                            ticketCostCurrency: rawEvent.pc,
                            ticketCount: rawEvent.tc,
                            ticketMax: rawEvent.max,
                            ticketMaxPerUser: rawEvent.maxu,
                            ticketMin: rawEvent.min,
                        };
                        if (rawEvent.lt instanceof String) {
                            event.lobbyTabs = [rawEvent.lt];
                        } else if (rawEvent.lt instanceof Array) {
                            event.lobbyTabs = rawEvent.lt;
                        }
                        return event;
                    });
                    yes(events);
                }, () => {
                    return no([{ type: "JSON_ERROR" }]);
                });
            }, () => {
                no([{ type: "NOT_FOUND" }]);
            });
        });

        promise.then((events) => {
            dispatch({ type: FETCHED_EVENTS, options, events });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_EVENTS, options, errors });
        });

        return promise;
    };
}
