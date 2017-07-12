import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { FETCHED_PLAYER, FETCHED_PLAYERS } from "../actions/players";

import { IPlayer, IReduxAction } from "../interfaces";

interface IPlayersState {
    byId: {
        [key: string]: IPlayer;
    };
}

function handleFetchedPlayers(state: IPlayersState, action: IReduxAction) {
    const players: IPlayer[] = action.players;
    return reduceRecords(state, players);
}

function handleFetchedPlayer(state: IPlayersState, action: IReduxAction) {
    const player: IPlayer = action.player;
    return reduceRecord(state, player);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_PLAYER]: handleFetchedPlayer,
    [FETCHED_PLAYERS]: handleFetchedPlayers,
});
