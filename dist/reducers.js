"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./reducers/events");
var eventGamesCollections_1 = require("./reducers/eventGamesCollections");
var eventPositions_1 = require("./reducers/eventPositions");
var games_1 = require("./reducers/games");
var outcomes_1 = require("./reducers/outcomes");
var players_1 = require("./reducers/players");
var teams_1 = require("./reducers/teams");
var tickets_1 = require("./reducers/tickets");
var react_router_redux_1 = require("react-router-redux");
var reducers = {
    events: events_1.default,
    eventGamesCollections: eventGamesCollections_1.default,
    eventPositions: eventPositions_1.default,
    games: games_1.default,
    outcomes: outcomes_1.default,
    players: players_1.default,
    teams: teams_1.default,
    tickets: tickets_1.default,
    routing: react_router_redux_1.routerReducer
};
exports.default = reducers;
//# sourceMappingURL=reducers.js.map