import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

type UserData = {
	email: string;
};

const USER = 'USER';

export function setUserState(initialData: UserData) {
	const userState = writable(initialData);
	setContext(USER, userState);
}

export function getUserState() {
	return getContext<Writable<UserData>>(USER);
}
