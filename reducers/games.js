import generateReducer from '../utils/generateReducer';
import { FETCHED_GAME } from '../actions/games';


function handleFetchedGame(state, action) {
    let { game } = action;

    return {
        ...state,
        byId: {
            ...state.byId,
            [game.id]: {
                ...state.byId[game.id],
                ...game
            }
        }
    };
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_GAME]: handleFetchedGame,
});
