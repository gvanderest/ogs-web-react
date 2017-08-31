import * as moment from "moment";
import * as Promise from "promise";

import ReduxDispatch from "../classes/ReduxDispatch";
import IEvent from "../interfaces/IEvent";
import ISelection from "../interfaces/ISelection";
import ITicket from "../interfaces/ITicket";
import request from "../utils/request";

import { FETCHED_TICKETS } from "../tickets/actions";
import { FETCHED_SELECTIONS } from "../selections/actions";

export const FETCHING_EVENT = "FETCHING_EVENT";
export const FETCHED_EVENT = "FETCHED_EVENT";
export const ERROR_FETCHING_EVENT = "ERROR_FETCHING_EVENT";


export interface IMinifiedFantasyEvent {
    i: number;
    adm: number;
    ct: number;
    ctx: string;
    d: string;
    eid: number;
    f: string;
    ls: string;
    lt: string | string[];
    p: number;
    pc: string;
    s: string;
    tc: number;
    tcc: number;
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
                    let lobbyTabs: string[] = [];
                    if (typeof rawEvent.lobbytab === "string") {
                        lobbyTabs = [rawEvent.lobbytab];
                    } else if (rawEvent.lobbytab instanceof Array) {
                        lobbyTabs = rawEvent.lobbytab;
                    }

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
                        lobbyTabs,
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
                        ticketCount: rawEvent.ticket_count || 0,
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

        const promise: Promise<IEvent[]> = new Promise((yes, no) => {
            fetch("https://qa7.fantasydraft.com/api/v1/fantasy/events/", {
                credentials: "include",
                method: "GET",
            }).then((response) => {
                response.json().then((rawEvents) => {
                    const events: IEvent[] = rawEvents.objects.map((rawEvent: IMinifiedFantasyEvent): IEvent => {
                        let lobbyTabs: string[] = [];
                        if (typeof rawEvent.lt === "string") {
                            lobbyTabs = [rawEvent.lt];
                        } else if (rawEvent.lt instanceof Array) {
                            lobbyTabs = rawEvent.lt;
                        }

                        const event: IEvent = {
                            adminId: String(rawEvent.adm),
                            closeTimestamp: rawEvent.ct,
                            context: rawEvent.ctx,
                            denyGroups: rawEvent.rg ? JSON.parse(rawEvent.rg) : [],
                            description: rawEvent.d,
                            externalId: String(rawEvent.eid),
                            featured: rawEvent.f === "true",
                            id: String(rawEvent.i),
                            lobbySort: rawEvent.ls ? parseInt(rawEvent.ls, 10) : 0,
                            lobbyTabs,
                            payout: rawEvent.p,
                            payoutCurrency: rawEvent.pc,
                            status: rawEvent.s,
                            ticketCost: rawEvent.tc,
                            ticketCostCurrency: rawEvent.pc,
                            ticketCount: rawEvent.tcc || 0,
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

interface IFetchLiveEventOptions {
    id: string;
    ticketIds?: string[];
}

interface IRawFantasyEventResponse {
    heu: {
        [key: number]: {
            gid: number;
            n: string;
            m: number[];
        };
    };
    t: {
        [key: string]: {
            a: string;
            aw: number;
            id: number;
            p: number;
            pd: string;
            pmr: number;
            r: number;
            s: Array<{
                evp: number;
                i: number;
                o: number;
                p: number;
                sd: boolean;
                t: number;
            }>;
            st: string;
            t: boolean;
            u: string;
            uid: number;
        }
    };
}

export function fetchLiveEvent(options?: IFetchLiveEventOptions) {
    return (dispatch: ReduxDispatch) => {
        const promise: Promise<IEvent> = new Promise((yes, no) => {
            let url = `/v1/fantasy/events/${ options.id }/`;
            if (options.ticketIds) {
                url += `?ticket_ids=${ options.ticketIds.join(",") }`;
            }
            request(url).then((raw: IRawFantasyEventResponse) => {
                // FIXME Add support for the new fields!

                // Extract groups by the user IDs
                const experienceGroupsByUserId: Map<string, string[]> = {};
                Object.keys(raw.heu).forEach((groupId) => {
                    const group = raw.heu[groupId];
                    group.m.forEach((userId) => {
                        if (!experienceGroupsByUserId[userId]) {
                            experienceGroupsByUserId[userId] = [];
                        }
                        experienceGroupsByUserId[userId].push(group.n);
                    });
                });

                const selections: ISelection[] = [];
                const tickets: ITicket[] = Object.keys(raw.t).map((id) => {
                    const t = raw.t[id];

                    const selectionIds: string[] = t.s.map((s) => {
                        const selection: ISelection = {
                            earnedPoints: s.p,
                            eventPositionId: String(s.evp),
                            id: String(s.i),
                            outcomeId: String(s.o),
                            scoreDropped: s.sd,
                        };
                        selections.push(selection);
                        return selection.id;
                    });

                    const ticket: ITicket = {
                        // avatar: t.a,
                        amountWon: t.aw,
                        earnedPoints: t.p,
                        eventId: options.id,
                        experienceGroups: experienceGroupsByUserId[t.uid] || [],
                        id: String(t.id),
                        payout: t.pd,
                        rank: t.r,
                        rankTied: t.t,
                        selectionIds,
                        status: t.s,
                        timeUnitsRemaining: t.pmr,
                        userId: t.uid,
                        username: t.u,
                    };

                    return ticket;
                });
                const ticketIds: string[] = Object.keys(raw.t);
                const event: IEvent = {
                    adminId: null,
                    // customerBlacklisted: raw.bl,
                    // entrantsBlacklisted: raw.ble,
                    // entrantsBlacklistedsernames: raw.bleu,
                    // blacklisterUsername: raw.blu,
                    closeTimestamp: moment.utc(raw.c).unix(),
                    // category: raw.cat,
                    context: raw.c,
                    description: raw.d,
                    externalId: String(raw.eg),
                    // finalizeTimestamp: moment.utc(raw.f).unix(),
                    id: String(raw.i),
                    // oldPayouts: raw.ps,
                    // payouts: raw.pse,
                    payout: raw.p,
                    status: raw.s,
                    ticketCount: raw.tcnt,
                    ticketIds,
                    ticketMax: raw.tm,
                    ticketMin: raw.tmn,
                    ticketMaxPerUser: raw.tmu,
                    ticketCost: raw.tc,
                    ticketCostCurrency: raw.tcc,
                };

                dispatch({ type: FETCHED_SELECTIONS, selections });
                dispatch({ type: FETCHED_TICKETS, tickets });

                yes(event);
            }, no);
        });

        promise.then((event) => {
            dispatch({ type: FETCHED_EVENT, event });
        });

        return promise;
    };
}
