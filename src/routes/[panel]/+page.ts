import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ url, parent, params }) => {
	const parentData = await parent();
	const pageDef = parentData.sidebar.pageDefs.find((x) => x.path === parentData.tab);
	if (!pageDef) {
		error(404);
	}
	return {
		pageDef,
		serverData: pageDef.serverDataPath ? await getData(pageDef.serverDataPath) : null
	};
};

async function getData(path: string) {
	const res = await fetch(path);
	return await res.json();
}
