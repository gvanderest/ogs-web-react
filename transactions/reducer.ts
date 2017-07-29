import { FETCHED_TRANSACTIONS } from "./actions";
// import { ITransaction } from "../interfaces";
import generateReducer from "../utils/generateReducer";
import reduceRecords from "../utils/reduceRecords";

interface IState {
    fetching: false,
    byId: {
        [key: string]: ITransaction;
    };
}

const initialState: IState = {
    fetching: false,
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
    return {
        ...reduceRecords(state, transactions),
        fetching: false,
    };
}

export default generateReducer(initialState, {
    [FETCHED_TRANSACTIONS]: handleFetchedTransactions,
});
