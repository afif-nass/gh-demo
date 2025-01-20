import { data } from './data';
import { colDefs } from './colDefs';
import Info from '../components/Info.svelte';

const mutationFormFields: Record<string, App.Components.Field.FieldDefinition> = {
	role: {
		name: 'Name',
		id: 'name',
		fieldType: 'text',
		required: true
	},
	description: {
		name: 'Description',
		id: 'description',
		fieldType: 'text',
		required: true
	}
};

const gridProps: Grid.Props = {
	colDefs,
	data,
	options: {
		rowHeight: 80,
		suppressCellFocus: true
	},
	actions: {
		copyRow: true,
		download: true,
		rowInfo: {
			component: Info
		},
		createRecords: {
			single: {
				modalTitle: 'New role',
				modalInputFields: structuredClone(Object.values(mutationFormFields))
			},
			bulk: true,
			endpoint: '/demo'
		},
		updateRecord: {
			modalTitle: 'Update role',
			modalInputFields: structuredClone(Object.values(mutationFormFields)),
			endpoint: '/demo'
		},
		deleteRecords: {
			endpoint: '/demo',
			single: true,
			bulk: true
		}
	},
	sortParams: {
		state: [{ colId: 'addedAt', sort: 'desc' }],
		defaultState: { sort: null }
	}
};

export default gridProps;
