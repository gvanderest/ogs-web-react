import { FETCHED_GAME } from "./actions";
import { FETCHED_GAMES } from "./actions";

import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import Game from "../classes/Game";
import ReduxAction from "../classes/ReduxAction";

interface IGamesStoreState {
    byId: {
        [key: string]: Game;
    };
}

interface IHandleFetchedGamesAction extends ReduxAction {
    games: Game[];
}

function handleFetchedGames(state: IGamesStoreState, action: IHandleFetchedGamesAction) {
    const { games } = action;
    return reduceRecords(state, games);
}

interface IHandleFetchedGameAction extends ReduxAction {
    game: Game;
}

function handleFetchedGame(state: IGamesStoreState, action: IHandleFetchedGameAction) {
    const { game } = action;
    return reduceRecord(state, game);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_GAME]: handleFetchedGame,
    [FETCHED_GAMES]: handleFetchedGames,
});
