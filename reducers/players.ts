import generateReducer from '../utils/generateReducer';
import reduceRecord from '../utils/reduceRecord';
import reduceRecords from '../utils/reduceRecords';
import { FETCHED_PLAYER, FETCHED_PLAYERS } from '../actions/players';




function handleFetchedPlayers(state, action) {
    let { players } = action;
    return reduceRecords(state, players);
}


function handleFetchedPlayer(state, action) {
    let { player } = action;
    return reduceRecord(state, player);
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_PLAYER]: handleFetchedPlayer,
    [FETCHED_PLAYERS]: handleFetchedPlayers
});
