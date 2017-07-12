import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";

import { FETCHED_TICKET, FETCHED_TICKETS, FETCHING_TICKETS } from "../actions/tickets";
import { IReduxAction, IReduxState, ITicket } from "../interfaces";

interface ITicketsState {
    byId: {
        [key: string]: ITicket;
    };
}

function handleFetchingTickets(state: IReduxState) {
    return {
        ...state,
        fetchingAll: true,
    };
}

function handleFetchedTickets(state: IReduxState, action: IReduxAction) {
    const tickets: ITicket[] = action.tickets;
    const newState = {
        ...state,
        byId: {
            ...state.byId,
        },
    };

    tickets.forEach((ticket: ITicket) => {
        newState.byId[ticket.id] = {
            ...newState.byId[ticket.id],
            ...ticket,
        };
    });

    return newState;
}

function handleFetchedTicket(state: IReduxState, action: IReduxAction) {
    const ticket: ITicket = action.ticket;
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
