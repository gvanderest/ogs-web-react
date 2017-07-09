import reduceRecord from '../utils/reduceRecord';
import reduceRecords from '../utils/reduceRecords';
import generateReducer from '../utils/generateReducer';
import { FETCHED_EVENT_POSITION, FETCHED_EVENT_POSITIONS } from '../actions/eventPositions';


function handleFetchedEventPositions(state, action) {
    let { eventPositions } = action;
    return reduceRecords(state, eventPositions);
}


function handleFetchedEventPosition(state, action) {
    let { eventPosition } = action;
    return reduceRecord(state, eventPosition);
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_EVENT_POSITION]: handleFetchedEventPosition,
    [FETCHED_EVENT_POSITIONS]: handleFetchedEventPositions
});
