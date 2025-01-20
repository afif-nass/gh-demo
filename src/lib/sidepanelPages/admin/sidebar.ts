import { IconUsers, IconBriefcase, IconUserHexagon } from '@tabler/icons-svelte';
import Roles from './pageConfigs/roles/Main.svelte';
import Users from './pageConfigs/users/Main.svelte';
import UserRoles from './pageConfigs/user-roles/Main.svelte';

const externalLinks: Sidebar['externalLinks'] = [
	{ label: 'Server', path: 'https://docs.render.com/web-services' },
	{ label: 'Database', path: 'https://planetscale.com/' },
	{ label: 'Scripts', path: 'https://docs.render.com/cronjobs' },
	{ label: 'Auth', path: 'https://workos.com/' },
	{ label: 'App Repo', path: 'https://github.com/' },
	{ label: 'Scripts Repo', path: 'https://github.com/' },
	{ label: 'Docs', path: 'https://notion.so/' }
];

const pageDefs: Sidebar['pageDefs'] = [
	{
		label: 'User Roles',
		path: 'user-roles',
		component: UserRoles,
		icon: IconUserHexagon,
		description: 'Manage the roles each user has.'
	},
	{
		label: 'Users',
		path: 'users',
		component: Users,
		icon: IconUsers,
		description: 'Manage users who access the app.'
	},
	{
		label: 'Roles',
		path: 'roles',
		component: Roles,
		icon: IconBriefcase,
		description: 'Manage the roles users can have.'
	}
].map((x) => ({ ...x, serverData: false }));

const sidebar: Sidebar = { pageDefs, externalLinks, title: 'Admin Panel' };

export default sidebar;
