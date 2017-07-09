import reduceRecord from '../utils/reduceRecord';
import reduceRecords from '../utils/reduceRecords';
import generateReducer from '../utils/generateReducer';
import { FETCHED_GAME, FETCHED_GAMES } from '../actions/games';


function handleFetchedGames(state, action) {
    let { games } = action;
    return reduceRecords(state, games);
}


function handleFetchedGame(state, action) {
    let { game } = action;
    return reduceRecord(state, game);
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_GAME]: handleFetchedGame,
    [FETCHED_GAMES]: handleFetchedGames
});
