import * as Promise from "promise";

interface IOptions {
    baseUrl?: string;
    data?: { [key: string]: any };
    headers?: { [jey: string]: string };
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | string;
    body?: string;
    credentials?: "include";
    mode?: "cors" | "no-cors";
    transformResponse?: any;
}

export const defaultOptions: IOptions = {
    baseUrl: '',
    credentials: "include",
    data: null,
    headers: {},
    method: "GET",
    mode: "cors",
    transformResponse: null,
};

export default function request(url: string, options: IOptions = defaultOptions): Promise<any> {
    options = { ...defaultOptions, ...options };

    if (url.indexOf("/") === 0) {
        url = options.baseUrl + url;
    }

    if (options.data) {
        options.body = JSON.stringify(options.data);
        delete options.data;
    }

    const promise = new Promise<any>((yes: any, no: any) => {
        fetch(url, options).then((response) => {

            // Success
            if (response.ok) {

                // No body provided
                if (response.status === 204) {
                    yes(null);

                // Parse the body
                } else {
                    response.json().then((data) => {
                        if (options.transformResponse) {
                            data = options.transformResponse(data);
                        }
                        yes(data);
                    }, no).catch(no);
                }

            // Response was of user or server error type
            } else {
                no(response);
            }
        }, no).catch(no);
    });

    return promise;
}
