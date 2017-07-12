import { FETCHED_EVENT_GAMES_COLLECTION } from "../actions/eventGamesCollections";
import { FETCHING_EVENT_GAMES_COLLECTION } from "../actions/eventGamesCollections";
import { IEventGamesCollection } from "../interfaces";
import { IReduxAction } from "../interfaces";
import generateReducer from "../utils/generateReducer";

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

export default generateReducer({
    byId: {},
}, {
    [FETCHING_EVENT_GAMES_COLLECTION]: handleFetchingEventGamesCollection,
    [FETCHED_EVENT_GAMES_COLLECTION]: handleFetchedEventGamesCollection,
});
