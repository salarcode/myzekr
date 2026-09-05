// react-router@7 uses TextEncoder/TextDecoder at module load, which are not
// defined in Jest 27's jsdom environment. Polyfill them from Node's util.
import { TextDecoder, TextEncoder } from 'util';

if (typeof globalThis.TextEncoder === 'undefined') {
	globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
	globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}

// The app loads its data (categories, zekr index, etc.) via XMLHttpRequest
// against /zekr-db/*.json. In jsdom those requests fail, producing console
// noise and leaving open handles. Stub XMLHttpRequest to resolve empty JSON.
class MockXMLHttpRequest {
	status = 200;
	statusText = 'OK';
	responseText = '[]';
	timeout = 0;
	onload: (() => void) | null = null;
	onerror: (() => void) | null = null;
	ontimeout: (() => void) | null = null;

	open() {}
	setRequestHeader() {}
	send() {
		if (this.onload) this.onload();
	}
	getAllResponseHeaders() {
		return 'Content-Type: application/json';
	}
	getResponseHeader(name: string) {
		return name.toLowerCase() === 'content-type' ? 'application/json' : null;
	}
}

if (typeof globalThis.XMLHttpRequest !== 'undefined') {
	globalThis.XMLHttpRequest = MockXMLHttpRequest as unknown as typeof XMLHttpRequest;
}

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
