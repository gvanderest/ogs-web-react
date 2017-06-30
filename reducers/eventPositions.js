import generateReducer from '../utils/generateReducer';
import { FETCHED_EVENT_POSITION } from '../actions/eventPositions';


function handleFetchedEventPosition(state, action) {
    let { eventPosition } = action;

    return {
        ...state,
        byId: {
            ...state.byId,
            [eventPosition.id]: {
                ...state.byId[eventPosition.id],
                ...eventPosition
            }
        }
    };
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_EVENT_POSITION]: handleFetchedEventPosition
});
