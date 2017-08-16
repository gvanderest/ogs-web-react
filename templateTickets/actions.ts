import * as _ from "lodash";
import * as moment from "moment";
import * as Promise from "promise";

import IEventGamesCollection from "../interfaces/IEventGamesCollection";
import EventPosition from "../classes/EventPosition";
import ReduxDispatch from "../classes/ReduxDispatch";
import Outcome from "../classes/Outcome";
import ISelection from "../interfaces/ISelection";
import ITemplateTicket from "../interfaces/ITemplateTicket";

import { FETCHED_EVENT_GAMES_COLLECTIONS } from "../eventGamesCollections/actions";
import { FETCHED_EVENT_POSITIONS } from "../eventPositions/actions";
import { FETCHED_OUTCOMES } from "../outcomes/actions";

export const FETCHING_TEMPLATE_TICKETS = "FETCHING_TEMPLATE_TICKETS";
export const FETCHED_TEMPLATE_TICKETS = "FETCHED_TEMPLATE_TICKETS";
export const ERROR_FETCHING_TEMPLATE_TICKETS = "ERROR_FETCHING_TEMPLATE_TICKETS";

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
            fetch("https://qa7.fantasydraft.com/api/v1/tickets/sportstemplates/", {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((results: IRawResults) => {
                    const templateTickets: ITemplateTicket[] = [];
                    const eventGamesCollections: IEventGamesCollection[] = [];
                    const positionsById: { [key: string]: EventPosition } = {};
                    const outcomesById: { [key: string]: Outcome } = {};

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

                                const rawPosition = rawSelection.eventPosition;
                                const eventPosition: EventPosition = {
                                    ...rawPosition,
                                    eventGamesId: String(rawPosition.eventGamesId),
                                    id: String(rawPosition.id),
                                };
                                positionsById[eventPosition.id] = eventPosition;

                                const rawOutcome = rawSelection.outcome;
                                const outcome: Outcome = {
                                    ...rawOutcome,
                                    id: String(rawOutcome.id),
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

                    dispatch({ type: FETCHED_EVENT_GAMES_COLLECTIONS, eventGamesCollections });

                    const eventPositions = _.values(positionsById);
                    dispatch({ type: FETCHED_EVENT_POSITIONS, eventPositions });

                    const outcomes = _.values(outcomesById);
                    dispatch({ type: FETCHED_OUTCOMES, outcomes });

                    yes(templateTickets);
                }, no);
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
