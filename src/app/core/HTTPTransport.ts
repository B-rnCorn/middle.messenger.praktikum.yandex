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

class HTTPTransport {
    get = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: Methods.GET}, options.timeout);
    };

    post = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: Methods.POST}, options.timeout);
    };

    put = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: Methods.PUT}, options.timeout);
    };

    delete = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: Methods.DELETE}, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000) => {
        const {method = Methods.GET, data={}, headers = {}} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, method === Methods.GET ? `${url}${queryStringify(data)}` : url);

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.timeout = timeout ? timeout : 5000;

            xhr.onload = function() {
                resolve(xhr);
            }
            xhr.ontimeout = reject;
            xhr.onabort = reject;
            xhr.onerror = reject;

            if (method === Methods.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

function fetchWithRetry(url: string, options: Options) {
    const {retries = 2, ...requestOptions} = options;

    function onRequestFailed() {
        if ( retries === 0) {
            throw new Error('Fetch failed after several retries')
        }
        return this.fetchWithRetry(url, {...requestOptions, ...{retries: retries - 1}});
    }

    return new HTTPTransport().request(url, requestOptions).catch(onRequestFailed);
}
