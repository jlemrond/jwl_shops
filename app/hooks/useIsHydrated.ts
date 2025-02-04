import { useState, useEffect } from 'react';

export function useIsHydrated() {
	const [isHydrated, setHydrated] = useState<boolean>(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	return isHydrated;
}
