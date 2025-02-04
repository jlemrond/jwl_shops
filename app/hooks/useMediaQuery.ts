import { useEffect, useState } from 'react';
import isAPISupported from '~/utils/isAPISupported';
import isClient from '~/utils/isClient';
import warnOnce from '~/utils/warnOnce';
import { useIsHydrated } from './useIsHydrated';

const errorMessage =
	'matchMedia is not supported, this could happen both because window.matchMedia is not supported by' +
	" your current browser or you're using the useMediaQuery hook whilst server side rendering.";

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.
 * It also monitor the document changes to detect when it matches or stops matching the media query.
 * Returns the validity state of the given media query.
 *
 * @example
 * ```
 * const isMobile = useMediaQuery('(max-width: 600px)');
 * ```
 */
const useMediaQuery = (mediaQuery: string) => {
	if (!isClient || !isAPISupported('matchMedia')) {
		warnOnce(errorMessage);
		return false;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isVerified, setIsVerified] = useState(!!window.matchMedia(mediaQuery).matches);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const isHydrated = useIsHydrated();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const mediaQueryList = window.matchMedia(mediaQuery);
		const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);

		try {
			mediaQueryList.addEventListener('change', documentChangeHandler);
		} catch (e) {
			// Safari isn't supporting mediaQueryList.addEventListener
			// @ts-ignore: addListener is deprecated
			mediaQueryList.addListener(documentChangeHandler);
		}

		documentChangeHandler();
		return () => {
			try {
				mediaQueryList.removeEventListener('change', documentChangeHandler);
			} catch (e) {
				// Safari isn't supporting mediaQueryList.removeEventListener
				// @ts-ignore: removeListener is deprecated
				mediaQueryList.removeListener(documentChangeHandler);
			}
		};
	}, [mediaQuery]);

	return isVerified && isHydrated;
};

export default useMediaQuery;
