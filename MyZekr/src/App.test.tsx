import React from 'react';
import { act, render } from '@testing-library/react';
import App from './App';

// Data fetches are stubbed at the XMLHttpRequest level in setupTests.ts, so
// the app renders without real network requests. The act() wrapper flushes
// the async state updates (settings, category list) that fire on mount.
test('renders learn react link', async () => {
	let getAllByText!: (text: RegExp) => HTMLElement[];
	await act(async () => {
		const utils = render(<App />);
		getAllByText = utils.getAllByText;
	});
	const linkElements = getAllByText(/دعاها و اذکار/i);
	for (const link of linkElements) {
		expect(link).toBeInTheDocument();
	}
});
