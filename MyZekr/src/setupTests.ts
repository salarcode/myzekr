// react-router@7 uses TextEncoder/TextDecoder at module load, which are not
// defined in Jest 27's jsdom environment. Polyfill them from Node's util.
import { TextDecoder, TextEncoder } from 'util';

if (typeof globalThis.TextEncoder === 'undefined') {
	globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
	globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
