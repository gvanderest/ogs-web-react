import * as Promise from "promise";
import request from "../utils/request";
import ReduxDispatch from "../classes/ReduxDispatch";
import Selection from "../classes/Selection";

export const FETCHING_SELECTIONS = "FETCHING_SELECTIONS";
export const FETCHED_SELECTIONS = "FETCHED_SELECTIONS";
export const FETCHED_TICKET_SELECTIONS = "FETCHED_TICKET_SELECTIONS";

interface IRawSelection {
    points_adjustment: number;
    event_position_id: number;
    points_earned: number;
    settings_json: string;
    value: number;
    score_dropped: boolean;
    ticket_id: number;
    outcome_id: number;
    event_scoring_time_indicator: number;
    id: number;
    resource_uri: string;
}

interface IRawSelectionsResponse {
    objects: IRawSelection[];
};

export function fetchTicketSelections(ticketId: string) {
    return (dispatch: ReduxDispatch) => {
        const promise: Promise<Selection[]> = new Promise((yes, no) => {
            request(`/v1/selections/?ticket=${ticketId}`).then((response: IRawSelectionsResponse) => {
                const rawSelections = response.objects;
                const selections = rawSelections.map((sel: IRawSelection): Selection => {
                    return {
                        eventPositionId: String(sel.event_position_id),
                        id: String(sel.id),
                        outcomeId: String(sel.outcome_id),
                    };
                });
                yes(selections);
            }, no);
        });

        promise.then((selections: Selection[]) => {
            dispatch({ type: FETCHED_SELECTIONS, selections });
            dispatch({ type: FETCHED_TICKET_SELECTIONS, ticketId, selections });
        });

        return promise;
    };
}
