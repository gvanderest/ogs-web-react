import * as moment from "moment";
import * as Promise from "promise";

import { FETCHED_EVENT_GAMES_COLLECTIONS } from "../eventGamesCollections/actions";
import {
    IEventGamesCollection,
    ITemplateTicket,
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
    return (dispatch) => {
        const promise = new Promise((yes, no) => {
            fetch("https://qa7.fantasydraft.com/api/v1/tickets/sportstemplates/", {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((results: IRawResults) => {
                    const templateTickets: ITemplateTicket[] = [];
                    const eventGamesCollections: IEventGamesCollection[] = [];

                    results.objects.map((result: IRawResult) => {
                        const evg: IRawEventGamesCollection = result.eventGamesCollection;
                        evg.id = String(evg.id);
                        evg.closeEventTimestamp = moment.utc(evg.closeEvent).unix();
                        evg.gameIds = evg.games.map((game) => String(game.id));
                        eventGamesCollections.push(evg);

                        result.templates.forEach((rawTemplate: IRawTemplate) => {
                            const modifiedTimestamp = Math.max.apply(null, template.selections.map((selection) => {
                                selection.modifiedTimestamp = moment.utc(selection.modifiedTs).unix();
                                return selection.modifiedTimestamp;
                            }));
                            const template: ITemplateTicket = {
                                id: String(rawTemplate.id),
                                modifiedTimestamp,
                            };
                            template.id = String(template.id);
                            template.externalId = String(template.externalId);
                            template.selectionIds = template.selections.map((rawSelection) => {
                                return String(rawSelection.id);
                            });
                            templateTickets.push(template);
                        });
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
