import { data } from './data';
import { colDefs } from './colDefs';
import { imagePropsGetter } from './componentPropsGetters/cellHover/image';
import { pillListPropsGetter } from './componentPropsGetters/cellHover/pillList';
import { nodeFilter } from './preparedFunctions';

const mutationFormFields: Record<string, App.Components.Field.FieldDefinition> = {
	userEmail: {
		name: 'User Email',
		id: 'userEmail',
		fieldType: 'comboBox',
		valueOptions: data.map((user) => user.userEmail),
		required: true
	},
	role: { name: 'Role', id: 'role', fieldType: 'text', required: true }
};

const gridProps: Grid.Props = {
	colDefs,
	data,
	options: {
		rowHeight: 100
	},
	externalFilters: {
		names: ['All', 'Admins', 'Managers'],
		initial: 'All',
		current: '',
		nodeFilter
	},
	showSearchBar: true,
	actions: {
		maximize: true,
		copyRow: true,
		download: true,
		createRecords: {
			single: {
				modalTitle: 'New user role',
				modalInputFields: structuredClone(Object.values(mutationFormFields))
			},
			bulk: true,
			endpoint: '/demo'
		},
		updateRecord: {
			modalTitle: 'Update user role',
			modalInputFields: structuredClone(Object.values(mutationFormFields)),
			endpoint: '/demo'
		},
		deleteRecords: {
			endpoint: '/demo',
			single: true,
			bulk: true
		},
		custom: [
			{ displayName: 'Approve role' },
			{ displayName: 'Slack profile', url: 'https://www.example.com' },
			{ displayName: 'View in Zenefits', url: 'https://www.example.com' }
		]
	},
	sortParams: {
		state: [{ colId: 'addedAt', sort: 'desc' }],
		defaultState: { sort: null }
	},
	cellHoverCards: [
		{ colId: 'role', componentName: 'PillList', propsGetter: pillListPropsGetter },
		{ colId: 'userEmail', componentName: 'Image', propsGetter: imagePropsGetter }
	]
};

export default gridProps;
