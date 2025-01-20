import * as AG from 'ag-grid-community';
import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const ROW_ACTIONS = 'ROW_ACTIONS';

export type RowActionsState = {
	props: AG.ICellRendererParams;
	visibility: Writable<{ customActions: boolean; copyOptions: boolean; drawer: boolean }>;
};

export function setRowActionsState(initialData: RowActionsState) {
	const rowActionsState = writable(initialData);
	return setContext(ROW_ACTIONS, rowActionsState);
}

export function getRowActionsState() {
	return getContext<Writable<RowActionsState>>(ROW_ACTIONS);
}
