import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";

import ReduxAction from "../classes/ReduxAction";
import Ticket from "../classes/Ticket";
import Selection from "../classes/Selection";

import { FETCHED_TICKET, FETCHED_TICKETS, FETCHING_TICKETS } from "./actions";
import { FETCHED_TICKET_SELECTIONS } from "../selections/actions";

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

interface IHandleFetchedTicketsAction extends ReduxAction {
    tickets: Ticket[];
}

function handleFetchedTickets(state: ITicketsState, action: IHandleFetchedTicketsAction) {
    const tickets = action.tickets;
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

interface IHandleFetchedTicketAction extends ReduxAction {
    ticket: Ticket;
}

function handleFetchedTicket(state: ITicketsState, action: IHandleFetchedTicketAction) {
    const ticket = action.ticket;
    return reduceRecord(state, ticket);
}

interface IHandleFetchedTicketSelectionsAction extends ReduxAction {
    selections: Selection[];
}

function handleFetchedTicketSelections(state: ITicketsState, action: IHandleFetchedTicketSelectionsAction) {
    const { ticketId, selections } = action;
    const selectionIds = selections.map((selection) => selection.id);

    const existing = state.byId[ticketId];
    if (!existing) {
        return state;
    }

    return {
        ...state,
        byId: {
            ...state.byId,
            [ticketId]: {
                ...existing,
                selectionIds,
            }
        },
    };
}

export default generateReducer({
    byId: {},
    fetchingAll: false,
}, {
    [FETCHING_TICKETS]: handleFetchingTickets,
    [FETCHED_TICKETS]: handleFetchedTickets,
    [FETCHED_TICKET]: handleFetchedTicket,
    [FETCHED_TICKET_SELECTIONS]: handleFetchedTicketSelections,
});
