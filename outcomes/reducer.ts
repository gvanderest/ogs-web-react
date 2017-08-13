import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import Outcome from "../classes/Outcome";
import ReduxAction from "../classes/ReduxAction";

interface IOutcomesStoreState {
    byId: {
        [key: string]: Outcome;
    };
}

import { FETCHED_OUTCOME, FETCHED_OUTCOMES } from "./actions";

function handleFetchedOutcomes(state: IOutcomesStoreState, action: ReduxAction) {
    const outcomes: Outcome[] = action.outcomes;
    return reduceRecords(state, outcomes);
}

function handleFetchedOutcome(state: IOutcomesStoreState, action: ReduxAction) {
    const outcome: Outcome = action.outcome;
    return reduceRecord(state, outcome);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_OUTCOME]: handleFetchedOutcome,
    [FETCHED_OUTCOMES]: handleFetchedOutcomes,
});
