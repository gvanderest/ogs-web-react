import { ERROR_FETCHING_EVENT, FETCHING_EVENT, FETCHED_EVENT, FETCHED_EVENTS } from '../actions/eventsActions';

const initialState = {
    fetching: false,
    byId: {}
};


function handleFetchedEvent(state, action) {
    let { event } = action;
    return {
        ...state,
        byId: {
            ...state.byId,
            [event.id]: {
                ...state.byId[event.id],
                ...event,
                fetching: false
            }
        }
    };
}


function handleFetchedEvents(state, action) {
    state = {
        ...state,
        byId: {
            ...state.byId,
        }
    };

    action.events.forEach((event) => {
        state = handleFetchedEvent(state, event);
    });

    return state;
}


function handleFetchingEvent(state, action) {
    let eventId = action.id;
    return {
        ...state,
        byId: {
            ...state.byId,
            [eventId]: {
                fetching: true
            }
        }
    };
}


function handleErrorFetchingEvent(state, action) {
    let eventId = action.id;
    return {
        ...state,
        byId: {
            ...state.byId,
            [eventId]: {
                fetching: false,
                failed: true
            }
        }
    };
}


export default function eventsReducer(state = initialState, action = {}) {
    let handlers = {
        [ERROR_FETCHING_EVENT]: handleErrorFetchingEvent,
        [FETCHING_EVENT]: handleFetchingEvent,
        [FETCHED_EVENT]: handleFetchedEvent,
        [FETCHED_EVENTS]: handleFetchedEvents
    };
    let handler = handlers[action.type];
    return handler ? handler(state, action) : state;
}
