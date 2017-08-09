import generateReducer from "../utils/generateReducer";
import reduceRecords from "../utils/reduceRecords";

import { ITemplateTicket } from "../interfaces";
import { FETCHED_TEMPLATE_TICKETS } from "./actions";

interface IState {
    byId: {
        [key: string]: ITemplateTicket;
    };
}

const initialState: IState = {
    byId: {},
};

interface IHandleFetchedTemplateTicketsAction {
    type: string;
    templateTickets: ITemplateTicket[];
}

function handleFetchedTemplateTickets(state: IState, action: IHandleFetchedTemplateTicketsAction) {
    return reduceRecords(state, action.templateTickets);
}

export default generateReducer(initialState, {
    [FETCHED_TEMPLATE_TICKETS]: handleFetchedTemplateTickets,
});
