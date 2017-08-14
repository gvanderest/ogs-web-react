import Customer from "../classes/Customer";
import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";

import { FETCHED_AUTHENTICATED_CUSTOMER } from "../auth/actions";

interface IState {
    byId: {
        [key: string]: Customer;
    };
}

const initialState: IState = {
    byId: {},
};

interface IHandleFetchedCustomerState {
    type: string;
    customer: Customer;
}

function handleFetchedCustomer(state: IState, action: IHandleFetchedCustomerState) {
    const { customer } = action;
    return reduceRecord(state, customer);
}

export default generateReducer(initialState, {
    [FETCHED_AUTHENTICATED_CUSTOMER]: handleFetchedCustomer,
});
