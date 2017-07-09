"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("./actions/events");
var eventGamesCollections = require("./actions/eventGamesCollections");
var eventPositions = require("./actions/eventPositions");
var games = require("./actions/games");
var outcomes = require("./actions/outcomes");
var players = require("./actions/players");
var teams = require("./actions/teams");
var tickets = require("./actions/tickets");
var actions = {
    events: events,
    eventGamesCollections: eventGamesCollections,
    eventPositions: eventPositions,
    games: games,
    outcomes: outcomes,
    players: players,
    teams: teams,
    tickets: tickets
};
exports.default = actions;
//# sourceMappingURL=actions.js.map