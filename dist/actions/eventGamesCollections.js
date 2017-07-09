"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
var games_1 = require("./games");
var teams_1 = require("./teams");
var outcomes_1 = require("./outcomes");
var eventPositions_1 = require("./eventPositions");
var players_1 = require("./players");
exports.FETCHING_EVENT_GAMES_COLLECTION = 'FETCHING_EVENT_GAMES_COLLECTION';
exports.FETCHED_EVENT_GAMES_COLLECTION = 'FETCHED_EVENT_GAMES_COLLECTION';
exports.ERROR_FETCHING_EVENT_GAMES_COLLECTION = 'ERROR_FETCHING_EVENT_GAMES_COLLECTION';
exports.FETCHING_EVENT_GAMES_COLLECTIONS = 'FETCHING_EVENT_GAMES_COLLECTIONS';
exports.FETCHED_EVENT_GAMES_COLLECTIONS = 'FETCHED_EVENT_GAMES_COLLECTIONS';
exports.ERROR_FETCHING_EVENT_GAMES_COLLECTIONS = 'ERROR_FETCHING_EVENT_GAMES_COLLECTIONS';
function fetchEventGamesCollection(options) {
    return function (dispatch, getState) {
        var promise = new Promise(function (yes, no) {
            var state = getState();
            var id = options.id;
            var existing = state.eventGamesCollections.byId[id];
            if (existing && !existing.fetching) {
                return yes(existing);
            }
            dispatch({ type: exports.FETCHING_EVENT_GAMES_COLLECTION, options: options });
            fetch("https://qa7.fantasydraft.com/api/v1/eventgames/" + id + "/", {
                mode: 'cors',
                method: 'GET'
            }).then(function (response) {
                response.json().then(function (raw) {
                    var eventGames = {
                        id: String(raw.id),
                        context: raw.context,
                        settings: JSON.parse(raw.settings_json),
                        config: {
                            id: String(raw.config.id),
                            hidden: raw.config.hidden,
                            name: raw.config.name,
                            salaryCap: raw.config.salary_cap,
                            settings: JSON.parse(raw.config.settings_json)
                        }
                    };
                    return yes(eventGames);
                }, function () {
                    return no({ type: 'JSON_ERROR' });
                });
            }, function () {
                return no({ type: 'NOT_FOUND' });
            });
        });
        promise.then(function (eventGamesCollection) {
            dispatch({ type: exports.FETCHED_EVENT_GAMES_COLLECTION, options: options, eventGamesCollection: eventGamesCollection });
        }, function (error) {
            dispatch({ type: exports.ERROR_FETCHING_EVENT_GAMES_COLLECTION, options: options, error: error });
        });
        return promise;
    };
}
exports.fetchEventGamesCollection = fetchEventGamesCollection;
function transformTeam(raw) {
    if (!raw) {
        return null;
    }
    return {
        id: String(raw.id),
        alias: raw.alias,
        city: raw.city,
        conference: raw.conference,
        division: raw.division,
        externalId: String(raw.external_id),
        league: raw.league,
        name: raw.name,
        provider: raw.provider,
        ranks: raw.ranks_json ? JSON.parse(raw.ranks_json) : {},
        season: raw.season,
        settings: JSON.parse(raw.settings_json),
        teamCodeGlobalId: String(raw.team_code_global_id) // FIXME rename to providerId?
    };
}
function fetchEventGamesCollections(options) {
    return function (dispatch) {
        var promise = new Promise(function (yes, no) {
            dispatch({ type: exports.FETCHING_EVENT_GAMES_COLLECTIONS, options: options });
            fetch('https://qa7.fantasydraft.com/api/v1/eventgames/', {
                method: 'GET',
                mode: 'cors'
            }).then(function (response) {
                response.json().then(function (_a) {
                    var objects = _a.objects;
                    var gamesById = {};
                    var teamsById = {};
                    var eventGamesCollections = objects.map(function (raw) {
                        raw.games.forEach(function (rawGame) {
                            var game = {
                                id: String(rawGame.id),
                                externalId: String(rawGame.external_id),
                                finalized: rawGame.finalized,
                                gameCodeGlobalId: rawGame.game_code_global_id,
                                gameDay: rawGame.game_day,
                                gameStatus: rawGame.game_status,
                                gameTimestamp: moment_1.default.utc(rawGame.game_time).unix(),
                                gameUnit: rawGame.game_unit,
                                league: rawGame.league,
                                playoffGameNumber: rawGame.playoff_game_nbr,
                                playoffInfo: rawGame.playoff_info,
                                playoffRound: rawGame.playoff_round,
                                timeUnitsRemaining: rawGame.pmr,
                                provider: rawGame.provider,
                                scheduledTimestamp: moment_1.default.utc(rawGame.sch_timestamp).unix(),
                                season: rawGame.season,
                                settings: JSON.parse(rawGame.settings_json),
                                timeRemaining: rawGame.time_remaining,
                                week: rawGame.week
                            };
                            if (rawGame.home_team) {
                                var homeTeam = transformTeam(rawGame.home_team);
                                teamsById[homeTeam.id] = homeTeam;
                                game.homeTeamId = homeTeam.id;
                            }
                            if (rawGame.visiting_team) {
                                var visitingTeam = transformTeam(rawGame.visiting_team);
                                teamsById[visitingTeam.id] = visitingTeam;
                                game.visitingTeamId = visitingTeam.id;
                            }
                            gamesById[game.id] = game;
                        });
                        var eventGamesCollection = {
                            id: String(raw.id),
                            checkEventTimestamp: moment_1.default.utc(raw.check_event).unix(),
                            closeEventTimestamp: moment_1.default.utc(raw.close_event).unix(),
                            config: {
                                id: String(raw.config.id),
                                hidden: raw.config.hidden,
                                name: raw.config.name,
                                salaryCap: raw.config.salaryCap,
                                settings: JSON.parse(raw.config.settings_json) // FIXME camelCase
                            },
                            context: raw.context,
                            createOutcomesTimestamp: moment_1.default.utc(raw.create_outcomes_ts).unix(),
                            createdGml: raw.created_gml,
                            createdOutcomes: raw.created_outcomes,
                            createdTimestamp: moment_1.default.utc(raw.created_ts).unix(),
                            disableRecurrences: raw.disable_recurrences,
                            finalizeEventTimestamp: moment_1.default.utc(raw.finalize_event).unix(),
                            gameIds: raw.games.map(function (rawGame) { return String(rawGame.id); }),
                            modifiedTimestamp: moment_1.default.utc(raw.modified_ts).unix(),
                            name: raw.name,
                            openEventTimestamp: moment_1.default.utc(raw.open_event).unix(),
                            prefix: raw.prefix,
                            resourceUri: raw.resource_uri,
                            settings: JSON.parse(raw.settings_json),
                            suffix: raw.suffix
                        };
                        dispatch({ type: games_1.FETCHED_GAMES, games: Object.values(gamesById) });
                        dispatch({ type: teams_1.FETCHED_TEAMS, teams: Object.values(teamsById) });
                        return eventGamesCollection;
                    });
                    return yes(eventGamesCollections);
                }, function () {
                    return no({ type: 'JSON_ERROR' });
                });
            }, function () {
                return no({ type: 'NOT_FOUND' });
            });
        });
        promise.then(function (eventGamesCollections) {
            dispatch({ type: exports.FETCHED_EVENT_GAMES_COLLECTIONS, options: options, eventGamesCollections: eventGamesCollections });
        }, function (error) {
            dispatch({ type: exports.ERROR_FETCHING_EVENT_GAMES_COLLECTIONS, options: options, error: error });
        });
        return promise;
    };
}
exports.fetchEventGamesCollections = fetchEventGamesCollections;
function fetchFantasyEventGamesCollection(options) {
    return function (dispatch, getState) {
        var promise = new Promise(function (yes, no) {
            var id = options.id, eventId = options.eventId;
            var state = getState();
            var existing = state.eventGamesCollections.byId[id];
            if (existing) {
                return yes(existing);
            }
            var url = "https://qa7.fantasydraft.com/api/v1/fantasy/eventgames/" + id + "/";
            if (eventId) {
                url += "?event_id=" + eventId;
            }
            fetch(url, {
                method: 'GET',
                mode: 'cors'
            }).then(function (response) {
                response.json().then(function (raw) {
                    var teamsById = {};
                    var gamesById = {};
                    var outcomesById = {};
                    var eventPositionsById = {};
                    var playersById = {};
                    var eventGamesCollection = {
                        id: String(raw.i),
                        config: {
                            name: raw.cfg,
                            salaryCap: raw.sc // FIXME Rename this to be more generic?
                        },
                        closeTimestamp: moment_1.default.utc(raw.c).unix(),
                        createdOutcomes: raw.co,
                        context: raw.cxt,
                        exportUrl: raw.exu,
                        settings: JSON.parse(raw.evgsj) // FIXME camelCase
                    };
                    Object.values(raw.g).forEach(function (raw) {
                        var game = {
                            id: String(raw.i),
                            gameInfo: JSON.parse(raw.gi)
                        };
                        if (raw.hti) {
                            var homeTeam = {
                                id: String(raw.hti),
                                alias: raw.hta,
                                name: raw.htn,
                                ranks: raw.htrj,
                                playerIds: []
                            };
                            teamsById[homeTeam.id] = homeTeam;
                            game.homeTeamId = homeTeam.id;
                            game.homeTeamScore = raw.hts;
                        }
                        if (raw.vti) {
                            var visitingTeam = {
                                id: String(raw.vti),
                                alias: raw.vta,
                                name: raw.vtn,
                                ranks: raw.vtrj,
                                playerIds: []
                            };
                            teamsById[visitingTeam.id] = visitingTeam;
                            game.visitingTeamId = visitingTeam.id;
                            game.visitingTeamScore = raw.vts;
                        }
                        Object.keys(raw.p).forEach(function (rawPlayerId) {
                            var rawPlayer = raw.p[rawPlayerId];
                            var teamId = String(rawPlayer.t);
                            var player = {
                                id: String(rawPlayerId),
                                batterHandedness: rawPlayer.bh,
                                externalId: String(rawPlayer.ei),
                                handedness: rawPlayer.h,
                                injuryStatus: rawPlayer.is,
                                teamId: teamId
                            };
                            if (teamId) {
                                teamsById[teamId].playerIds.push(player.id);
                            }
                            playersById[player.id] = player;
                        });
                        gamesById[game.id] = game;
                        return game.id;
                    });
                    Object.values(raw.o).forEach(function (raw) {
                        var outcome = {
                            id: String(raw.i),
                            closeTimestamp: moment_1.default.utc(raw.c).unix(),
                            externalId: raw.ei,
                            name: raw.n,
                            pointsAvailable: raw.pa,
                            pointsProjected: raw.pp,
                            selectionCost: raw.sc,
                            statsId: raw.si,
                            typeName: raw.t
                        };
                        outcomesById[outcome.id] = outcome;
                    });
                    Object.values(raw.evp).forEach(function (raw) {
                        var eventPosition = {
                            id: String(raw.i),
                            name: raw.n,
                            outcomeTypeNames: raw.o,
                            status: raw.s,
                            sortOrder: raw.so
                        };
                        eventPositionsById[eventPosition.id] = eventPosition;
                    });
                    dispatch({ type: eventPositions_1.FETCHED_EVENT_POSITIONS, eventPositions: Object.values(eventPositionsById) });
                    eventGamesCollection.eventPositionIds = Object.keys(eventPositionsById);
                    dispatch({ type: outcomes_1.FETCHED_OUTCOMES, outcomes: Object.values(outcomesById) });
                    eventGamesCollection.outcomeIds = Object.keys(outcomesById);
                    dispatch({ type: games_1.FETCHED_GAMES, games: Object.values(gamesById) });
                    eventGamesCollection.gameIds = Object.keys(gamesById);
                    dispatch({ type: teams_1.FETCHED_TEAMS, teams: Object.values(teamsById) });
                    eventGamesCollection.teamIds = Object.keys(teamsById);
                    dispatch({ type: players_1.FETCHED_PLAYERS, players: Object.values(playersById) });
                    return yes(eventGamesCollection);
                }, function () {
                    return no({ type: 'JSON_ERROR' });
                });
            }, function () {
                return no({ type: 'NOT_FOUND' });
            });
        });
        promise.then(function (eventGamesCollection) {
            dispatch({ type: exports.FETCHED_EVENT_GAMES_COLLECTION, options: options, eventGamesCollection: eventGamesCollection });
        }, function (error) {
            dispatch({ type: exports.ERROR_FETCHING_EVENT_GAMES_COLLECTION, options: options, error: error });
        });
        return promise;
    };
}
exports.fetchFantasyEventGamesCollection = fetchFantasyEventGamesCollection;
//# sourceMappingURL=eventGamesCollections.js.map