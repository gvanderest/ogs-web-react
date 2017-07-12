import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { FETCHED_OUTCOME, FETCHED_OUTCOMES } from "../actions/outcomes";

import { IOutcome, IReduxAction, IReduxState } from "../interfaces";

function handleFetchedOutcomes(state: IReduxState, action: IReduxAction) {
    const outcomes: IOutcome[] = action.outcomes;
    return reduceRecords(state, outcomes);
}

function handleFetchedOutcome(state: IReduxState, action: IReduxAction) {
    const outcome: IOutcome = action.outcome;
    return reduceRecord(state, outcome);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_OUTCOME]: handleFetchedOutcome,
    [FETCHED_OUTCOMES]: handleFetchedOutcomes,
});
