import { getErrorMessage } from "./getErrorMessage";

export const typedFetch = async <T>(
	request: Request | string,
	requestInit?: RequestInit | Request,
) => {
	try {
		const response: Response = await fetch(request, requestInit);

		if (response.ok) {
			const data: T = await response.json();
			return data;
		}

		if (response.status === 400) {
			const data = await response.json();
			throw new Error(getErrorMessage(data));
		}

		throw new Error("Unknown error");
	} catch (error) {
		console.error(error);
		return Promise.reject(getErrorMessage(error));
	}
};
