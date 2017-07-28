import { FETCHED_TRANSACTIONS } from "./actions";
// import { ITransaction } from "../interfaces";
import generateReducer from "../utils/generateReducer";
import reduceRecords from "../utils/reduceRecords";

interface IState {
    byId: {
        [key: string]: ITransaction;
    };
}

const initialState: IState = {
    byId: {},
};

interface ITransaction {
}

interface IHandleFetchedTransactionsAction {
    type: string;
    transactions: ITransaction[];
}

function handleFetchedTransactions(state: IState, action: IHandleFetchedTransactionsAction) {
    const { transactions } = action;
    return reduceRecords(state, transactions);
}

export default generateReducer(initialState, {
    [FETCHED_TRANSACTIONS]: handleFetchedTransactions,
});
