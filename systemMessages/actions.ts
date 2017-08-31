import * as moment from "moment";
import * as Promise from "promise";

import ReduxDispatch from "../classes/ReduxDispatch";
import SystemMessage from "../classes/SystemMessage";

export const FETCHING_SYSTEM_MESSAGES = "FETCHING_SYSTEM_MESSAGES";
export const FETCHED_SYSTEM_MESSAGES = "FETCHED_SYSTEM_MESSAGES";
export const ERROR_FETCHING_SYSTEM_MESSAGES = "ERROR_FETCHING_SYSTEM_MESSAGES";

interface IRawSystemMessage {
    end_ts: string;
    id: number;
    message: string;
    settings: {
        [key: string]: string;
    };
    start_ts: string;
}

interface IRawSystemMessagesResponse {
    meta: any;
    objects: IRawSystemMessage[];
}

export function fetchSystemMessages() {
    return (dispatch: ReduxDispatch): Promise<SystemMessage[]> => {
        const promise: Promise<SystemMessage[]> = new Promise((yes, no) => {
            fetch("https://qa7.fantasydraft.com/api/v1/systemmessages/", {
                credentials: "omit",
                method: "GET",
                mode: "cors",
            }).then(() => {
                const results: IRawSystemMessagesResponse = {
                    meta: {},
                    objects: [
                        // {
                        //     end_ts: "2017-07-28T23:15:00",
                        //     id: 15,
                        //     message: "<h4><b>Example of System Messages</b></h4>",
                        //     settings: {
                        //         color: "rgb(212,245,253)",
                        //     },
                        //     start_ts: "2017-07-28T21:15:00",
                        // },
                    ],
                };
                const messages: SystemMessage[] = results.objects.map((msg: IRawSystemMessage) => {
                    const { id, message, settings, end_ts, start_ts } = msg;
                    return {
                        endTimestamp: moment.utc(end_ts).unix(),
                        id: String(id),
                        message,
                        settings,
                        startTimestamp: moment.utc(start_ts).unix(),
                    };
                });
                yes(messages);
            }, no);
       });

        dispatch({ type: FETCHING_SYSTEM_MESSAGES });
        promise.then((messages) => {
            dispatch({ type: FETCHED_SYSTEM_MESSAGES, messages });
        }, () => {
            dispatch({ type: ERROR_FETCHING_SYSTEM_MESSAGES });
        });

        return promise;
    };
}
