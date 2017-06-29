import generateReducer from '../utils/generateReducer';
import { FETCHING_EVENT_GAMES_COLLECTION, FETCHED_EVENT_GAMES_COLLECTION } from '../actions/eventGamesCollectionsActions';


function handleFetchedEventGamesCollection(state, action) {
    let { eventGamesCollection } = action;
    return {
        ...state,
        byId: {
            ...state.byId,
            [eventGamesCollection.id]: {
                ...state.byId[eventGamesCollection.id],
                ...eventGamesCollection,
                fetching: false
            }
        }
    };
}


function handleFetchingEventGamesCollection(state, action) {
    let { id } = action;
    return {
        ...state,
        byId: {
            ...state.byId,
            [id]: {
                fetching: true
            }
        }
    };
}


export default generateReducer({
    byId: {}
}, {
    [FETCHING_EVENT_GAMES_COLLECTION]: handleFetchingEventGamesCollection,
    [FETCHED_EVENT_GAMES_COLLECTION]: handleFetchedEventGamesCollection
});
