import { useEffect, useState } from 'react';

export function useSessionStorage(key: string, initialValue?: unknown) {
	const [value, setStoredValue] = useState(() => {
		// If the window is not defined, return the initial value
		if (typeof window === 'undefined') {
			return initialValue;
		}

		// If the key is not in the storage, return the initial value
		const item = window.sessionStorage.getItem(key);

		// If the value is a string, parse it and return it
		if (item) {
			return JSON.parse(item);
		}

		// If the initial value is a function, call it and return the result
		if (typeof initialValue === 'function') {
			return initialValue();
		}

		return initialValue;
	});

	// Create a setValue function instead of using useEffect?
	const setValue = (newValue: unknown) => {
		// If the value is undefined or null, remove the key from the sessionStorage
		if (newValue === undefined || newValue === null) {
			window.sessionStorage.removeItem(key);
			setStoredValue(newValue);
			return;
		}

		// Set the value in the sessionStorage
		// If the value is a function, call it and set the result
		if (typeof newValue === 'function') {
			newValue = newValue() as string;
		} else if (typeof newValue === 'object') {
			newValue = JSON.stringify(newValue) as string;
		} else if (newValue.toString) {
			newValue = newValue.toString() as string;
		}

		window.sessionStorage.setItem(key, newValue as string);
		setStoredValue(newValue);
	};

	return [value, setValue];
}
