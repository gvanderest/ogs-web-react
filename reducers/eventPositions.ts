import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { FETCHED_EVENT_POSITION, FETCHED_EVENT_POSITIONS } from "../actions/eventPositions";

import { IEventPosition } from "../interfaces";

interface IHandleFetchedEventPositionAction {
    eventPositions: IEventPosition[];
}

function handleFetchedEventPositions(
    state: IEventPositionsState,
    action: IHandleFetchedEventPositionAction,
) {
    const { eventPositions } = action;
    return reduceRecords(state, eventPositions);
}

interface IHandleFetchedEventPositionAction {
    type: string;
    eventPosition: IEventPosition;
}

function handleFetchedEventPosition(
    state: IEventPositionsState,
    action: IHandleFetchedEventPositionAction,
) {
    const { eventPosition } = action;
    return reduceRecord(state, eventPosition);
}

interface IEventPositionsState {
    byId: {
        [key: string]: IEventPosition;
    };
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_EVENT_POSITION]: handleFetchedEventPosition,
    [FETCHED_EVENT_POSITIONS]: handleFetchedEventPositions,
});
