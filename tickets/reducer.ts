import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";

import Ticket from "../classes/Ticket";
import { IReduxAction } from "../interfaces";

import { FETCHED_TICKET, FETCHED_TICKETS, FETCHING_TICKETS } from "./actions";

interface ITicketsState {
    byId: {
        [key: string]: Ticket;
    };
}

function handleFetchingTickets(state: ITicketsState) {
    return {
        ...state,
        fetchingAll: true,
    };
}

function handleFetchedTickets(state: ITicketsState, action: IReduxAction) {
    const tickets: Ticket[] = action.tickets;
    const newState = {
        ...state,
        byId: {
            ...state.byId,
        },
    };

    tickets.forEach((ticket: Ticket) => {
        newState.byId[ticket.id] = {
            ...newState.byId[ticket.id],
            ...ticket,
        };
    });

    return newState;
}

function handleFetchedTicket(state: ITicketsState, action: IReduxAction) {
    const ticket: Ticket = action.ticket;
    return reduceRecord(state, ticket);
}

export default generateReducer({
    byId: {},
    fetchingAll: false,
}, {
    [FETCHING_TICKETS]: handleFetchingTickets,
    [FETCHED_TICKETS]: handleFetchedTickets,
    [FETCHED_TICKET]: handleFetchedTicket,
});
