import { data } from './data';
import { colDefs } from './colDefs';
import Flights from '$lib/components/custom/aboveGrid/flights/Main.svelte';

const gridProps: Grid.Props = {
	colDefs,
	data,
	aboveGridComponent: {
		self: Flights
	},
	options: {
		rowHeight: 150
	}
};

export default gridProps;
