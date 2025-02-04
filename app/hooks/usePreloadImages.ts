import { useEffect, useRef } from 'react';

type ImageState = 'loading' | 'loaded' | 'error' | '';

export function usePreloadImages(images: string[]) {
	const cached = useRef<Record<string, ImageState>>({});

	useEffect(() => {
		cached.current = {};

		images.forEach((image) => {
			if (cached.current[image]) return;

			cached.current[image] = 'loading';
			const img = new Image();
			img.src = image;
			img.onload = () => {
				cached.current[image] = 'loaded';
			};
			img.onerror = () => {
				cached.current[image] = 'error';
			};
		});
	}, [images]);
}
