import * as Promise from "promise";

import request from "../utils/request";
import ReduxDispatch from "../classes/ReduxDispatch";
import Ticket from "../classes/Ticket";

import { FETCHED_EVENT } from "../events/actions";
import { FETCHED_EVENTS } from "../events/actions";

export const FETCHING_TICKET = "FETCHING_TICKET";
export const FETCHED_TICKET = "FETCHED_TICKET";
export const ERROR_FETCHING_TICKET = "ERROR_FETCHING_TICKET";

export const FETCHING_TICKETS = "FETCHING_TICKETS";
export const FETCHED_TICKETS = "FETCHED_TICKETS";
export const ERROR_FETCHING_TICKETS = "ERROR_FETCHING_TICKETS";

import API from "../api";

interface IRawEvent {
    id: number;
    ticket_cost: number;
}

interface IRawTicket {
    amount_won: number;
    event_id: number;
    event: IRawEvent;
    template_id: number;
}

interface ITicketsResponse {
    objects: IRawTicket[];
}

export function fetchTickets(options: Map<string, any> = { event__status__in: "o,c" }) {
    return (dispatch: ReduxDispatch) => {
        const promise = new Promise((yes, no) => {
            API.get("v1/tickets", options).then((response: ITicketsResponse) => {
                const tickets = response.objects.map((rawTicket) => {
                    return {
                        ...rawTicket,
                        amountWon: rawTicket.amount_won,
                        event: {
                            ...rawTicket.event,
                            id: String(rawTicket.event_id),
                            ticketCost: rawTicket.event.ticket_cost,
                            lobbyTabs: [],
                        },
                        eventId: String(rawTicket.event_id),
                        templateId: String(rawTicket.template_id),
                    };
                });

                const events = tickets.map((ticket) => ticket.event);
                tickets.forEach((ticket) => { delete ticket.event; });
                dispatch({ type: FETCHED_EVENTS, events });

                yes(tickets);
            }, (type: string) => {
                no([{ type }]);
            });
        });

        dispatch({ type: FETCHING_TICKETS, options });
        promise.then((tickets: Ticket[]) => {
            dispatch({ type: FETCHED_TICKETS, options, tickets });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_TICKETS, options, errors });
        });

        return promise;
    };
}

interface IFetchTicketOptions {
    id: string;
}

export function fetchTicket(options: IFetchTicketOptions) {
    return (dispatch: ReduxDispatch) => {
        const promise = new Promise((yes, no) => {
            const { id } = options;
            fetch(`https://qa7.fantasydraft.com/api/v1/tickets/${ id }/`, {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((raw) => {
                    // FIXME Parse this information into normalized format
                    const ticket: Ticket = { ...raw };
                    ticket.id = String(ticket.id);
                    ticket.eventId = String(ticket.event.id);
                    ticket.event.id = String(ticket.event.id);
                    ticket.event.lobbyTabs = [];
                    return yes(ticket);
                }, () => {
                    return no([{ type: "JSON_ERROR" }]);
                });
            }, () => {
                return no([{ type: "NOT_FOUND" }]);
            });
        });

        dispatch({ type: FETCHING_TICKET, options });
        promise.then((ticket: Ticket) => {
            dispatch({ type: FETCHED_EVENT, event: ticket.event });
            delete ticket.event;
            dispatch({ type: FETCHED_TICKET, options, ticket });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_TICKET, options, errors });
        });

        return promise;
    };
}

interface ISaveTicketOptions {
    eventId: string;
    selections: ISaveTicketOptionsSelection[];
}

interface ISaveTicketOptionsSelection {
    eventPositionId: string;
    outcomeId: string;
}

export function createTicket(options: ISaveTicketOptions) {
    return (dispatch: ReduxDispatch) => {
        const data = {
            application_view_id: 2,
            event: `/api/v1/events/${ options.eventId }/`,
            rsu_gps_available: 1,
            rsu_latitude: 50.649063000000005,
            rsu_longitude: -120.3518694,
            rsu_platform: "desktop",
            selections: options.selections.map((selection: ISaveTicketOptionsSelection) => {
                return {
                    event_position_id: parseInt(selection.eventPositionId, 10),
                    outcome_id: parseInt(selection.outcomeId, 10),
                };
            }),
        };

        const promise = request("/v1/tickets/", {
            data,
            headers: {
                "content-type": "application/json",
                "x-csrftoken": "sgwzwl6gUsoymuLnAxaxQNHXbawTpbXz",
            },
            method: "POST",
        });

        return promise;
    }
}
