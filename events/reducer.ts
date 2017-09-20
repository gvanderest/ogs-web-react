import IEvent from "../interfaces/IEvent";
import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { ERROR_FETCHING_EVENT, FETCHED_EVENT, FETCHING_EVENT} from "./actions";
import { FETCHED_EVENTS, FETCHING_EVENTS } from "./actions";

interface IEventsState {
    byId: {
        [key: string]: IEvent;
    };
    fetchingAll: boolean;
}

const initialState: IEventsState = {
    byId: {},
    fetchingAll: false,
};

interface IHandleFetchedEventAction {
    type: string;
    event: IEvent;
}

function handleFetchedEvent(state: IEventsState, action: IHandleFetchedEventAction) {
    const event: IEvent = action.event;
    return reduceRecord(state, event);
}

interface IHandleFetchedEventsAction {
    type: string;
    events: IEvent[];
}

function handleFetchedEvents(state: IEventsState, action: IHandleFetchedEventsAction) {
    const events: IEvent[] = action.events;
    return reduceRecords(state, events);
}

interface IHandleFetchingEventAction {
    type: string;
    options: {
        id: string;
    };
}

function handleFetchingEvent(state: IEventsState) {
    return state;
}

interface IHandleErrorFetchingEventAction {
    type: string;
    options: {
        id: string;
    };
}

function handleErrorFetchingEvent(state: IEventsState) {
    return state;
}

function handleFetchingEvents(state: IEventsState) {
    return state;
}

export default generateReducer(initialState, {
        [FETCHING_EVENT]: handleFetchingEvent,
        [FETCHED_EVENT]: handleFetchedEvent,
        [ERROR_FETCHING_EVENT]: handleErrorFetchingEvent,

        [FETCHING_EVENTS]: handleFetchingEvents,
        [FETCHED_EVENTS]: handleFetchedEvents,
});
