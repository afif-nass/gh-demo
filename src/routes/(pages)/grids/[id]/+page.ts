import { gridDefs } from '$src/lib/grids/gridDefs';
import { error } from '@sveltejs/kit';
import { type ComponentType } from 'svelte';

/** @type {import('./$types').PageLoad} */
export async function load({ params, url, fetch, parent }) {
	const gridDef = gridDefs().find((gridDef) => gridDef.configFolder === params.id);
	if (!gridDef) {
		error(404, {
			message: 'Grid not found.'
		});
	}
	const gridProps = await getProps(gridDef.configFolder);
	let gridData;
	if (gridDef.serverData) {
		const res = await fetch('/api/grids/' + gridDef.configFolder);
		gridData = await res.json();
	} else {
		gridData = gridProps.data;
	}
	return { gridDef, gridProps: { ...gridProps, ...{ data: gridData } } };
}

async function getProps(
	configFolder: string
): Promise<Grid.Props | { customDashboardComponent: ComponentType; data: any }> {
	return await (async () => {
		const module = await import(`$lib/grids/configs/${configFolder}/props.ts`);
		if (!module) {
			error(404, {
				message: 'Missing config.'
			});
		}
		return module.default;
	})();
}
