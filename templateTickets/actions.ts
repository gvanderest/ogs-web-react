import * as moment from "moment";
import * as Promise from "promise";

import TemplateTicket from "../classes/TemplateTicket";

import { FETCHED_EVENT_GAMES_COLLECTIONS } from "../eventGamesCollections/actions";
import {
    IEventGamesCollection,
    IReduxDispatch,
} from "../interfaces";

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
    return (dispatch: IReduxDispatch) => {
        const promise = new Promise((yes, no) => {
            fetch("https://qa7.fantasydraft.com/api/v1/tickets/sportstemplates/", {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((results: IRawResults) => {
                    const templateTickets: TemplateTicket[] = [];
                    const eventGamesCollections: IEventGamesCollection[] = [];

                    results.objects.map((result: IRawResult) => {
                        const evg: IRawEventGamesCollection = result.eventGamesCollection;
                        const templateIds: string[] = [];

                        result.templates.forEach((rawTemplate: IRawTemplate) => {
                            templateIds.push(String(rawTemplate.id));

                            const modifiedTimestamp = Math.max.apply(null, rawTemplate.selections.map((selection) => {
                                return moment.utc(selection.modifiedTs).unix();
                            }));
                            const selectionIds = rawTemplate.selections.map((rawSelection) => {
                                return String(rawSelection.id);
                            });
                            const ticketIds = rawTemplate.tickets.map((uri) => {
                                return uri.replace("/api/v1/tickets/", "").replace("/", "");
                            });
                            const template: TemplateTicket = {
                                externalId: String(rawTemplate.externalId),
                                id: String(rawTemplate.id),
                                modifiedTimestamp,
                                selectionIds,
                                selections: rawTemplate.selections,
                                ticketIds,
                                tickets: [],
                            };
                            templateTickets.push(template);
                        });

                        const gameIds = evg.games.map((game) => String(game.id));

                        const eventGamesCollection: IEventGamesCollection = {
                            closeEventTimestamp: moment.utc(evg.closeEvent).unix(),
                            context: evg.context,
                            gameIds,
                            id: String(evg.id),
                            templateIds,
                        };

                        eventGamesCollections.push(eventGamesCollection);
                    });

                    dispatch({ type: FETCHED_EVENT_GAMES_COLLECTIONS, eventGamesCollections });

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
