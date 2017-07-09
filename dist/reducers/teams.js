"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduceRecord_1 = require("../utils/reduceRecord");
var reduceRecords_1 = require("../utils/reduceRecords");
var generateReducer_1 = require("../utils/generateReducer");
var teams_1 = require("../actions/teams");
function handleFetchedTeams(state, action) {
    var teams = action.teams;
    return reduceRecords_1.default(state, teams);
}
function handleFetchedTeam(state, action) {
    var team = action.team;
    return reduceRecord_1.default(state, team);
}
exports.default = generateReducer_1.default({
    byId: {}
}, (_a = {},
    _a[teams_1.FETCHED_TEAM] = handleFetchedTeam,
    _a[teams_1.FETCHED_TEAMS] = handleFetchedTeams,
    _a));
var _a;
//# sourceMappingURL=teams.js.map