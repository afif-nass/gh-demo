import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import admin from '$lib/sidepanelPages/admin/sidebar.ts';
import podcast from '$src/lib/sidepanelPages/podcast/sidebar.ts';

export const load: LayoutLoad = async ({ url, params }) => {
	const { panel } = params;
	const sidebar = sidebars[String(params.panel)];
	if (!sidebar) {
		error(404);
	}
	const selectedTab = url.searchParams.get('tab')?.toLowerCase() ?? sidebar.pageDefs[0].path;
	delete sidebars['podcast'];
	return { panel, sidebar, sidebars, tab: selectedTab };
};

const sidebars: Record<string, Sidebar> = {
	admin,
	podcast
};
