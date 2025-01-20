import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

type Title = App.State.Title;

const TITLE = 'TITLE';

export function setTitleState(initialData: Title) {
	const titleState = writable(initialData);
	setContext(TITLE, titleState);
	return titleState;
}

export function getTitleState() {
	return getContext<Writable<Title>>(TITLE);
}
