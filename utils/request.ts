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
            if (response.ok) {
                response.json().then((data) => {
                    if (options.transformResponse) {
                        yes(options.transformResponse(data));
                    } else {
                        yes(data);
                    }
                }, no);
            } else {
                no();
            }
        }, no);
    });

    return promise;
}
