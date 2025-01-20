import { data } from './data';
import { colDefs } from './colDefs';
import { connectWebSocket } from './binance/websocket';

const gridProps: Grid.Props = {
	colDefs,
	data,
	options: {
		getRowId: (params) => {
			return params.data.id;
		},
		rowHeight: 100
	},
	eventFuncs: {
		onFirstDataRendered: connectWebSocket
	},
	sortParams: {
		state: [{ colId: 'addedAt', sort: 'desc' }],
		defaultState: { sort: null }
	}
};

export default gridProps;
