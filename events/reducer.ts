import Event from "../classes/Event";
import generateReducer from "../utils/generateReducer";
import { ERROR_FETCHING_EVENT, FETCHED_EVENT, FETCHING_EVENT} from "./actions";
import { FETCHED_EVENTS, FETCHING_EVENTS } from "./actions";

interface IEventsState {
    byId: {
        [key: string]: Event;
    };
    fetchingAll: boolean;
}

const initialState: IEventsState = {
    byId: {},
    fetchingAll: false,
};

interface IHandleFetchedEventAction {
    type: string;
    event: Event;
}

function handleFetchedEvent(state: IEventsState, action: IHandleFetchedEventAction) {
    const event: Event = action.event;
    return {
        ...state,
        byId: {
            ...state.byId,
            [event.id]: {
                ...state.byId[event.id],
                ...event,
                fetching: false,
            },
        },
    };
}

interface IHandleFetchedEventsAction {
    type: string;
    events: Event[];
}

function handleFetchedEvents(state: IEventsState, action: IHandleFetchedEventsAction) {
    const events: Event[] = action.events;

    state = {
        ...state,
        byId: {
            ...state.byId,
        },
        fetchingAll: false,
    };

    events.forEach((event) => {
        const id: string = event.id;
        const existing: Event = state.byId[id];
        state.byId[id] = {
            ...existing,
            ...event,
        };
    });

    return state;
}

interface IHandleFetchingEventAction {
    type: string;
    options: {
        id: string;
    };
}

function handleFetchingEvent(state: IEventsState, action: IHandleFetchingEventAction) {
    const id: string = action.options.id;
    const existing: Event = state.byId[id];
    return {
        ...state,
        byId: {
            ...state.byId,
            [id]: {
                ...existing,
                failed: false,
                fetching: true,
            },
        },
    };
}

interface IHandleErrorFetchingEventAction {
    type: string;
    options: {
        id: string;
    };
}

function handleErrorFetchingEvent(state: IEventsState, action: IHandleErrorFetchingEventAction) {
    const id: string = action.options.id;
    return {
        ...state,
        byId: {
            ...state.byId,
            [id]: {
                failed: true,
                fetching: false,
            },
        },
    };
}

function handleFetchingEvents(state: IEventsState) {
    return {
        ...state,
        fetchingAll: true,
    };
}

export default generateReducer(initialState, {
        [FETCHING_EVENT]: handleFetchingEvent,
        [FETCHED_EVENT]: handleFetchedEvent,
        [ERROR_FETCHING_EVENT]: handleErrorFetchingEvent,

        [FETCHING_EVENTS]: handleFetchingEvents,
        [FETCHED_EVENTS]: handleFetchedEvents,
});
