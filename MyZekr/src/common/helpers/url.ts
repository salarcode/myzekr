export function ObjectToQueryString(params: any): string {
	if (window['URLSearchParams'])
		// if URLSearchParams exists we use it. Only IE lacks this
		return new URLSearchParams(params).toString();

	if (typeof params != 'object') {
		console.warn('Warning, ObjectToQueryString is called for a non-object ', params);
		return '';
	}
	return Object.keys(params)
		.map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
		})
		.join('&');
}
