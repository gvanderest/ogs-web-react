import generateReducer from "../utils/generateReducer";
import reduceRecords from "../utils/reduceRecords";
import deleteRecord from "../utils/deleteRecord";
import TemplateTicket from "../classes/TemplateTicket";

import {
    DELETED_TEMPLATE_TICKET,
    FETCHED_TEMPLATE_TICKETS,
} from "./actions";

interface IState {
    byId: {
        [key: string]: TemplateTicket;
    };
}

const initialState: IState = {
    byId: {},
};

interface IHandleFetchedTemplateTicketsAction {
    type: string;
    templateTickets: TemplateTicket[];
}

function handleFetchedTemplateTickets(state: IState, action: IHandleFetchedTemplateTicketsAction) {
    return reduceRecords(state, action.templateTickets);
}

function handleDeletedTemplateTicket(state: IState, action) {
    console.log("DELETING RECORD", id);
    const { id } = action;
    return deleteRecord(state, id);
}

export default generateReducer(initialState, {
    [FETCHED_TEMPLATE_TICKETS]: handleFetchedTemplateTickets,
    [DELETED_TEMPLATE_TICKET]: handleDeletedTemplateTicket,
});
