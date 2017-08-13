import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";
import Player from "../classes/Player";
import ReduxAction from "../classes/ReduxAction";

import { FETCHED_PLAYER, FETCHED_PLAYERS } from "./actions";

interface IPlayersState {
    byId: {
        [key: string]: Player;
    };
}

function handleFetchedPlayers(state: IPlayersState, action: ReduxAction) {
    const players: Player[] = action.players;
    return reduceRecords(state, players);
}

function handleFetchedPlayer(state: IPlayersState, action: ReduxAction) {
    const player: Player = action.player;
    return reduceRecord(state, player);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_PLAYER]: handleFetchedPlayer,
    [FETCHED_PLAYERS]: handleFetchedPlayers,
});
