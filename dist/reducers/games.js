"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduceRecord_1 = require("../utils/reduceRecord");
var reduceRecords_1 = require("../utils/reduceRecords");
var generateReducer_1 = require("../utils/generateReducer");
var games_1 = require("../actions/games");
function handleFetchedGames(state, action) {
    var games = action.games;
    return reduceRecords_1.default(state, games);
}
function handleFetchedGame(state, action) {
    var game = action.game;
    return reduceRecord_1.default(state, game);
}
exports.default = generateReducer_1.default({
    byId: {}
}, (_a = {},
    _a[games_1.FETCHED_GAME] = handleFetchedGame,
    _a[games_1.FETCHED_GAMES] = handleFetchedGames,
    _a));
var _a;
//# sourceMappingURL=games.js.map