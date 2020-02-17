import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import App from '../App';
import useMutationObserver from './';

// apparently this isn't in whatever version of jsdom jest is using so we have to mock it heh heh.
mockMutationObserver();

describe('use mutation observer', () => {
	it('should throw an error if no ref if passed', () => {
		expect(() => {
			renderHook((useMutationObserver as any)());
		}).toThrow();
	});

	it('should run the callback on target element change', async () => {
		const mockCb = jest.fn();
		const { getByText } = render(<App cb={mockCb} />);
		fireEvent.click(getByText('Add'));

		setTimeout(() => {
			expect(mockCb).toHaveBeenCalled();
		}, 10);
	});
});

function mockMutationObserver() {
	function MockMutationObserver() {
		return {
			observe: jest.fn(),
			disconnect: jest.fn()
		};
	}

	(window as any).MutationObserver = MockMutationObserver;
}
