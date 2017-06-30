import moment from 'moment';

import { FETCHED_GAME } from './games';
import { FETCHED_TEAM } from './teams';
import { FETCHED_OUTCOME } from './outcomes';
import { FETCHED_EVENT_POSITION } from './eventPositions';
import { FETCHED_PLAYER } from './players';


export const FETCHING_EVENT_GAMES_COLLECTION = 'FETCHING_EVENT_GAMES_COLLECTION';
export const FETCHED_EVENT_GAMES_COLLECTION = 'FETCHED_EVENT_GAMES_COLLECTION';
export const ERROR_FETCHING_EVENT_GAMES_COLLECTION = 'ERROR_FETCHING_EVENT_GAMES_COLLECTION';


export const FETCHING_EVENT_GAMES_COLLECTIONS = 'FETCHING_EVENT_GAMES_COLLECTIONS';
export const FETCHED_EVENT_GAMES_COLLECTIONS = 'FETCHED_EVENT_GAMES_COLLECTIONS';
export const ERROR_FETCHING_EVENT_GAMES_COLLECTIONS = 'ERROR_FETCHING_EVENT_GAMES_COLLECTIONS';


export function fetchEventGamesCollection(options) {
    return (dispatch, getState) => {
        let promise = new Promise((yes, no) => {
            let state = getState();
            let { id } = options;
            let existing = state.eventGamesCollections.byId[id];
            if (existing && !existing.fetching) {
                return yes(existing);
            }

            dispatch({ type: FETCHING_EVENT_GAMES_COLLECTION, options });

            fetch(`https://qa7.fantasydraft.com/api/v1/eventgames/${ id }/`, {
                mode: 'cors',
                method: 'GET'
            }).then((response) => {
                response.json().then((raw) => {
                    let eventGames = {
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
                }, () => {
                    return no({ type: 'JSON_ERROR' });
                });
            }, () => {
                return no({ type: 'NOT_FOUND' });
            });
        });

        promise.then((eventGamesCollection) => {
            dispatch({ type: FETCHED_EVENT_GAMES_COLLECTION, options, eventGamesCollection });
        }, (error) => {
            dispatch({ type: ERROR_FETCHING_EVENT_GAMES_COLLECTION, options, error });
        });

        return promise;
    };
}


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
        settings: JSON.parse(raw.settings_json), // FIXME camelcase?
        teamCodeGlobalId: String(raw.team_code_global_id) // FIXME rename to providerId?
    };
}


export function fetchEventGamesCollections(options) {
    return (dispatch) => {
        let promise = new Promise((yes, no) => {
            dispatch({ type: FETCHING_EVENT_GAMES_COLLECTIONS, options });

            fetch('https://qa7.fantasydraft.com/api/v1/eventgames/', {
                method: 'GET',
                mode: 'cors'
            }).then((response) => {
                response.json().then(({ objects }) => {
                    let gamesById = {};
                    let teamsById = {};

                    let eventGamesCollections = objects.map((raw) => {
                        raw.games.forEach((rawGame) => {
                            let game = {
                                id: String(rawGame.id),
                                externalId: String(rawGame.external_id),
                                finalized: rawGame.finalized,
                                gameCodeGlobalId: rawGame.game_code_global_id, // FIXME providerId ?
                                gameDay: rawGame.game_day,
                                gameStatus: rawGame.game_status,
                                gameTimestamp: moment.utc(rawGame.game_time).unix(),
                                gameUnit: rawGame.game_unit,
                                league: rawGame.league,
                                playoffGameNumber: rawGame.playoff_game_nbr,
                                playoffInfo: rawGame.playoff_info, // FIXME not sure on structure
                                playoffRound: rawGame.playoff_round, // FIXME
                                timeUnitsRemaining: rawGame.pmr,
                                provider: rawGame.provider,
                                scheduledTimestamp: moment.utc(rawGame.sch_timestamp).unix(),
                                season: rawGame.season,
                                settings: JSON.parse(rawGame.settings_json), // FIXME camelCase-ify
                                timeRemaining: rawGame.time_remaining,
                                week: rawGame.week
                            };

                            if (rawGame.home_team) {
                                let homeTeam = transformTeam(rawGame.home_team);
                                teamsById[homeTeam.id] = homeTeam;
                                game.homeTeamId = homeTeam.id;
                            }
                            if (rawGame.visiting_team) {
                                let visitingTeam = transformTeam(rawGame.visiting_team);
                                teamsById[visitingTeam.id] = visitingTeam;
                                game.visitingTeamId = visitingTeam.id;
                            }

                            gamesById[game.id] = game;
                        });

                        let eventGamesCollection = {
                            id: String(raw.id),
                            checkEventTimestamp: moment.utc(raw.check_event).unix(),
                            closeEventTimestamp: moment.utc(raw.close_event).unix(),
                            config: {
                                id: String(raw.config.id),
                                hidden: raw.config.hidden,
                                name: raw.config.name,
                                salaryCap: raw.config.salaryCap, // FIXME rename
                                settings: JSON.parse(raw.config.settings_json) // FIXME camelCase
                            },
                            context: raw.context,
                            createOutcomesTimestamp: moment.utc(raw.create_outcomes_ts).unix(),
                            createdGml: raw.created_gml,
                            createdOutcomes: raw.created_outcomes,
                            createdTimestamp: moment.utc(raw.created_ts).unix(),
                            disableRecurrences: raw.disable_recurrences,
                            finalizeEventTimestamp: moment.utc(raw.finalize_event).unix(),
                            gameIds: raw.games.map((rawGame) => { return String(rawGame.id); }),
                            modifiedTimestamp: moment.utc(raw.modified_ts).unix(),
                            name: raw.name,
                            openEventTimestamp: moment.utc(raw.open_event).unix(),
                            prefix: raw.prefix,
                            resourceUri: raw.resource_uri,
                            settings: JSON.parse(raw.settings_json), // FIXME camelCase
                            suffix: raw.suffix
                        };

                        Object.values(gamesById).forEach((game) => {
                            dispatch({ type: FETCHED_GAME, game });
                        });

                        Object.values(teamsById).forEach((team) => {
                            dispatch({ type: FETCHED_TEAM, team });
                        });

                        console.log('eventGamesCollection', eventGamesCollection);
                        return eventGamesCollection;
                    });

                    return yes(eventGamesCollections);
                }, () => {
                    return no({ type: 'JSON_ERROR' });
                });
            }, () => {
                return no({ type: 'NOT_FOUND' });
            });
        });

        promise.then((eventGamesCollections) => {
            dispatch({ type: FETCHED_EVENT_GAMES_COLLECTIONS, options, eventGamesCollections });
        }, (error) => {
            dispatch({ type: ERROR_FETCHING_EVENT_GAMES_COLLECTIONS, options, error });
        });

        return promise;
    };
}


export function fetchFantasyEventGamesCollection(options) {
    return (dispatch) => {
        let promise = new Promise((yes, no) => {
            let { id, eventId } = options;

            let url = `https://qa7.fantasydraft.com/api/v1/fantasy/eventgames/${ id }/`;
            if (eventId) {
                url += `?event_id=${ eventId }`;
            }

            fetch(url, {
                method: 'GET',
                mode: 'cors'
            }).then((response) => {
                response.json().then((raw) => {
                    console.log('FANTASY EVENT GAMES REQUEST', raw);
                    let teamsById = {};
                    let gamesById = {};
                    let outcomesById = {};
                    let eventPositionsById = {};
                    let playersById = {};

                    let eventGamesCollection = {
                        id: String(raw.i),
                        config: {
                            name: raw.cfg,
                            salaryCap: raw.sc // FIXME Rename this to be more generic?
                        },
                        closeTimestamp: moment.utc(raw.c).unix(),
                        createdOutcomes: raw.co,
                        context: raw.cxt,
                        exportUrl: raw.exu,
                        settings: JSON.parse(raw.evgsj) // FIXME camelCase
                    };

                    Object.values(raw.g).forEach((raw) => {
                        let game = {
                            id: String(raw.i),
                            gameInfo: JSON.parse(raw.gi)
                        };

                        if (raw.hti) {
                            let homeTeam = {
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
                            let visitingTeam = {
                                id: String(raw.vti),
                                alias: raw.vta,
                                name: raw.vtn,
                                ranks: raw.vtrj,
                                playerIds: []
                            };
                            teamsById[visitingTeam.id] = visitingTeam;
                            game.homeTeamId = visitingTeam.id;
                            game.visitingTeamScore = raw.vts;
                        }

                        Object.keys(raw.p).forEach((rawPlayerId) => {
                            let rawPlayer = raw.p[rawPlayerId];
                            let teamId = String(rawPlayer.t);
                            let player = {
                                id: String(rawPlayerId),
                                batterHandedness: rawPlayer.bh,
                                externalId: String(rawPlayer.ei),
                                handedness: rawPlayer.h,
                                injuryStatus: rawPlayer.is,
                                teamId
                            };
                            if (teamId) {
                                console.log('team', teamsById[teamId]);
                                teamsById[teamId].playerIds.push(player.id);
                            }
                            playersById[player.id] = player;
                        });

                        gamesById[game.id] = game;

                        return game.id;
                    });

                    Object.values(raw.o).forEach((raw) => {
                        let outcome = {
                            id: String(raw.i),
                            closeTimestamp: moment.utc(raw.c).unix(),
                            externalId: raw.ei,
                            name: raw.n,
                            pointsAvailable: raw.pa,
                            pointsProjected: raw.pp,
                            selectionCost: raw.sc,
                            statsId: raw.si, // FIXME rename this to something better
                            typeName: raw.t
                        };

                        outcomesById[outcome.id] = outcome;
                    });

                    Object.values(raw.evp).forEach((raw) => {
                        let eventPosition = {
                            id: String(raw.i),
                            name: raw.n,
                            outcomeTypeNames: raw.o,
                            status: raw.s,
                            sortOrder: raw.so
                        };

                        eventPositionsById[eventPosition.id] = eventPosition;
                    });

                    eventGamesCollection.eventPositionIds = Object.values(eventPositionsById).map((eventPosition) => {
                        dispatch({ type: FETCHED_EVENT_POSITION, eventPosition });
                        return eventPosition.id;
                    });

                    eventGamesCollection.outcomeIds = Object.values(outcomesById).map((outcome) => {
                        dispatch({ type: FETCHED_OUTCOME, outcome });
                        return outcome.id;
                    });

                    eventGamesCollection.gameIds = Object.values(gamesById).map((game) => {
                        dispatch({ type: FETCHED_GAME, game });
                        return game.id;
                    });

                    Object.values(teamsById).forEach((team) => {
                        dispatch({ type: FETCHED_TEAM, team });
                    });

                    Object.values(playersById).forEach((player) => {
                        dispatch({ type: FETCHED_PLAYER, player });
                    });

                    console.log('PARSED EVG', eventGamesCollection);

                    return yes(eventGamesCollection);
                }, () => {
                    return no({ type: 'JSON_ERROR' });
                });
            }, () => {
                return no({ type: 'NOT_FOUND' });
            });
        });

        promise.then((eventGamesCollection) => {
            dispatch({ type: FETCHED_EVENT_GAMES_COLLECTION, options, eventGamesCollection });
        }, (error) => {
            dispatch({ type: ERROR_FETCHING_EVENT_GAMES_COLLECTION, options, error });
        });

        return promise;
    };
}
