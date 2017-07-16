import * as moment from "moment";
import * as Promise from "promise";

import { FETCHED_EVENT_POSITIONS } from "../eventPositions/actions";
import { FETCHED_GAMES } from "../games/actions";
import { FETCHED_OUTCOMES } from "../outcomes/actions";
import { FETCHED_PLAYERS } from "../players/actions";
import { FETCHED_TEAMS } from "../teams/actions";

export const FETCHING_EVENT_GAMES_COLLECTION = "FETCHING_EVENT_GAMES_COLLECTION";
export const FETCHED_EVENT_GAMES_COLLECTION = "FETCHED_EVENT_GAMES_COLLECTION";
export const ERROR_FETCHING_EVENT_GAMES_COLLECTION = "ERROR_FETCHING_EVENT_GAMES_COLLECTION";

export const FETCHING_EVENT_GAMES_COLLECTIONS = "FETCHING_EVENT_GAMES_COLLECTIONS";
export const FETCHED_EVENT_GAMES_COLLECTIONS = "FETCHED_EVENT_GAMES_COLLECTIONS";
export const ERROR_FETCHING_EVENT_GAMES_COLLECTIONS = "ERROR_FETCHING_EVENT_GAMES_COLLECTIONS";

import {
    IEventGamesCollection,
    IEventGamesCollectionConfigSettings,
    IEventGamesCollectionSettings,
    IEventPosition,
    IGame,
    IMinifiedEventGamesCollection,
    IMinifiedGame,
    IMinifiedOutcome,
    IMinifiedPlayer,
    IOutcome,
    IPlayer,
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
    return (dispatch: IReduxDispatch, getState: IReduxGetState): Promise<IEventGamesCollection> => {
        const promise: Promise<IEventGamesCollection> = new Promise((yes, no) => {
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
                response.json().then((raw: IRawEventGamesCollection) => {
                    const eventGamesSettings = JSON.parse(raw.settings_json) as
                        IEventGamesCollectionSettings;
                    const gameIds = Object.keys(raw.games);
                    const configSettings = JSON.parse(raw.config.settings_json) as
                        IEventGamesCollectionConfigSettings;

                    const eventGames: IEventGamesCollection = {
                        addOutcomesAfterOpen: eventGamesSettings.add_outcomes_after_open,
                        checkTimestamp: moment.utc(raw.check_event).unix(),
                        closeEventTimestamp: moment.utc(raw.close_event).unix(),
                        config: {
                            addOutcomesAfterOpen: configSettings.add_outcomes_after_open,
                            hidden: raw.config.hidden,
                            hideSelections: configSettings.hide_selections,
                            id: String(raw.config.id),
                            name: raw.config.name,
                            salaryCap: raw.config.salary_cap,
                        },
                        context: raw.context,
                        createdGml: raw.created_gml,
                        createdOutcomes: raw.created_outcomes,
                        createdTimestamp: moment.utc(raw.created_ts).unix(),
                        exportUrl: eventGamesSettings.export_url,
                        gameIds,
                        hideSelections: eventGamesSettings.hide_selections,
                        id: String(raw.id),
                        lineupsUrl: eventGamesSettings.lineups_url,
                        name: raw.name,
                        openEventTimestamp: moment.utc(raw.open_event).unix(),
                        prefix: raw.prefix,
                        scoring: eventGamesSettings.scoring,
                        suffix: raw.suffix,
                    };

                    return yes(eventGames);
                }, () => {
                    return no({ type: "JSON_ERROR" });
                });
            }, () => {
                return no({ type: "NOT_FOUND" });
            });
        });

        promise.then((eventGamesCollection: IEventGamesCollection) => {
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

interface IRawGame {
    external_id: number;
    finalized: boolean;
    game_code_global_id: number;
    game_day: string;
    game_status: string;
    game_time: string;
    game_unit: string;
    id: number;
    league: string;
    playoff_game_nbr: number;
    playoff_info: string;
    playoff_round: number;
    provider: string;
    sch_timestamp: string;
    season: number;
    settings_json: string;
    time_remaining: string;
    pmr: number;
    week: number;
    home_team: IRawTeam;
    visiting_team: IRawTeam;
}

interface IRawEventGamesCollectionConfig {
    id: number;
    hidden: boolean;
    name: string;
    salary_cap: number;
    settings_json: string;
}

interface IRawEventGamesCollection {
    id: number;
    external_id: number;
    games: IRawGame[];
    check_event: string;
    close_event: string;
    config: IRawEventGamesCollectionConfig;
    context: string;
    created_gml: boolean;
    created_outcomes: boolean;
    created_ts: string;
    disable_recurrences: boolean;
    finalize_event: string;
    create_outcomes_ts: string;
    name: string;
    prefix: string;
    modified_ts: string;
    open_event: string;
    resource_uri: string;
    settings_json: string;
    suffix: string;
}

export function fetchEventGamesCollections() {
    return (dispatch: IReduxDispatch) => {
        const promise = new Promise((yes, no) => {
            dispatch({ type: FETCHING_EVENT_GAMES_COLLECTIONS });

            fetch("https://qa7.fantasydraft.com/api/v1/eventgames/", {
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then(({ objects }) => {
                    const gamesById: { [key: string]: IGame } = {};
                    const teamsById: { [key: string]: ITeam } = {};

                    const eventGamesCollections: IEventGamesCollection[] = objects.map((
                        raw: IRawEventGamesCollection,
                    ) => {
                        raw.games.forEach((rawGame: IRawGame) => {
                            const game: IGame = {
                                externalId: String(rawGame.game_code_global_id),
                                finalized: rawGame.finalized,
                                id: String(rawGame.id),
                                league: rawGame.league,
                                periodUnit: rawGame.game_unit,
                                playoffGameNumber: rawGame.playoff_game_nbr,
                                playoffInfo: rawGame.playoff_info, // FIXME not sure on structure
                                playoffRound: rawGame.playoff_round, // FIXME
                                provider: rawGame.provider,
                                scheduledTimestamp: moment.utc(rawGame.sch_timestamp).unix(),
                                season: rawGame.season,
                                startDay: rawGame.game_day,
                                startTimestamp: moment.utc(rawGame.game_time).unix(),
                                status: rawGame.game_status,
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

                        const { config } = raw;
                        const configSettings = JSON.parse(config.settings_json) as
                            IEventGamesCollectionConfigSettings;

                        const settings = JSON.parse(raw.settings_json) as IEventGamesCollectionSettings;

                        const eventGamesCollection: IEventGamesCollection = {
                            addOutcomesAfterOpen: settings.add_outcomes_after_open,
                            checkEventTimestamp: moment.utc(raw.check_event).unix(),
                            closeEventTimestamp: moment.utc(raw.close_event).unix(),
                            config: {
                                addOutcomesAfterOpen: configSettings.add_outcomes_after_open,
                                hidden: config.hidden,
                                hideSelections: configSettings.hide_selections,
                                id: String(config.id),
                                name: config.name,
                                salaryCap: config.salary_cap,
                            },
                            context: raw.context,
                            createOutcomesTimestamp: moment.utc(raw.create_outcomes_ts).unix(),
                            createdGml: raw.created_gml,
                            createdOutcomes: raw.created_outcomes,
                            createdTimestamp: moment.utc(raw.created_ts).unix(),
                            disableRecurrences: raw.disable_recurrences,
                            exportUrl: settings.export_url,
                            finalizeEventTimestamp: moment.utc(raw.finalize_event).unix(),
                            gameIds: raw.games.map((rawGame: IRawGame) => String(rawGame.id) ),
                            hideSelections: settings.hide_selections,
                            id: String(raw.id),
                            lineupsUrl: settings.lineups_url,
                            modifiedTimestamp: moment.utc(raw.modified_ts).unix(),
                            name: raw.name,
                            openEventTimestamp: moment.utc(raw.open_event).unix(),
                            prefix: raw.prefix,
                            resourceUri: raw.resource_uri,
                            scoring: settings.scoring,
                            suffix: raw.suffix,
                        };

                        const games = Object.keys(gamesById).map((id) => gamesById[id]);
                        dispatch({ type: FETCHED_GAMES, games });

                        const  teams = Object.keys(teamsById).map((id) => teamsById[id]);
                        dispatch({ type: FETCHED_TEAMS, teams });

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
            dispatch({ type: FETCHED_EVENT_GAMES_COLLECTIONS, eventGamesCollections });
        }, (error) => {
            dispatch({ type: ERROR_FETCHING_EVENT_GAMES_COLLECTIONS, error });
        });

        return promise;
    };
}

interface IFetchFantasyEventGamesCollectionOptions {
    id: string;
    eventId: string;
}

export function fetchFantasyEventGamesCollection(options: IFetchFantasyEventGamesCollectionOptions) {
    return (dispatch: IReduxDispatch, getState: IReduxGetState) => {
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
                response.json().then((rawEventGames: IMinifiedEventGamesCollection) => {
                    const teamsById: { [key: string]: ITeam } = {};
                    const gamesById: { [key: string]: IGame } = {};
                    const outcomesById: { [key: string]: IOutcome } = {};
                    const eventPositionsById: { [key: string]: IEventPosition } = {};
                    const playersById: { [key: string]: IPlayer } = {};

                    Object.keys(rawEventGames.g).forEach((rawGameId: string) => {
                        const rawGame: IMinifiedGame = rawEventGames.g[rawGameId];
                        const game: IGame = {
                            finalized: rawGame.f,
                            gameInfo: JSON.parse(rawGame.gi) as object,
                            id: String(rawGame.i),
                            league: rawGame.l,
                            startDay: rawGame.d,
                            startTimestamp: moment.utc(rawGame.gt).unix(),
                            status: rawGame.s,
                        };

                        if (rawGame.hti) {
                            const homeTeam: ITeam = {
                                alias: rawGame.hta,
                                id: String(rawGame.hti),
                                league: rawGame.l,
                                name: rawGame.htn,
                                playerIds: [],
                                ranks: rawGame.htrj,
                            };
                            teamsById[homeTeam.id] = homeTeam;
                            game.homeTeamId = homeTeam.id;
                            game.homeTeamScore = rawGame.hts;
                        }
                        if (rawGame.vti) {
                            const visitingTeam: ITeam = {
                                alias: rawGame.vta,
                                id: String(rawGame.vti),
                                league: rawGame.l,
                                name: rawGame.vtn,
                                playerIds: [],
                                ranks: rawGame.htrj,
                            };
                            teamsById[visitingTeam.id] = visitingTeam;
                            game.visitingTeamId = visitingTeam.id;
                            game.visitingTeamScore = rawGame.vts;
                        }

                        Object.keys(rawGame.p).forEach((rawPlayerId: string) => {
                            const rawPlayer: IMinifiedPlayer = rawGame.p[rawPlayerId];
                            const teamId = String(rawPlayer.t);
                            const player: IPlayer = {
                                batterHandedness: rawPlayer.bh,
                                externalId: String(rawPlayer.ei),
                                handedness: rawPlayer.h,
                                id: String(rawPlayerId),
                                injuryStatus: rawPlayer.inj,
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

                    Object.keys(rawEventGames.o).forEach((rawOutcomeId) => {
                        const rawOutcome: IMinifiedOutcome = rawEventGames.o[rawOutcomeId];
                        const outcome: IOutcome = {
                            closeTimestamp: moment.utc(rawOutcome.c).unix(),
                            externalId: rawOutcome.ei,
                            id: String(rawOutcome.i),
                            name: rawOutcome.n,
                            pointsAvailable: rawOutcome.pa,
                            pointsProjected: rawOutcome.pp,
                            selectionCost: rawOutcome.sc,
                            statsId: rawOutcome.si, // FIXME rename this to something better
                            typeName: rawOutcome.t,
                        };

                        outcomesById[outcome.id] = outcome;
                    });

                    Object.keys(rawEventGames.evp).forEach((evpId) => {
                        const evp = rawEventGames.evp[evpId];
                        const eventPosition: IEventPosition = {
                            id: String(evp.i),
                            name: evp.n,
                            outcomeTypeNames: evp.o,
                            sortOrder: evp.so,
                            status: evp.s,
                        };

                        eventPositionsById[eventPosition.id] = eventPosition;
                    });

                    const settings = JSON.parse(rawEventGames.evgsj) as IEventGamesCollectionSettings;

                    const eventGamesCollection: IEventGamesCollection = {
                        addOutcomesAfterOpen: settings.add_outcomes_after_open,
                        closeEventTimestamp: moment.utc(rawEventGames.c).unix(),
                        config: {
                            addOutcomesAfterOpen: settings.add_outcomes_after_open,
                            hideSelections: settings.hide_selections,
                            name: rawEventGames.cfg,
                            salaryCap: rawEventGames.sc, // FIXME Rename this to be more generic?
                        },
                        context: rawEventGames.cxt,
                        createdOutcomes: rawEventGames.co,
                        exportUrl: rawEventGames.exu,
                        gameIds: Object.keys(rawEventGames.g),
                        hideSelections: settings.hide_selections,
                        id: String(rawEventGames.i),
                        lineupsUrl: settings.lineups_url,
                        scoring: settings.scoring,
                    };

                    const eventPositions = Object.keys(eventPositionsById).map(
                        (eventPositionId) => eventPositionsById[eventPositionId]);
                    dispatch({ type: FETCHED_EVENT_POSITIONS, eventPositions });
                    eventGamesCollection.eventPositionIds = Object.keys(eventPositionsById);

                    const outcomes = Object.keys(outcomesById).map((outcomeId) => outcomesById[outcomeId]);
                    dispatch({ type: FETCHED_OUTCOMES, outcomes });
                    eventGamesCollection.outcomeIds = Object.keys(outcomesById);

                    const games = Object.keys(gamesById).map((gameId) => gamesById[gameId]);
                    dispatch({ type: FETCHED_GAMES, games });
                    eventGamesCollection.gameIds = Object.keys(gamesById);

                    const teams = Object.keys(teamsById).map((teamId) => teamsById[teamId]);
                    dispatch({ type: FETCHED_TEAMS, teams });

                    const players = Object.keys(playersById).map((playerId) => playersById[playerId]);
                    dispatch({ type: FETCHED_PLAYERS, players });

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
