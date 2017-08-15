import ITransaction from "../interfaces/ITransaction";
import generateReducer from "../utils/generateReducer";
import reduceRecords from "../utils/reduceRecords";

import { FETCHED_TRANSACTIONS } from "./actions";

interface IState {
    fetching: false;
    byId: {
        [key: string]: ITransaction;
    };
}

const initialState: IState = {
    byId: {},
    fetching: false,
};

interface IHandleFetchedTransactionsAction {
    type: string;
    transactions: ITransaction[];
}

function handleFetchedTransactions(state: IState, action: IHandleFetchedTransactionsAction) {
    const { transactions } = action;
    return {
        ...reduceRecords(state, transactions),
        fetching: false,
    };
}

export default generateReducer(initialState, {
    [FETCHED_TRANSACTIONS]: handleFetchedTransactions,
});
