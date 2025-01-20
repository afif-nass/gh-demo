import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.requestId = getUniqueId();
	const response = await resolve(event);
	return response;
};

const getUniqueId = () => {
	return Math.random().toString(36).slice(2, 11);
};

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	console.log(error);
	return { message: 'Something went wrong.' };
};
