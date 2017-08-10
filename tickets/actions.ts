import * as Promise from "promise";

import { FETCHED_EVENT } from "../events/actions";
import { FETCHED_EVENTS } from "../events/actions";
import { IRawTicket } from "../interfaces";
import { ITicket } from "../interfaces";
import { IReduxDispatch } from "../interfaces";

export const FETCHING_TICKET = "FETCHING_TICKET";
export const FETCHED_TICKET = "FETCHED_TICKET";
export const ERROR_FETCHING_TICKET = "ERROR_FETCHING_TICKET";

export const FETCHING_TICKETS = "FETCHING_TICKETS";
export const FETCHED_TICKETS = "FETCHED_TICKETS";
export const ERROR_FETCHING_TICKETS = "ERROR_FETCHING_TICKETS";

import API from "../api";

interface ITicketsResponse {
    objects: IRawTicket[];
}

export function fetchTickets(options: { [key: string]: string } = {}) {
    return (dispatch: IReduxDispatch) => {
        const promise = new Promise((yes, no) => {
            API.get("v1/tickets", { event__status__in: "o,c" }).then((response: ITicketsResponse) => {
                const tickets = response.objects.map((rawTicket) => {
                    return {
                        ...rawTicket,
                        amountWon: rawTicket.amount_won,
                        event: {
                            ...rawTicket.event,
                            id: String(rawTicket.event_id),
                            ticketCost: rawTicket.event.ticket_cost,
                        },
                        eventId: String(rawTicket.event_id),
                        templateId: String(rawTicket.template_id),
                    };
                });

                const events = tickets.map((ticket) => ticket.event);
                dispatch({ type: FETCHED_EVENTS, events });

                yes(tickets);
            }, (type: string) => {
                no([{ type }]);
            });
        });

        dispatch({ type: FETCHING_TICKETS, options });
        promise.then((tickets) => {
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
    return (dispatch: IReduxDispatch) => {
        const promise = new Promise((yes, no) => {
            const { id } = options;
            fetch(`https://qa7.fantasydraft.com/api/v1/tickets/${ id }/`, {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((raw) => {
                    // FIXME Parse this information into normalized format
                    const ticket: ITicket = { ...raw };
                    ticket.id = String(ticket.id);
                    ticket.eventId = String(ticket.event.id);
                    return yes(ticket);
                }, () => {
                    return no([{ type: "JSON_ERROR" }]);
                });
            }, () => {
                return no([{ type: "NOT_FOUND" }]);
            });
        });

        dispatch({ type: FETCHING_TICKET, options });
        promise.then((ticket) => {
            dispatch({ type: FETCHED_EVENT, event: ticket.event });
            dispatch({ type: FETCHED_TICKET, options, ticket });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_TICKET, options, errors });
        });

        return promise;
    };
}
