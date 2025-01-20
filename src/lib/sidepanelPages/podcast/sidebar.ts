import Main from './pageConfigs/campaigns/Main.svelte';
import {
	IconSpeakerphone,
	IconLibrary,
	IconUpload,
	IconFileAnalytics,
	IconCircleDashedCheck
} from '@tabler/icons-svelte';

const pageDefs: Sidebar['pageDefs'] = [
	{
		label: 'Campaigns',
		path: 'campaigns',
		component: Main,
		icon: IconSpeakerphone
	},
	{
		label: 'Insertion Orders',
		path: 'insertion-orders',
		icon: IconLibrary
	},
	{
		label: 'Assets',
		path: 'assets',
		icon: IconUpload
	},
	{
		label: 'Reports',
		path: 'reports',
		icon: IconFileAnalytics
	},
	{
		label: 'Approvals',
		path: 'approvals',
		icon: IconCircleDashedCheck
	}
].map((x) => ({ ...x, serverData: false }));

const sidebar: Sidebar = { pageDefs, title: 'Podcast' };

export default sidebar;
