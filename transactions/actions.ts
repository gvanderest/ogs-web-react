import * as Promise from "promise";
import * as moment from "moment";
import { IReduxDispatch } from "../interfaces";
import { ITransaction } from "../interfaces";
import { IRawTransaction } from "../interfaces";

export const FETCHING_TRANSACTIONS = "FETCHING_TRANSACTIONS";
export const FETCHED_TRANSACTIONS = "FETCHED_TRANSACTION";
export const ERROR_FETCHING_TRANSACTIONS = "ERROR_FETCHING_TRANSACTIONS"

interface IRawTransactionsResults {
    meta: any;
    objects: IRawTransaction[];
}

export function fetchTransactions() {
    return (dispatch: IReduxDispatch): Promise<ITransaction[]> => {
        const promise: Promise<ITransaction[]> = new Promise((yes, no) => {
            fetch("https://qa7.fantasydraft.com/api/v1/transactions/", {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((results: IRawTransactionsResults) => {
                    const transactions: ITransaction[] = results.objects.map((tx) => {
                        const { amount, closed, currency, description, id,
                            external_id, paid, created_ts } = tx;
                        return {
                            amount,
                            closed,
                            createdTimestamp: moment.utc(created_ts).unix(),
                            currency,
                            description,
                            externalId: external_id,
                            id: String(id),
                            name,
                            paid,
                        }
                    });
                    yes(transactions);
                }, no);
            }, no);
       });

        promise.then((transactions) => {
            dispatch({ type: FETCHED_TRANSACTIONS, transactions });
        }, () => {
            dispatch({ type: ERROR_FETCHING_TRANSACTIONS });
        });

        return promise;
    };
}