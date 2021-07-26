import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
	const { getAllByText } = render(<App />);
	const linkElements = getAllByText(/دعاها و اذکار/i);
	for (const link of linkElements) {
		expect(link).toBeInTheDocument();
	}
});
