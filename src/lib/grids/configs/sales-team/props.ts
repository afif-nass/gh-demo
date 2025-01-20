import { data } from './data';
import { colDefs } from './colDefs';
import { nodeFilter } from './preparedFunctions';
import { tooltipPropsGetter } from './componentPropsGetters/cellHover/tooltip';

const gridProps: Grid.Props = {
	colDefs,
	data,
	options: {
		rowHeight: 170
	},
	externalFilters: {
		names: ['All', 'West', 'Midwest', 'Northeast', 'South'],
		initial: 'All',
		current: '',
		nodeFilter
	},
	showSearchBar: true,
	actions: {
		copyRow: true,
		maximize: true,
		download: true,
		custom: [
			{ displayName: 'Download opportunities breakdown' },
			{ displayName: 'Assign a lead' },
			{ displayName: 'Open in Salesforce', url: 'https://www.example.com' }
		]
	},
	cellHoverCards: [{ colId: 'progress', componentName: 'Tooltip', propsGetter: tooltipPropsGetter }]
};

export default gridProps;
