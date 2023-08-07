enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type Options = {
    headers?: Record<string, string>;
    method?: Methods;
    timeout?: number;
    retries?: number;
    data?: Data;
};

type Data = Record<string, any>

function queryStringify(data: Data): string {
    if (typeof data === 'object') {
        const keys = Object.keys(data);
        const queryParams: string[] = [];
        if (keys.length > 0) {
            keys.map((key) => {
                if (typeof data[key] === 'object') {
                    queryParams.push(`${key}=${data[key].toString()}`);
                } else {
                    queryParams.push(`${key}=${data[key]}`);
                }
            });
            return `?${queryParams.join('&')}`;
        } else {
            return '';
        }
    } else {
        return '';
    }
}

//Пока что при переходе на типизацию вида get:HTTPMethod ломается слишком много)
//type HTTPMethod<Response> = (url: string, options: Options) => Promise<Response>

export class HTTPTransport {

    private readonly endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    get<Response>(url: string , options: Options = {data: {}, method: Methods.GET}): Promise<Response>  {
        return this.request<Response>(options.data ? `${this.endpoint}/${url}${queryStringify(options.data)}` : url, {
            ...options,
            method: Methods.GET
        })
    };

    post<Response = void>(url: string, options?: Options): Promise<Response> {
        return this.request(`${this.endpoint}/${url}`, {...options, method: Methods.POST});
    }

    put<Response = void>(url: string, options?: Options): Promise<Response> {
        return this.request(`${this.endpoint}/${url}`, {...options, method: Methods.PUT});
    }

    delete<Response = void>(url: string, options? : Options): Promise<Response> {
        return this.request(`${this.endpoint}/${url}`, {...options, method: Methods.DELETE});
    }

    request<Response>(url: string, options: Options): Promise<Response> {
        const {method = Methods.GET, data = {}, headers = {'Content-Type': 'application/json'}, timeout = 5000} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.withCredentials = true;

            xhr.open(method, url);

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.timeout = timeout ? timeout : 5000;

            xhr.onload = function () {
                if (typeof xhr.response === 'string' && xhr.response[0] === '{' || xhr.response[0] === '[')
                    resolve(JSON.parse(xhr.response))
                else
                    resolve(xhr.response);
            }
            xhr.ontimeout = reject;
            xhr.onabort = reject;
            xhr.onerror = reject;

            if (data instanceof FormData) {
                xhr.send(data);
            } else {
                if (method === Methods.GET || !data) {
                    xhr.send();
                } else {
                    xhr.send(JSON.stringify(data));
                }
            }
        });
    };
}

export function fetchWithRetry(endpoint: string, url: string, options: Options) {
    const {retries = 2, ...requestOptions} = options;

    function onRequestFailed() {
        if (retries === 0) {
            throw new Error('Fetch failed after several retries')
        }
        return this.fetchWithRetry(url, {...requestOptions, ...{retries: retries - 1}});
    }

    return new HTTPTransport(endpoint).request(url, requestOptions).catch(onRequestFailed);
}
