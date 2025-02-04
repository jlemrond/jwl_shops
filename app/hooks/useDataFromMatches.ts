import { useMatches } from "@remix-run/react";

/**
 * Gets the custom info from the match data. Uses the match data from
 * the deepest match.
 *
 * @param dataKey The key to get the data from.
 */
export function useDataFromMatches<T>(dataKey: string): T | undefined {
	const matches = useMatches();
	let data: T | undefined;

	type EventData = {
		[key: string]: T;
	};

	matches.forEach((event) => {
		const eventData = event?.data;
		if (eventData && (eventData as EventData)[dataKey]) {
			data = (eventData as EventData)[dataKey];
		}
	});

	return data;
}
