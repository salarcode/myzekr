export interface HttpRequest<TRQ> {
	url: string;
	method?: string;
	body?: TRQ;
	accessToken?: string;
	ignoreCache?: boolean;
	timeout?: number;
}
export interface HttpResponse<TRS> {
	ok: boolean;
	status: number;
	statusText: string;
	data: string;
	parsedBody?: TRS;
	headers: string;
}

export const defaultWebRequestTimeout = 10 * 1000;

function parseXHRResult<TRS>(xhr: XMLHttpRequest): HttpResponse<TRS> {
	return {
		ok: xhr.status >= 200 && xhr.status < 300,
		status: xhr.status,
		statusText: xhr.statusText,
		headers: xhr.getAllResponseHeaders(),
		data: xhr.responseText,
		parsedBody: xhr.getResponseHeader('Content-Type')?.includes('json') ? (JSON.parse(xhr.responseText) as TRS) : undefined,
	};
}

function errorResponse<TRS>(xhr: XMLHttpRequest, message: string | null = null): HttpResponse<TRS> {
	return {
		ok: false,
		status: xhr.status,
		statusText: xhr.statusText,
		headers: xhr.getAllResponseHeaders(),
		data: message || xhr.statusText,
		parsedBody: undefined,
	};
}

/** extracted from https://gist.github.com/codecorsair/e14ec90cee91fa8f56054afaa0a39f13 */
export function webJsonRequestXhr<TRQ, TRS>(config: HttpRequest<TRQ>): Promise<HttpResponse<TRS>> {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(config.method || 'get', config.url);

		if (config.accessToken) {
			xhr.setRequestHeader('authorization', `bearer ${config.accessToken}`);
		}
		if (config.ignoreCache) {
			xhr.setRequestHeader('Cache-Control', 'no-cache');
		}
		if (config.timeout) {
			xhr.timeout = config.timeout;
		}

		xhr.onload = (evt) => {
			resolve(parseXHRResult(xhr));
		};

		xhr.onerror = (evt) => {
			console.warn('webJsonRequest has failed for ' + config.url, evt);
			reject(errorResponse(xhr, 'Failed to make request.'));
		};

		xhr.ontimeout = (evt) => {
			console.warn('webJsonRequest has timed out for ' + config.url, evt);
			reject(errorResponse(xhr, 'Request took longer than expected.'));
		};

		if (config.method === 'post' && config.body) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(config.body));
		} else {
			xhr.send();
		}
	});
}
