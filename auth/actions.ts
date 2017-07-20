import * as Promise from "promise";
import { IReduxDispatch, IReduxThunk } from "../interfaces";

export const AUTHENTICATING_CUSTOMER = "AUTHENTICATING_CUSTOMER";
export const AUTHENTICATED_CUSTOMER = "AUTHENTICATED_CUSTOMER";
export const ERROR_AUTHENTICATING_CUSTOMER = "ERROR_AUTHENTICATING_CUSTOMER";

export const FETCHING_AUTHENTICATED_CUSTOMER = "FETCHING_AUTHENTICATED_CUSTOMER";
export const FETCHED_AUTHENTICATED_CUSTOMER = "FETCHED_AUTHENTICATED_CUSTOMER";
export const NO_AUTHENTICATED_CUSTOMER = "NO_AUTHENTICATED_CUSTOMER";

interface ICustomer {
    id: string;
}

interface IRawAuthResponse {
    objects: any[];
}

interface ILoginOptions {
    username: string;
    password: string;
    captcha?: string;
}

export function logout(): IReduxThunk {
    return (dispatch: IReduxDispatch): Promise<void> => {
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

export function login(options: ILoginOptions): IReduxThunk {
    return (dispatch: IReduxDispatch): Promise<ICustomer> => {
        const promise: Promise<ICustomer> = new Promise((yes, no) => {
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
                        dispatch(fetchAuthenticatedCustomer()).then((customer: ICustomer) => {
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

export function fetchAuthenticatedCustomer(): IReduxThunk {
    return (dispatch: IReduxDispatch): Promise<ICustomer> => {
        const promise = new Promise<ICustomer>((yes, no) => {
            fetch(`https://qa7.fantasydraft.com/api/v1/auth/`, {
                credentials: "include",
                method: "GET",
                mode: "cors",
            }).then((response) => {
                response.json().then((rawAuth: IRawAuthResponse) => {
                    if (rawAuth.objects.length) {
                        yes(rawAuth.objects[0]);
                    } else {
                        no();
                    }
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
