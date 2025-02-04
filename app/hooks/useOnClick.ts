import { useEffect } from 'react';

export const useOnOutsideClick = (
	ref: React.RefObject<HTMLElement>,
	callback: (event: MouseEvent | TouchEvent) => void,
) => {
	useEffect(() => {
		if (!ref.current) return;

		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback(event as MouseEvent | TouchEvent);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [ref, callback]);
};

export const useOnInsideClick = (
	ref: React.RefObject<HTMLElement>,
	callback: (event: MouseEvent | TouchEvent) => void,
) => {
	useEffect(() => {
		if (!ref.current) return;

		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (ref.current && ref.current.contains(event.target as Node)) {
				callback(event as MouseEvent | TouchEvent);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [ref, callback]);
};
