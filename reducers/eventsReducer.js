import { FETCHING_EVENT, FETCHED_EVENT, ERROR_FETCHING_EVENT } from '../actions/eventsActions';
import { FETCHING_EVENTS, FETCHED_EVENTS } from '../actions/eventsActions';

const initialState = {
    fetchingAll: false,
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
    let { events } = action;

    state = {
        ...state,
        fetchingAll: false,
        byId: {
            ...state.byId,
        }
    };

    events.forEach((event) => {
        let { id } = event;
        let existing = state.byId[id];
        state.byId[id] = {
            ...existing,
            ...event
        };
    });

    return state;
}


function handleFetchingEvent(state, action) {
    let { id } = action.options;
    let existing = state.byId[id];
    return {
        ...state,
        byId: {
            ...state.byId,
            [id]: {
                ...existing,
                fetching: true,
                failed: false
            }
        }
    };
}


function handleErrorFetchingEvent(state, action) {
    let { id } = action.options;
    return {
        ...state,
        byId: {
            ...state.byId,
            [id]: {
                fetching: false,
                failed: true
            }
        }
    };
}


function handleFetchingEvents(state) {
    return {
        ...state,
        fetchingAll: true
    };
}


export default function eventsReducer(state = initialState, action = {}) {
    let handlers = {
        [FETCHING_EVENT]: handleFetchingEvent,
        [FETCHED_EVENT]: handleFetchedEvent,
        [ERROR_FETCHING_EVENT]: handleErrorFetchingEvent,

        [FETCHING_EVENTS]: handleFetchingEvents,
        [FETCHED_EVENTS]: handleFetchedEvents,
    };
    let handler = handlers[action.type];
    return handler ? handler(state, action) : state;
}
