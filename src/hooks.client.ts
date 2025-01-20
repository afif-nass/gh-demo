import type { HandleClientError } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID();
	return {
		message: String(error),
		errorId
	};
};
