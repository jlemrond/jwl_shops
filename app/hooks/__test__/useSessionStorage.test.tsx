import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useSessionStorage } from '../useSessionStorage';

const sessionStorageMock = (() => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let store: Record<string, any> = {};

	return {
		getItem(key: string) {
			return store[key] || null;
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setItem(key: string, value: any) {
			store[key] = JSON.stringify(value);
		},
		removeItem(key: string) {
			delete store[key];
		},
		clear() {
			store = {};
		},
	};
})();

beforeAll(() => {
	Object.defineProperty(window, 'sessionStorage', {
		value: sessionStorageMock,
	});
});

describe('useSessionStorage', () => {
	test('should return the initial value', () => {
		const { result } = renderHook(() => useSessionStorage('key', 'value'));
		expect(result.current[0]).toBe('value');
	});

	test('should return the value from sessionStorage', () => {
		window.sessionStorage.setItem('key', 'value2');
		const { result } = renderHook(() => useSessionStorage('key', 'value'));
		expect(result.current[0]).toBe('value2');
	});

	test('should set the value in sessionStorage', () => {
		const { result } = renderHook(() => useSessionStorage('key', 'value'));
		act(() => {
			result.current[1]('value3');
		});
		const storedValue = window.sessionStorage.getItem('key') as string;
		expect(JSON.parse(storedValue)).toBe('value3');
	});

	test('should remove the value from sessionStorage', () => {
		const { result } = renderHook(() => useSessionStorage('key', 'value'));
		act(() => {
			result.current[1](null);
		});
		const storedValue = window.sessionStorage.getItem('key');
		expect(storedValue).toBe(null);
	});
});
