import EventGamesCollection from "../classes/EventGamesCollection";
import generateReducer from "../utils/generateReducer";
import reduceRecords from "../utils/reduceRecords";

import {
    FETCHED_EVENT_GAMES_COLLECTION,
    FETCHED_EVENT_GAMES_COLLECTIONS,
    FETCHING_EVENT_GAMES_COLLECTION,
} from "./actions";

interface IEventGamesCollectionState {
    byId: {
        [key: string]: EventGamesCollection;
    };
}

interface IHandleFetchedEventGamesCollectionAction {
    type: string;
    eventGamesCollection: EventGamesCollection;
}

function handleFetchedEventGamesCollection(
    state: IEventGamesCollectionState,
    action: IHandleFetchedEventGamesCollectionAction,
) {
    const { eventGamesCollection } = action;
    return {
        ...state,
        byId: {
            ...state.byId,
            [eventGamesCollection.id]: {
                ...state.byId[eventGamesCollection.id],
                ...eventGamesCollection,
                fetching: false,
            },
        },
    };
}

interface IHandleFetchingEventGamesCollectionAction {
    type: string;
    id: string;
}

function handleFetchingEventGamesCollection(
    state: IEventGamesCollectionState,
    action: IHandleFetchingEventGamesCollectionAction,
) {
    const { id } = action;
    return {
        ...state,
        byId: {
            ...state.byId,
            [id]: {
                fetching: true,
            },
        },
    };
}

interface IHandleFetchedEventGamesCollectionsAction {
    type: string;
    eventGamesCollections: EventGamesCollection[];
}

function handleFetchedEventGamesCollections(
    state: IEventGamesCollectionState,
    action: IHandleFetchedEventGamesCollectionsAction,
) {
    return reduceRecords(state, action.eventGamesCollections);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHING_EVENT_GAMES_COLLECTION]: handleFetchingEventGamesCollection,
    [FETCHED_EVENT_GAMES_COLLECTION]: handleFetchedEventGamesCollection,
    [FETCHED_EVENT_GAMES_COLLECTIONS]: handleFetchedEventGamesCollections,
});
