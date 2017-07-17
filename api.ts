import * as Promise from "promise";

interface IData {
    [key: string]: string;
}

interface IOptions {
    [key: string]: any;
}

export default class API {
    public static get(url: string, data?: IData, options?: IOptions) {
        const passedOptions = { ...options, data, method: "GET" };
        return API.request(url, passedOptions);
    }
    /**
     * Return a URL for the API with any encoded query strings as needed.
     */
    public static generateUrl(url: string, data?: IData) {
        let fullUrl = API.baseUrl + "/" + url + "/";
        if (data) {
            const queries: string[] = Object.keys(data).sort().map((key: string): string => {
                return [key, data[key]].join("=");
            });
            if (queries.length) {
                fullUrl += "?" + queries.join("&");
            }
        }
        return fullUrl;
    }
    public static getHeaders() {
        return {};
    }
    public static request(url: string, options: IOptions) {
        const fetchOptions = {
            credentials: "include" as "include",
            data: options.method === "GET" ? "" : JSON.stringify(options.data),
            headers: API.getHeaders(),
            method: "GET" || options.method,
            mode: "cors" as "cors",
            ...options,
        };

        const fullUrl = API.generateUrl(url, fetchOptions.method === "GET" ? options.data : null);

        return new Promise((yes, no) => {
            fetch(fullUrl, fetchOptions).then((rawResponse) => {
                if (rawResponse.ok) {
                    rawResponse.json().then((response) => {
                        return yes(response);
                    }, () => {
                        return no("JSON_ERROR");
                    });
                } else {
                    // TODO Make this properly map to HTTP status codes?
                    return no("SERVER_ERROR");
                }
            }, () => {
                return no("SERVER_ERROR");
            });
        });
    }
    protected static baseUrl = "https://qa7.fantasydraft.com/api";
}