import * as _ from "lodash";

import EventPosition from "../classes/EventPosition";
import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { FETCHED_EVENT_POSITION, FETCHED_EVENT_POSITIONS } from "../eventPositions/actions";

interface IHandleFetchedEventPositionAction {
    eventPositions: EventPosition[];
}

function mergeEventPositions(existing, eventPosition) {
    if (!existing) {
        return eventPosition;
    } else if (!eventPosition) {
        return existing;
    }

    const outcomeTypeNames = _.uniq([...existing.outcomeTypeNames, ...eventPosition.outcomeTypeNames]);
    return {
        ...existing,
        ...eventPosition,
        outcomeTypeNames,
    };

}

function handleFetchedEventPositions(
    state: IEventPositionsState,
    action: IHandleFetchedEventPositionAction,
) {
    const { eventPositions } = action;
    return reduceRecords(state, eventPositions, mergeEventPositions);
}

interface IHandleFetchedEventPositionAction {
    type: string;
    eventPosition: EventPosition;
}

function handleFetchedEventPosition(
    state: IEventPositionsState,
    action: IHandleFetchedEventPositionAction,
) {
    const { eventPosition } = action;
    return reduceRecord(state, eventPosition, mergeEventPositions);
}

interface IEventPositionsState {
    byId: {
        [key: string]: EventPosition;
    };
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_EVENT_POSITION]: handleFetchedEventPosition,
    [FETCHED_EVENT_POSITIONS]: handleFetchedEventPositions,
});
