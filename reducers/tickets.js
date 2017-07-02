import reduceRecord from '../utils/reduceRecord';
import generateReducer from '../utils/generateReducer';
import { FETCHING_TICKETS, FETCHED_TICKETS, FETCHED_TICKET } from '../actions/tickets';


function handleFetchingTickets(state) {
    return {
        ...state,
        fetchingAll: true
    };
}


function handleFetchedTickets(state, action) {
    let { tickets } = action;
    let newState = {
        ...state,
        byId: {
            ...state.byId,
        }
    };

    tickets.forEach((ticket) => {
        newState.byId[ticket.id] = {
            ...newState.byId[ticket.id],
            ...ticket
        };
    });

    return newState;
}


function handleFetchedTicket(state, action) {
    let { ticket } = action;
    return reduceRecord(state, ticket);
}


export default generateReducer({
    byId: {},
    fetchingAll: false
}, {
    [FETCHING_TICKETS]: handleFetchingTickets,
    [FETCHED_TICKETS]: handleFetchedTickets,
    [FETCHED_TICKET]: handleFetchedTicket
});
