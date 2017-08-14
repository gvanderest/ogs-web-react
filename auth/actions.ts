import * as Promise from "promise";

import Customer from "../classes/Customer";
import ReduxDispatch from "../classes/ReduxDispatch";
import ReduxThunk from "../classes/ReduxThunk";
import User from "../classes/User";

export const AUTHENTICATING_CUSTOMER = "AUTHENTICATING_CUSTOMER";
export const AUTHENTICATED_CUSTOMER = "AUTHENTICATED_CUSTOMER";
export const ERROR_AUTHENTICATING_CUSTOMER = "ERROR_AUTHENTICATING_CUSTOMER";

export const FETCHING_AUTHENTICATED_CUSTOMER = "FETCHING_AUTHENTICATED_CUSTOMER";
export const FETCHED_AUTHENTICATED_CUSTOMER = "FETCHED_AUTHENTICATED_CUSTOMER";
export const NO_AUTHENTICATED_CUSTOMER = "NO_AUTHENTICATED_CUSTOMER";

interface IRawAuthResponse {
    objects: any[];
}

interface ILoginOptions {
    username: string;
    password: string;
    captcha?: string;
}

export function logout(): ReduxThunk<Promise<{}>> {
    return (dispatch: ReduxDispatch) => {
        dispatch({ type: NO_AUTHENTICATED_CUSTOMER });
        fetch(`https://qa7.fantasydraft.com/api/v1/auth/`, {
            credentials: "include",
            method: "DELETE",
            mode: "cors",
        });
        return new Promise((yes) => {
            yes();
        });
    };
}

export function login(options: ILoginOptions): ReduxThunk<Promise<Customer>> {
    return (dispatch: ReduxDispatch) => {
        const promise: Promise<Customer> = new Promise((yes, no) => {
            const { captcha, username, password } = options;
            fetch(`https://qa7.fantasydraft.com/api/v1/auth/`, {
                body: JSON.stringify({
                    captcha,
                    password,
                    username,
                }),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                mode: "cors",
            }).then((response) => {
                if (response.ok) {
                    response.json().then(() => {
                        dispatch(fetchAuthenticatedCustomer()).then((customer: Customer) => {
                            yes(customer);
                        }, no);
                    }, no);
                } else {
                    no();
                }
            }, no);
        });

        dispatch({ type: FETCHING_AUTHENTICATED_CUSTOMER });
        promise.then((customer) => {
            dispatch({ type: FETCHED_AUTHENTICATED_CUSTOMER, customer });
        }, () => {
            dispatch({ type: NO_AUTHENTICATED_CUSTOMER });
        });

        return promise;
    };
}

interface IRawCustomer {
    address1: string;
    address2: string;
    phone: string;
    account: {
        balance: number;
        accounts: {
            [key: string]: number;
        };
        accounts_map: {
            [key: string]: string;
        };
    };
    user: {
        email: string;
        id: number;
        first_name: string;
        last_name: string;
        username: string;
    };
    id: number;
    experience_groups: {
        [key: number]: {
            id: number;
            is_member: boolean;
            name: string;
        };
    };
}

export function fetchAuthenticatedCustomer(): ReduxThunk<Promise<Customer>> {
    return (dispatch: ReduxDispatch) => {
        const promise = new Promise<Customer>((yes, no) => {
            fetch(`https://qa7.fantasydraft.com/api/v1/auth/`, {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((rawAuth: IRawAuthResponse) => {
                    const rawUser = rawAuth.objects[0];
                    if (!rawUser) {
                        return no();
                    }
                    fetch(`https://qa7.fantasydraft.com/api/v1/customers/${ rawUser.id }/`, {
                        credentials: "include",
                        method: "GET",
                        mode: "cors",
                    }).then((cxResponse) => {
                        cxResponse.json().then((cx: IRawCustomer) => {
                            const user: User = {
                                email: cx.user.email,
                                firstName: cx.user.first_name,
                                id: String(cx.user.id),
                                lastName: cx.user.last_name,
                                username: cx.user.username,
                            };

                            const experienceGroups = Object.keys(cx.experience_groups).map((id) => {
                                return cx.experience_groups[id].name;
                            });

                            const customer: Customer = {
                                account: {
                                    accounts: {
                                        ...cx.account.accounts,
                                    },
                                    accountsMap: {
                                        ...cx.account.accounts_map,
                                    },
                                    balance: cx.account.balance,
                                },
                                address1: cx.address1,
                                address2: cx.address2,
                                experienceGroups,
                                id: String(cx.id),
                                phone: cx.phone,
                                user,
                            };
                            customer.user.firstName = cx.user.first_name;
                            customer.user.lastName = cx.user.last_name;
                            yes(customer);
                        });
                    }, no);
                }, no);
            }, no);
        });

        dispatch({ type: FETCHING_AUTHENTICATED_CUSTOMER });
        promise.then((customer) => {
            dispatch({ type: FETCHED_AUTHENTICATED_CUSTOMER, customer });
        }, () => {
            dispatch({ type: NO_AUTHENTICATED_CUSTOMER });
        });

        return promise;
    };
}
