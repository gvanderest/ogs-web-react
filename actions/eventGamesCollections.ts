import * as moment from "moment";
import * as Promise from "promise";

import { FETCHED_EVENT_POSITIONS } from "./eventPositions";
import { FETCHED_GAMES } from "./games";
import { FETCHED_OUTCOMES } from "./outcomes";
import { FETCHED_PLAYERS } from "./players";
import { FETCHED_TEAMS } from "./teams";

export const FETCHING_EVENT_GAMES_COLLECTION = "FETCHING_EVENT_GAMES_COLLECTION";
export const FETCHED_EVENT_GAMES_COLLECTION = "FETCHED_EVENT_GAMES_COLLECTION";
export const ERROR_FETCHING_EVENT_GAMES_COLLECTION = "ERROR_FETCHING_EVENT_GAMES_COLLECTION";

export const FETCHING_EVENT_GAMES_COLLECTIONS = "FETCHING_EVENT_GAMES_COLLECTIONS";
export const FETCHED_EVENT_GAMES_COLLECTIONS = "FETCHED_EVENT_GAMES_COLLECTIONS";
export const ERROR_FETCHING_EVENT_GAMES_COLLECTIONS = "ERROR_FETCHING_EVENT_GAMES_COLLECTIONS";

import {
    IEventGamesCollection,
    IEventPosition,
    IGame,
    IMinifiedGame,
    IOutcome,
    IPlayer,
    IReduxAction,
    IReduxDispatch,
    IReduxGetState,
    IReduxState,
    IReduxThunk,
    ITeam,
} from "../interfaces";

interface IFetchEventGamesCollectionOptions {
    id: string;
}

export function fetchEventGamesCollection(options: IFetchEventGamesCollectionOptions): IReduxThunk {
    return (dispatch: IReduxDispatch, getState: IReduxGetState): Promise<number> => {
        const promise = new Promise((yes, no) => {
            const state: IReduxState = getState();
            const { id } = options;
            const existing = state.eventGamesCollections.byId[id];
            if (existing && !existing.fetching) {
                return yes(existing);
            }

            dispatch({ type: FETCHING_EVENT_GAMES_COLLECTION, options });

            fetch(`https://qa7.fantasydraft.com/api/v1/eventgames/${ id }/`, {
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((raw) => {
                    const eventGames = {
                        config: {
                            hidden: raw.config.hidden,
                            id: String(raw.config.id),
                            name: raw.config.name,
                            salaryCap: raw.config.salary_cap,
                            settings: JSON.parse(raw.config.settings_json),
                        },
                        context: raw.context,
                        id: String(raw.id),
                        settings: JSON.parse(raw.settings_json),
                    };
                    return yes(eventGames);
                }, () => {
                    return no({ type: "JSON_ERROR" });
                });
            }, () => {
                return no({ type: "NOT_FOUND" });
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

interface IRawTeam {
    id: string;
    alias: string;
    city: string;
    conference: string;
    division: string;
    external_id: number;
    provider: string;
    league: string;
    name: string;
    ranks_json: string;
    season: number;
    settings_json: string;
    team_code_global_id: number;
}

function transformTeam(raw: IRawTeam): ITeam {
    if (!raw) {
        return null;
    }
    return {
        alias: raw.alias,
        city: raw.city,
        conference: raw.conference,
        division: raw.division,
        externalId: String(raw.external_id),
        id: String(raw.id),
        league: raw.league,
        name: raw.name,
        provider: raw.provider,
        ranks: raw.ranks_json ? JSON.parse(raw.ranks_json) : {},
        season: raw.season,
        settings: JSON.parse(raw.settings_json), // FIXME camelcase?
        teamCodeGlobalId: String(raw.team_code_global_id), // FIXME rename to providerId?
    };
}

export function fetchEventGamesCollections(options = {}) {
    return (dispatch) => {
        const promise = new Promise((yes, no) => {
            dispatch({ type: FETCHING_EVENT_GAMES_COLLECTIONS, options });

            fetch("https://qa7.fantasydraft.com/api/v1/eventgames/", {
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then(({ objects }) => {
                    const gamesById: { [key: string]: IGame } = {};
                    const teamsById: { [key: string]: ITeam } = {};

                    const eventGamesCollections: IEventGamesCollection[] = objects.map((raw) => {
                        raw.games.forEach((rawGame) => {
                            let game: IGame = {
                                externalId: String(rawGame.external_id),
                                finalized: rawGame.finalized,
                                gameCodeGlobalId: rawGame.game_code_global_id, // FIXME providerId ?
                                gameDay: rawGame.game_day,
                                gameStatus: rawGame.game_status,
                                gameTimestamp: moment.utc(rawGame.game_time).unix(),
                                gameUnit: rawGame.game_unit,
                                id: String(rawGame.id),
                                league: rawGame.league,
                                playoffGameNumber: rawGame.playoff_game_nbr,
                                playoffInfo: rawGame.playoff_info, // FIXME not sure on structure
                                playoffRound: rawGame.playoff_round, // FIXME
                                provider: rawGame.provider,
                                scheduledTimestamp: moment.utc(rawGame.sch_timestamp).unix(),
                                season: rawGame.season,
                                settings: JSON.parse(rawGame.settings_json), // FIXME camelCase-ify
                                timeRemaining: rawGame.time_remaining,
                                timeUnitsRemaining: rawGame.pmr,
                                week: rawGame.week,
                            };

                            if (rawGame.home_team) {
                                const homeTeam: ITeam = transformTeam(rawGame.home_team);
                                teamsById[homeTeam.id] = homeTeam;
                                game.homeTeamId = homeTeam.id;
                            }
                            if (rawGame.visiting_team) {
                                const visitingTeam: ITeam = transformTeam(rawGame.visiting_team);
                                teamsById[visitingTeam.id] = visitingTeam;
                                game.visitingTeamId = visitingTeam.id;
                            }

                            gamesById[game.id] = game;
                        });

                        const eventGamesCollection = {
                            checkEventTimestamp: moment.utc(raw.check_event).unix(),
                            closeEventTimestamp: moment.utc(raw.close_event).unix(),
                            config: {
                                hidden: raw.config.hidden,
                                id: String(raw.config.id),
                                name: raw.config.name,
                                salaryCap: raw.config.salaryCap, // FIXME rename
                                settings: JSON.parse(raw.config.settings_json), // FIXME camelCase
                            },
                            context: raw.context,
                            createOutcomesTimestamp: moment.utc(raw.create_outcomes_ts).unix(),
                            createdGml: raw.created_gml,
                            createdOutcomes: raw.created_outcomes,
                            createdTimestamp: moment.utc(raw.created_ts).unix(),
                            disableRecurrences: raw.disable_recurrences,
                            finalizeEventTimestamp: moment.utc(raw.finalize_event).unix(),
                            gameIds: raw.games.map((rawGame: IGame) => { String(rawGame.id); }),
                            id: String(raw.id),
                            modifiedTimestamp: moment.utc(raw.modified_ts).unix(),
                            name: raw.name,
                            openEventTimestamp: moment.utc(raw.open_event).unix(),
                            prefix: raw.prefix,
                            resourceUri: raw.resource_uri,
                            settings: JSON.parse(raw.settings_json), // FIXME camelCase
                            suffix: raw.suffix,
                        };

                        dispatch({ type: FETCHED_GAMES, games: Object.values(gamesById) });

                        dispatch({ type: FETCHED_TEAMS, teams: Object.values(teamsById) });

                        return eventGamesCollection;
                    });

                    return yes(eventGamesCollections);
                }, () => {
                    return no({ type: "JSON_ERROR" });
                });
            }, () => {
                return no({ type: "NOT_FOUND" });
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
    return (dispatch, getState) => {
        const promise: Promise<IEventGamesCollection> = new Promise((yes, no) => {
            const { id, eventId } = options;
            const state = getState();
            const existing: IEventGamesCollection = state.eventGamesCollections.byId[id];

            if (existing) {
                return yes(existing);
            }

            let url = `https://qa7.fantasydraft.com/api/v1/fantasy/eventgames/${ id }/`;
            if (eventId) {
                url += `?event_id=${ eventId }`;
            }

            fetch(url, {
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((rawEventGames) => {
                    const teamsById: { [key: string]: ITeam } = {};
                    const gamesById: { [key: string]: IGame } = {};
                    const outcomesById: { [key: string]: IOutcome } = {};
                    const eventPositionsById: { [key: string]: IEventPosition } = {};
                    const playersById: { [key: string]: IPlayer } = {};

                    const eventGamesCollection: IEventGamesCollection = {
                        closeTimestamp: moment.utc(rawEventGames.c).unix(),
                        config: {
                            name: rawEventGames.cfg,
                            salaryCap: rawEventGames.sc, // FIXME Rename this to be more generic?
                        },
                        context: rawEventGames.cxt,
                        createdOutcomes: rawEventGames.co,
                        exportUrl: rawEventGames.exu,
                        id: String(rawEventGames.i),
                        settings: JSON.parse(rawEventGames.evgsj), // FIXME camelCase
                    };

                    Object.values(raw.g).forEach((raw: IMinifiedGame) => {
                        const game: IGame = {
                            gameInfo: JSON.parse(raw.gi),
                            id: String(raw.i),
                        };

                        if (raw.hti) {
                            const homeTeam: ITeam = {
                                alias: raw.hta,
                                id: String(raw.hti),
                                name: raw.htn,
                                playerIds: [],
                                ranks: raw.htrj,
                            };
                            teamsById[homeTeam.id] = homeTeam;
                            game.homeTeamId = homeTeam.id;
                            game.homeTeamScore = raw.hts;
                        }
                        if (raw.vti) {
                            const visitingTeam: ITeam = {
                                alias: raw.vta,
                                id: String(raw.vti),
                                name: raw.vtn,
                                playerIds: [],
                                ranks: raw.vtrj,
                            };
                            teamsById[visitingTeam.id] = visitingTeam;
                            game.visitingTeamId = visitingTeam.id;
                            game.visitingTeamScore = raw.vts;
                        }

                        Object.keys(raw.p).forEach((rawPlayerId) => {
                            const rawPlayer = raw.p[rawPlayerId];
                            const teamId = String(rawPlayer.t);
                            const player: IPlayer = {
                                batterHandedness: rawPlayer.bh,
                                externalId: String(rawPlayer.ei),
                                handedness: rawPlayer.h,
                                id: String(rawPlayerId),
                                injuryStatus: rawPlayer.is,
                                teamId,
                            };
                            if (teamId) {
                                teamsById[teamId].playerIds.push(player.id);
                            }
                            playersById[player.id] = player;
                        });

                        gamesById[game.id] = game;
                        return game.id;
                    });

                    Object.values(raw.o).forEach((raw) => {
                        let outcome: IOutcome = {
                            closeTimestamp: moment.utc(raw.c).unix(),
                            externalId: raw.ei,
                            id: String(raw.i),
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
                        let eventPosition: IEventPosition = {
                            id: String(raw.i),
                            name: raw.n,
                            outcomeTypeNames: raw.o,
                            status: raw.s,
                            sortOrder: raw.so
                        };

                        eventPositionsById[eventPosition.id] = eventPosition;
                    });

                    dispatch({ type: FETCHED_EVENT_POSITIONS, eventPositions: Object.values(eventPositionsById) });
                    eventGamesCollection.eventPositionIds = Object.keys(eventPositionsById);

                    dispatch({ type: FETCHED_OUTCOMES, outcomes: Object.values(outcomesById) });
                    eventGamesCollection.outcomeIds = Object.keys(outcomesById);

                    dispatch({ type: FETCHED_GAMES, games: Object.values(gamesById) });
                    eventGamesCollection.gameIds = Object.keys(gamesById);

                    dispatch({ type: FETCHED_TEAMS, teams: Object.values(teamsById) });
                    eventGamesCollection.teamIds = Object.keys(teamsById);

                    dispatch({ type: FETCHED_PLAYERS, players: Object.values(playersById) });

                    return yes(eventGamesCollection);
                }, () => {
                    return no({ type: "JSON_ERROR" });
                });
            }, () => {
                return no({ type: "NOT_FOUND" });
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
