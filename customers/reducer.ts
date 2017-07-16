import { FETCHED_AUTHENTICATED_CUSTOMER } from "../auth/actions";
import { ICustomer } from "../interfaces";
import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";

interface IState {
    byId: {
        [key: string]: ICustomer;
    };
}

const initialState: IState = {
    byId: {},
};

interface IHandleFetchedCustomerState {
    type: string;
    customer: ICustomer;
}

function handleFetchedCustomer(state: IState, action: IHandleFetchedCustomerState) {
    const { customer } = action;
    return reduceRecord(state, customer);
}

export default generateReducer(initialState, {
    [FETCHED_AUTHENTICATED_CUSTOMER]: handleFetchedCustomer,
});
