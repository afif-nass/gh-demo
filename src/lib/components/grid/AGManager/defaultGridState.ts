import { writable, type Writable } from 'svelte/store';

interface GridStore extends Writable<Grid.State> {
	getRows: (scope: 'all' | 'selected') => any[];
}

export function createGridStore(gridProps: Grid.Props): GridStore {
	const initialState: Grid.State = {
		props: gridProps,
		api: null,
		modal: {
			visible: false,
			title: '',
			fields: [],
			form: {
				fetchURL: '',
				submissionConfig: {
					text: { default: 'Submit', submitting: 'Submitting...' },
					confirm: false
				}
			}
		},
		mutateAction: '',
		rowCounts: {
			total: 0,
			displayed: 0,
			selected: 0
		}
	};

	const { subscribe, set, update } = writable<Grid.State>(initialState);

	const getRows = (scope: 'all' | 'selected') => {
		let rowData: any[] = [];
		const unsubscribe = subscribe((state) => {
			if (state.api) {
				const api = state.api;
				switch (scope) {
					case 'selected':
						rowData = api.getSelectedRows();
						break;
					case 'all':
						state.api.forEachNode((node) => rowData.push(node.data));
						break;
				}
			}
		});
		unsubscribe();
		return rowData;
	};

	return {
		subscribe,
		set,
		update,
		getRows
	};
}
