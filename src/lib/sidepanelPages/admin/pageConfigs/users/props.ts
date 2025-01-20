import { colDefs } from './colDefs';
import { imagePropsGetter } from './componentPropsGetters/cellHover/image';
import { data } from './data';

const mutationFormFields: Record<string, App.Components.Field.FieldDefinition> = {
	userEmail: {
		name: 'User Email',
		id: 'userEmail',
		fieldType: 'text',
		required: true
	}
};

const gridProps: Grid.Props = {
	colDefs,
	data,
	options: {
		rowHeight: 100
	},
	actions: {
		maximize: true,
		copyRow: true,
		download: true,
		createRecords: {
			single: {
				modalTitle: 'Invite a user',
				modalInputFields: structuredClone(Object.values(mutationFormFields))
			},
			bulk: true,
			endpoint: '/demo'
		},
		deleteRecords: {
			endpoint: '/demo',
			single: true,
			bulk: true
		},
		custom: [
			{ displayName: 'Slack profile', url: 'https://www.example.com' },
			{ displayName: 'Zenefits profile', url: 'https://www.example.com' }
		]
	},
	sortParams: {
		state: [{ colId: 'addedAt', sort: 'desc' }],
		defaultState: { sort: null }
	},
	cellHoverCards: [{ colId: 'name', componentName: 'Image', propsGetter: imagePropsGetter }]
};

export default gridProps;
