import reduceRecord from '../utils/reduceRecord';
import reduceRecords from '../utils/reduceRecords';
import generateReducer from '../utils/generateReducer';
import { FETCHED_OUTCOME, FETCHED_OUTCOMES } from '../actions/outcomes';


function handleFetchedOutcomes(state, action) {
    let { outcomes } = action;
    return reduceRecords(state, outcomes);
}


function handleFetchedOutcome(state, action) {
    let { outcome } = action;
    return reduceRecord(state, outcome);
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_OUTCOME]: handleFetchedOutcome,
    [FETCHED_OUTCOMES]: handleFetchedOutcomes
});
