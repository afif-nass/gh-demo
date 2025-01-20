import * as AG from 'ag-grid-community';
import { type Writable } from 'svelte/store';

declare global {
	namespace Grid {
		type State = {
			revealed?: boolean;
			props: Grid.Props;
			api: AG.GridApi<any> | null;
			modal: {
				visible: boolean;
				title: string;
				fields?: App.Components.Field.FieldDefinition[] | [];
				form: Grid.FormParams;
				cells?: Record<string, any>;
			};
			mutateAction: string;
			rowCounts: {
				total: number;
				displayed: number;
				selected: number;
			};
		};
		interface Store extends Writable<Grid.State> {
			getRows: (scope: 'all' | 'selected') => AG.RowNode[];
		}
	}
}

export {};
