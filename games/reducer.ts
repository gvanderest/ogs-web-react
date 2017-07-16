import { FETCHED_GAME } from "./actions";
import { FETCHED_GAMES } from "./actions";

import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { IGame } from "../interfaces";
import { IReduxAction } from "../interfaces";
import { IReduxState } from "../interfaces";

interface IHandleFetchedGamesAction extends IReduxAction {
    games: IGame[];
}

function handleFetchedGames(state: IReduxState, action: IHandleFetchedGamesAction) {
    const { games } = action;
    return reduceRecords(state, games);
}

interface IHandleFetchedGameAction extends IReduxAction {
    game: IGame;
}

function handleFetchedGame(state: IReduxState, action: IHandleFetchedGameAction) {
    const { game } = action;
    return reduceRecord(state, game);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_GAME]: handleFetchedGame,
    [FETCHED_GAMES]: handleFetchedGames,
});
