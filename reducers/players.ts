import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { FETCHED_PLAYER, FETCHED_PLAYERS } from "../actions/players";

import { IPlayer, IReduxAction, IReduxState } from "../interfaces";

function handleFetchedPlayers(state: IReduxState, action: IReduxAction) {
    const players: IPlayer[] = action.players;
    return reduceRecords(state, players);
}

function handleFetchedPlayer(state: IReduxState, action: IReduxAction) {
    const player: IPlayer = action.player;
    return reduceRecord(state, player);
}

interface IPlayersStore {
    byId: {
        [key: string]: IPlayer;
    };
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_PLAYER]: handleFetchedPlayer,
    [FETCHED_PLAYERS]: handleFetchedPlayers,
});
