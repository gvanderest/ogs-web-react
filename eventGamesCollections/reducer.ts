import generateReducer from "../utils/generateReducer";
import reduceRecords from "../utils/reduceRecords";

import { IEventGamesCollection } from "../interfaces";
import {
    FETCHED_EVENT_GAMES_COLLECTION,
    FETCHED_EVENT_GAMES_COLLECTIONS,
    FETCHING_EVENT_GAMES_COLLECTION,
} from "./actions";

interface IEventGamesCollectionState {
    byId: {
        [key: string]: IEventGamesCollection;
    };
}

interface IHandleFetchedEventGamesCollectionAction {
    type: string;
    eventGamesCollection: IEventGamesCollection;
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
    eventGamesCollections: IEventGamesCollection[];
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
