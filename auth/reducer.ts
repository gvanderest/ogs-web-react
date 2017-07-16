import { ICustomer } from "../interfaces";
import generateReducer from "../utils/generateReducer";
import { FETCHED_AUTHENTICATED_CUSTOMER } from "./actions";
import { FETCHING_AUTHENTICATED_CUSTOMER } from "./actions";
import { NO_AUTHENTICATED_CUSTOMER } from "./actions";

interface IState {
    customerId: string;
    fetching: boolean;
}

function handleFetchingAuthenticatedCustomer(state: IState): IState {
    return {
        ...state,
        fetching: true,
    };
}

function handleNotAuthenticated(state: IState): IState {
    return {
        ...state,
        customerId: null,
        fetching: false,
    };
}

interface IHandleFetchedAuthenticatedCustomer {
    type: string;
    customer: ICustomer;
}

function handleFetchedAuthenticatedCustomer(state: IState, action: IHandleFetchedAuthenticatedCustomer) {
    const { customer } = action;
    return {
        ...state,
        customerId: customer.id,
        fetching: false,
    };
}

const initialState: IState = {
    customerId: null,
    fetching: false,
};

export default generateReducer(initialState, {
    [FETCHING_AUTHENTICATED_CUSTOMER]: handleFetchingAuthenticatedCustomer,
    [FETCHED_AUTHENTICATED_CUSTOMER]: handleFetchedAuthenticatedCustomer,
    [NO_AUTHENTICATED_CUSTOMER]: handleNotAuthenticated,
});
