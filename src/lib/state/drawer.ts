import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

type Drawer = App.State.Drawer;

const DRAWER = 'DRAWER';

export function setDrawerState(initialData?: Drawer) {
	const drawerState = writable(initialData);
	setContext(DRAWER, drawerState);
	return drawerState as App.State.DrawerStore;
}

export function getDrawerState() {
	return getContext<App.State.DrawerStore>(DRAWER);
}
