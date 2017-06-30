import generateReducer from '../utils/generateReducer';
import { FETCHED_OUTCOME } from '../actions/outcomes';


function handleFetchedOutcome(state, action) {
    let { outcome } = action;

    return {
        ...state,
        byId: {
            ...state.byId,
            [outcome.id]: {
                ...state.byId[outcome.id],
                ...outcome
            }
        }
    };
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_OUTCOME]: handleFetchedOutcome
});
