import { FETCHED_GAME, FETCHED_GAMES } from "../actions/games";

import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { IGame, IReduxAction } from "../interfaces";

interface IHandleFetchedGamesAction extends IReduxAction {
    games: IGame[];
}

function handleFetchedGames(state, action: IHandleFetchedGamesAction) {
    const { games } = action;
    return reduceRecords(state, games);
}

interface IHandleFetchedGameAction extends IReduxAction {
    game: IGame;
}

function handleFetchedGame(state, action) {
    const { game } = action;
    return reduceRecord(state, game);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_GAME]: handleFetchedGame,
    [FETCHED_GAMES]: handleFetchedGames,
});
