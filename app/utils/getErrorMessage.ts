/**
 * Solution to the typescript problem of thrown errors not being of type Error
 * since you can thorw anything in javascript. This checks if the error has a
 * message property and if so, returns it. If not, it tries to JsonStringify the
 * error and returns that. If that fails, it returns the stringified error.
 *
 * Suggestion from: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 */
type ErrorWithMessage = {
	message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof (error as Record<string, unknown>).message === "string"
	);
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) return maybeError;

	try {
		return new Error(JSON.stringify(maybeError));
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError));
	}
}

export function getErrorMessage(error: unknown) {
	return toErrorWithMessage(error).message;
}
