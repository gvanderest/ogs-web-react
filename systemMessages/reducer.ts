import { FETCHED_SYSTEM_MESSAGES } from "./actions";
import { ISystemMessage } from "../interfaces";
import generateReducer from "../utils/generateReducer";

interface IState {
    fetching: false,
    messages: ISystemMessage[];
}

const initialState: IState = {
    fetching: false,
    messages: [],
};

interface IHandleFetchedSystemMessagesAction {
    type: string;
    messages: ISystemMessage[];
}

function handleFetchedSystemMessages(state: IState, action: IHandleFetchedSystemMessagesAction) {
    const { messages } = action;
    return {
        ...state,
        fetching: false,
        messages
    };
}

export default generateReducer(initialState, {
    [FETCHED_SYSTEM_MESSAGES]: handleFetchedSystemMessages,
});
