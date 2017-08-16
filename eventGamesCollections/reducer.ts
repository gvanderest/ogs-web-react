import * as _ from "lodash";

import EventGamesCollection from "../classes/EventGamesCollection";
import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import {
    FETCHED_EVENT_GAMES_COLLECTION,
    FETCHED_EVENT_GAMES_COLLECTIONS,
    FETCHING_EVENT_GAMES_COLLECTION,
} from "./actions";

export interface IEventGamesCollectionState {
    fetching: string[],
    byId: {
        [key: string]: EventGamesCollection;
    };
}

interface IHandleFetchedEventGamesCollectionAction {
    type: string;
    eventGamesCollection: EventGamesCollection;
}

function mergeEventGamesCollections(existing: EventGamesCollection, eventGamesCollection: EventGamesCollection) {
    if (!existing) {
        return eventGamesCollection;
    }
    if (!eventGamesCollection) {
        return existing;
    }
    const outcomeIds = _.uniq([ ...existing.outcomeIds, ...eventGamesCollection.outcomeIds ]);
    const eventPositionIds = _.uniq([ ...existing.eventPositionIds, ...eventGamesCollection.eventPositionIds ]);
    return {
        ...existing,
        ...eventGamesCollection,
        eventPositionIds,
        outcomeIds,
    };
}

function handleFetchedEventGamesCollection(
    state: IEventGamesCollectionState,
    action: IHandleFetchedEventGamesCollectionAction,
) {
    const { eventGamesCollection } = action;
    state.fetching = _.without(state.fetching, eventGamesCollection.id);
    return reduceRecord(state, eventGamesCollection, mergeEventGamesCollections);
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
    state.fetching = _.uniq([ ...state.fetching, id ]);
    return reduceRecord(state, { id, fetching: true });
}

interface IHandleFetchedEventGamesCollectionsAction {
    type: string;
    eventGamesCollections: EventGamesCollection[];
}

function handleFetchedEventGamesCollections(
    state: IEventGamesCollectionState,
    action: IHandleFetchedEventGamesCollectionsAction,
) {
    const { eventGamesCollections } = action;
    const ids = eventGamesCollections.map((evg) => evg.id);
    state.fetching = _.difference(state.fetching, ids);
    return reduceRecords(state, eventGamesCollections, mergeEventGamesCollections);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHING_EVENT_GAMES_COLLECTION]: handleFetchingEventGamesCollection,
    [FETCHED_EVENT_GAMES_COLLECTION]: handleFetchedEventGamesCollection,
    [FETCHED_EVENT_GAMES_COLLECTIONS]: handleFetchedEventGamesCollections,
});
