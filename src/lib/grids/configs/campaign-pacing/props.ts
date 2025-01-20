import { tooltipPropsGetter } from './componentPropsGetters/cellHover/tooltip';
import { metricCardsPropsGetter } from './componentPropsGetters/cellHover/metricCards';
import { tablePropsGetter } from './componentPropsGetters/cellHover/table';
import { data } from './data';
import { colDefs } from './colDefs';
import { nodeFilter } from './preparedFunctions';
import { rowClassRules } from './rowClassRules';

const gridProps: Grid.Props = {
	colDefs,
	data: addReviewed(data),
	options: {
		rowHeight: 150,
		rowClassRules
	},
	externalFilters: {
		names: ['All', 'On pace', 'Over-pacing', 'Under-pacing'],
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
			{ displayName: 'Remove frequency caps' },
			{ displayName: 'Remove dayparting' },
			{ displayName: 'Open in DSP', url: 'https://www.example.com' },
			{ displayName: 'View Insertion Order', url: 'https://www.example.com' }
		]
	},
	cellHoverCards: [
		{ colId: 'flightProgress', componentName: 'Tooltip', propsGetter: tooltipPropsGetter },
		{ colId: 'paceIndicator', componentName: 'MetricCards', propsGetter: metricCardsPropsGetter },
		{ colId: 'recentDelivery', componentName: 'Table', propsGetter: tablePropsGetter }
	]
};

export default gridProps;

function addReviewed(items: any[]) {
	return items.map((item) => ({
		...item,
		reviewed: Math.random() >= 0.5
	}));
}
