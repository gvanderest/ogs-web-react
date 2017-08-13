import SystemMessage from "../classes/SystemMessage";
import generateReducer from "../utils/generateReducer";

import { FETCHED_SYSTEM_MESSAGES } from "./actions";

interface IState {
    fetching: boolean;
    messages: SystemMessage[];
}

const initialState: IState = {
    fetching: false,
    messages: [],
};

interface IHandleFetchedSystemMessagesAction {
    type: string;
    messages: SystemMessage[];
}

function handleFetchedSystemMessages(state: IState, action: IHandleFetchedSystemMessagesAction) {
    const { messages } = action;
    return {
        ...state,
        fetching: false,
        messages,
    };
}

export default generateReducer(initialState, {
    [FETCHED_SYSTEM_MESSAGES]: handleFetchedSystemMessages,
});
