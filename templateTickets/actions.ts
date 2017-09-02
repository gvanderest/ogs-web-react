import * as _ from "lodash";
import * as moment from "moment";
import * as Promise from "promise";

import IEventGamesCollection from "../interfaces/IEventGamesCollection";
import EventPosition from "../classes/EventPosition";
import ReduxDispatch from "../classes/ReduxDispatch";
import Game from "../classes/Game";
import Outcome from "../classes/Outcome";
import ISelection from "../interfaces/ISelection";
import ITemplateTicket from "../interfaces/ITemplateTicket";
import request from "../utils/request";

import { FETCHED_GAMES } from "../games/actions";
import { FETCHED_EVENT_GAMES_COLLECTIONS } from "../eventGamesCollections/actions";
import { FETCHED_EVENT_POSITIONS } from "../eventPositions/actions";
import { FETCHED_OUTCOMES } from "../outcomes/actions";

export const FETCHING_TEMPLATE_TICKETS = "FETCHING_TEMPLATE_TICKETS";
export const FETCHED_TEMPLATE_TICKETS = "FETCHED_TEMPLATE_TICKETS";
export const ERROR_FETCHING_TEMPLATE_TICKETS = "ERROR_FETCHING_TEMPLATE_TICKETS";
export const DELETED_TEMPLATE_TICKET = "DELETED_TEMPLATE_TICKET";

interface IRawTemplate {
    description: string;
    externalId: number;
    id: number;
    operatorId: number;
    selections: Array<{
        eventPosition: {
            closeTs: string;
            description: string;
            eventGamesId: number;
            id: number;
            name: string;
            openTs: string;
            settingsJson: string;
            sortOrder: number;
            status: string;
        };
        eventPositionId: number;
        id: number;
        modifiedTs: string;
        outcome: {
            closeTs: string;
            description: string;
            eventScoringTimeIndicator: number;
            externalId: string;
            gameId: number;
            id: number;
            injuryStatus: string;
            name: string;
            plannedPoints: number;
            pointsAvailable: number;
            relatedCollection: number;
            relatedTs: string;
            selectionCost: number;
            teamId: number;
            type: {
                name: string;
            };
            typeId: number;
        };
        outcomeId: number;
        pointsEarned: number;
        scoreDropped: boolean;
        settingsJson: string;
        ticketId: number;
    }>;
    selectionCurrencyRemaining: number;
    source: string;
    status: string;
    tickets: string[];
    userId: number;
}

interface IRawEventGamesCollection {
    checkEvent: string;
    closeEvent: string;
    config: {
        salaryCap: number;
    };
    context: string;
    disableRecurrences: boolean;
    eventGamesConfig: number;
    finalizeEvent: string;
    games: Array<{
        gameTime: string;
        homeTeamAlias: string;
        homeTeamId: number;
        id: number;
        league: string;
        pmr: number;
        settingsJson: string;
        visitingTeamAlias: string;
        visitingTeamId: number;
    }>;
    id: number;
    openEvent: string;
    settingsJson: string;
}

interface IRawResult {
    eventGamesCollection: IRawEventGamesCollection;
    templates: IRawTemplate[];
}
interface IRawResults {
    objects: IRawResult[];
}

export function fetchTemplateTickets() {
    return (dispatch: ReduxDispatch) => {
        const promise = new Promise((yes, no) => {
            request("/v1/tickets/sportstemplates/", {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((results: IRawResults) => {
                const templateTickets: ITemplateTicket[] = [];
                const eventGamesCollections: IEventGamesCollection[] = [];
                const positionsById: { [key: string]: EventPosition } = {};
                const outcomesById: { [key: string]: Outcome } = {};
                let games: Game[] = [];

                results.objects.map((result: IRawResult) => {
                    const evg: IRawEventGamesCollection = result.eventGamesCollection;
                    const templateIds: string[] = [];

                    result.templates.forEach((rawTemplate: IRawTemplate) => {
                        templateIds.push(String(rawTemplate.id));

                        const modifiedTimestamp = Math.max.apply(null, rawTemplate.selections.map((selection) => {
                            return moment.utc(selection.modifiedTs).unix();
                        }));
                        const selections: ISelection[] = [];
                        const selectionIds = rawTemplate.selections.map((rawSelection) => {
                            selections.push({
                                eventPositionId: String(rawSelection.eventPositionId),
                                id: String(rawSelection.id),
                                outcomeId: String(rawSelection.outcomeId),
                            });

                            const rawOutcome = rawSelection.outcome;

                            const rawPosition = rawSelection.eventPosition;
                            const eventPosition: EventPosition = {
                                closeTimestamp: moment.utc(rawPosition.closeTs).unix(),
                                eventGamesId: String(rawPosition.eventGamesId),
                                id: String(rawPosition.id),
                                name: rawPosition.name,
                                outcomeTypeNames: [rawOutcome.type.name], // FIXME incomplete
                                sortOrder: rawPosition.sortOrder,
                                status: rawPosition.status,
                            };
                            positionsById[eventPosition.id] = eventPosition;

                            const outcome: Outcome = {
                                availablePoints: rawOutcome.pointsAvailable,
                                closeTimestamp: moment.utc(rawOutcome.closeTs).unix(),
                                externalId: String(rawOutcome.externalId),
                                id: String(rawOutcome.id),
                                injuryStatus: rawOutcome.injuryStatus,
                                name: rawOutcome.name,
                                plannedPoints: rawOutcome.plannedPoints,
                                selectionCost: rawOutcome.selectionCost,
                                statsId: null, // FIXME ?
                                typeName: rawOutcome.type.name,
                            };
                            outcomesById[outcome.id] = outcome;

                            return String(rawSelection.id);
                        });
                        const ticketIds = rawTemplate.tickets.map((uri) => {
                            return uri.replace("/api/v1/tickets/", "").replace("/", "");
                        });
                        const template: ITemplateTicket = {
                            externalId: String(rawTemplate.externalId),
                            id: String(rawTemplate.id),
                            modifiedTimestamp,
                            selectionIds,
                            selections,
                            ticketIds,
                            tickets: [],
                        };
                        templateTickets.push(template);
                    });

                    games = evg.games.map((rawGame): Game => {
                        const startTimestamp = moment.utc(rawGame.gameTime).unix()
                        return {
                            homeTeamId: String(rawGame.homeTeamId),
                            id: String(rawGame.id),
                            label: `${rawGame.visitingTeamAlias} @ ${rawGame.homeTeamAlias}`,
                            league: rawGame.league,
                            startDay: "REPLACE ME", // TODO check if timezone needed
                            startTimestamp,
                            status: null, // FIXME do we need this?
                            visitingTeamId: String(rawGame.visitingTeamId),
                        };
                    });

                    const gameIds = evg.games.map((game) => String(game.id));

                    const settings = JSON.parse(evg.settingsJson);

                    const eventGamesCollection: IEventGamesCollection = {
                        closeEventTimestamp: moment.utc(evg.closeEvent).unix(),
                        context: evg.context,
                        createdOutcomes: true,
                        eventPositionIds: [],
                        gameIds,
                        id: String(evg.id),
                        outcomeIds: [],
                        settings,
                        templateIds,
                    };

                    eventGamesCollections.push(eventGamesCollection);
                });

                dispatch({ type: FETCHED_GAMES, games });

                const eventPositions = _.values(positionsById);
                dispatch({ type: FETCHED_EVENT_POSITIONS, eventPositions });

                const outcomes = _.values(outcomesById);
                dispatch({ type: FETCHED_OUTCOMES, outcomes });

                dispatch({ type: FETCHED_EVENT_GAMES_COLLECTIONS, eventGamesCollections });

                yes(templateTickets);
            }, no);
        });

        dispatch({ type: FETCHING_TEMPLATE_TICKETS });
        promise.then((templateTickets) => {
            dispatch({ type: FETCHED_TEMPLATE_TICKETS, templateTickets });
        }, () => {
            dispatch({ type: ERROR_FETCHING_TEMPLATE_TICKETS });
        });

        return promise;
    };
}

export function createTemplateTicket(options) {
    return (dispatch: ReduxDispatch) => {
        const { externalId } = options;
        const data = {
            externalId,
            selections: options.selections.map((selection: ISaveTicketOptionsSelection) => {
                return {
                    eventPositionId: parseInt(selection.eventPositionId, 10),
                    outcomeId: parseInt(selection.outcomeId, 10),
                };
            }),
        };

        const promise = request("/v1/tickets/templates/", {
            data,
            headers: {
                "content-type": "application/json",
                "x-csrftoken": "sgwzwl6gUsoymuLnAxaxQNHXbawTpbXz",
            },
            method: "POST",
        });

        return promise;
    }
}

export function deleteTemplateTicket(id) {
    return (dispatch) => {
        const promise = request(`/v1/tickets/templates/${ id }/`, {
            headers: {
                "content-type": "application/json",
                "x-csrftoken": "sgwzwl6gUsoymuLnAxaxQNHXbawTpbXz",
            },
            method: "DELETE",
        });

        dispatch({ type: DELETED_TEMPLATE_TICKET, id });

        return promise;
    }
}
