export function gridDefs(): Grid.Def[] {
	return [
		{
			title: 'Sales Team Performance',
			description: "Monitor your sales team's numbers throughout the month.",
			configFolder: 'sales-team',
			imageUrl:
				'https://res.cloudinary.com/mediacdnmain/image/upload/v1717115200/salesTeam_zuicw1.png'
		},
		{
			title: 'Flight Tracker',
			hidden: true,
			description: 'Monitor a fleet of planes in real time.',
			configFolder: 'flights'
		},
		{
			title: 'GitHub',
			configFolder: 'github'
		},
		{
			title: 'Campaign Pacing',
			description: "Review your advertising campaigns' spend to maintain good pace.",
			configFolder: 'campaign-pacing',
			imageUrl:
				'https://res.cloudinary.com/mediacdnmain/image/upload/v1716350839/campaignPacing_lvp7qs.png'
		},
		{
			title: 'Software Engineering Team Productivity',
			description: "Monitor your software engineering team's productivity.",
			configFolder: 'eng-team',
			serverData: true,
			imageUrl: 'https://res.cloudinary.com/mediacdnmain/image/upload/v1717604913/swe_kdizvh.png'
		},
		{
			title: 'Live Asset Prices',
			description: 'Track live asset prices to help manage your positions.',
			configFolder: 'live-prices',
			imageUrl:
				'https://res.cloudinary.com/mediacdnmain/image/upload/v1717532246/Screen_Shot_2024-06-04_at_1.16.56_PM_ivokbq.png'
		},
		{
			title: 'User Roles',
			description: "View and manage your users' roles to control permissions with high precision.",
			configFolder: 'user-roles',
			imageUrl:
				'https://res.cloudinary.com/mediacdnmain/image/upload/v1716350839/userRoles_xxstq9.png'
		}
	];
}
