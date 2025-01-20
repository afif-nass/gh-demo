import { get } from 'svelte/store';
import { assets } from '../data';

export function connectWebSocket(grid: Grid.Store) {
	const gridAPI = get(grid).api;

	if (!gridAPI) return;

	const assetNames: string[] = assets.map((asset) => asset.id);

	const streams = assetNames.map((asset) => `${asset}@ticker`).join('/');

	let ws = new WebSocket(`wss://fstream.binance.com/ws/${streams}`);

	grid.update((state) => {
		const destroyFuncs = state.props.destroyFuncs ?? [];
		const newDestroyFuncs = [
			...destroyFuncs,
			() => {
				ws.onclose = function () {};
				ws.close();
			}
		];
		state.props.destroyFuncs = Object.assign([], newDestroyFuncs);
		return state;
	});

	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		const asset = data['s'];
		const price = Number(data['c']);
		const delta = Number(data['P']);
		const open = Number(data['o']);
		const high = Number(data['h']);
		const low = Number(data['l']);
		const rowNode = gridAPI?.getRowNode(asset.toLowerCase());
		if (rowNode?.data) {
			const updatedData = { ...rowNode.data, price, delta, open, high, low };
			gridAPI.applyTransaction({
				update: [updatedData]
			});
		}
	};

	ws.onerror = (error) => {
		console.error('Binance WebSocket error:', error);
		ws.close();
	};

	window.onbeforeunload = function () {
		ws.onclose = function () {};
		ws.close();
	};
}
