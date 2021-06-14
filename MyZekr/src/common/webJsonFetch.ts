export interface HttpRequest<TRQ> {
	url: string;
	method?: string;
	body?: TRQ;
	accessToken?: string;
}
export interface HttpResponse<TRS> extends Response {
	parsedBody?: TRS;
}

export function webJsonFetch<TRQ, TRS>(config: HttpRequest<TRQ>): Promise<HttpResponse<TRS>> {
	return new Promise((resolve, reject) => {
		const request = new Request(config.url, {
			method: config.method || 'get',
			headers: {
				'Content-Type': 'application/json',
			},
			body: config.body ? JSON.stringify(config.body) : undefined,
		});
		if (config.accessToken) {
			request.headers.set('authorization', `bearer ${config.accessToken}`);
		}
		let response: HttpResponse<TRS>;
		fetch(request)
			.then((res) => {
				response = res;
				if (res.headers.get('Content-Type')?.includes('json')) {
					return res.json();
				} else {
					resolve(response);
				}
			})
			.then((body) => {
				if (response.ok) {
					response.parsedBody = body;
					resolve(response);
				} else {
					reject(response);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
}
