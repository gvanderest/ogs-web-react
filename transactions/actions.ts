import * as moment from "moment";
import * as Promise from "promise";

import Transaction from "../classes/Transaction";

export const FETCHING_TRANSACTIONS = "FETCHING_TRANSACTIONS";
export const FETCHED_TRANSACTIONS = "FETCHED_TRANSACTION";
export const ERROR_FETCHING_TRANSACTIONS = "ERROR_FETCHING_TRANSACTIONS";

interface IRawTransaction {
    amount: number;
    closed: boolean;
    created_ts: string;
    currency: string;
    description: string;
    external_id: string;
    id: number;
    name: string;
    paid: boolean;
}

interface IRawTransactionsResults {
    meta: any;
    objects: IRawTransaction[];
}

export function fetchTransactions() {
    return (dispatch: any): Promise<Transaction[]> => {
        const promise: Promise<Transaction[]> = new Promise((yes, no) => {
            fetch("https://qa7.fantasydraft.com/api/v1/transactions/", {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((results: IRawTransactionsResults) => {
                    const transactions: Transaction[] = results.objects.map((tx: IRawTransaction) => {
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
                        };
                    });
                    yes(transactions);
                }, no);
            }, no);
       });

        dispatch({ type: FETCHING_TRANSACTIONS });
        promise.then((transactions) => {
            dispatch({ type: FETCHED_TRANSACTIONS, transactions });
        }, () => {
            dispatch({ type: ERROR_FETCHING_TRANSACTIONS });
        });

        return promise;
    };
}
