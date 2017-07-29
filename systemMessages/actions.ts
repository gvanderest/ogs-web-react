import * as Promise from "promise";
import * as moment from "moment";
import { IReduxDispatch } from "../interfaces";
import { ISystemMessage } from "../interfaces";
import { IRawSystemMessage } from "../interfaces";

export const FETCHING_SYSTEM_MESSAGES = "FETCHING_SYSTEM_MESSAGES";
export const FETCHED_SYSTEM_MESSAGES = "FETCHED_SYSTEM_MESSAGES";
export const ERROR_FETCHING_SYSTEM_MESSAGES = "ERROR_FETCHING_SYSTEM_MESSAGES"

interface IRawSystemMessagesResponse {
    meta: any;
    objects: IRawSystemMessage[];
}

export function fetchSystemMessages() {
    return (dispatch: IReduxDispatch): Promise<ISystemMessage[]> => {
        const promise: Promise<ISystemMessage[]> = new Promise((yes, no) => {
            fetch("https://qa7.fantasydraft.com/api/v1/systemmessages/", {
                mode: "no-cors",
                method: "GET"
            }).then((response) => {
                console.log('GOT HERE', response);
                const results: IRawSystemMessagesResponse = {
                    meta: {},
                    objects: [
                        {
                            end_ts: "2017-07-28T23:15:00",
                            id: 15,
                            message: "<h4><b>MLB Update! The Rockies @ Nationals game is postponed, scoring will not count toward today's contests.</b></h4>",
                            settings: {
                                color: "rgb(212,245,253)"
                            },
                            start_ts: "2017-07-28T21:15:00"
                        }
                    ]
                };
                const messages: ISystemMessage[] = results.objects.map((msg: IRawSystemMessage) => {
                    const { id, message, settings, end_ts, start_ts } = msg;
                    return {
                        id: String(id),
                        message,
                        settings,
                        startTimestamp: moment.utc(start_ts).unix(),
                        endTimestamp: moment.utc(end_ts).unix(),
                    }
                });
                yes(messages);
                // response.json().then((results: IRawSystemMessagesResponse) => {
                //     yes(messages);
                // }, () => {
                //     console.log('BAAAD');
                // });
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