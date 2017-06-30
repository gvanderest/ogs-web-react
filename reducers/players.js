import generateReducer from '../utils/generateReducer';
import { FETCHED_PLAYER } from '../actions/players';


function handleFetchedPlayer(state, action) {
    let { player } = action;

    return {
        ...state,
        byId: {
            ...state.byId,
            [player.id]: {
                ...state.byId[player.id],
                ...player
            }
        }
    };
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_PLAYER]: handleFetchedPlayer
});
