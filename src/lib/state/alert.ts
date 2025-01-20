import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

type Alert = App.State.Alert;
type AlertStore = App.State.AlertStore;

const ALERT = 'ALERT';

export function setAlertState(initialData?: Alert) {
	const alertState = writable(initialData);
	setContext(ALERT, alertState);
	return alertState as AlertStore;
}

export function getAlertState() {
	return getContext<AlertStore>(ALERT);
}
