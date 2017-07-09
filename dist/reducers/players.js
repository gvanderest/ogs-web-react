"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateReducer_1 = require("../utils/generateReducer");
var reduceRecord_1 = require("../utils/reduceRecord");
var reduceRecords_1 = require("../utils/reduceRecords");
var players_1 = require("../actions/players");
function handleFetchedPlayers(state, action) {
    var players = action.players;
    return reduceRecords_1.default(state, players);
}
function handleFetchedPlayer(state, action) {
    var player = action.player;
    return reduceRecord_1.default(state, player);
}
exports.default = generateReducer_1.default({
    byId: {}
}, (_a = {},
    _a[players_1.FETCHED_PLAYER] = handleFetchedPlayer,
    _a[players_1.FETCHED_PLAYERS] = handleFetchedPlayers,
    _a));
var _a;
//# sourceMappingURL=players.js.map