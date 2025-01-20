export type SalesTeamMemberPerformance = {
	name: string;
	target: number;
	sales: number;
	progress: number;
	opportunities: { inProgress: number; won: number; lost: number };
	region: 'South' | 'West' | 'Midwest' | 'Northeast';
	hiredAt: Date;
	conversionRate: number;
};

export const data: SalesTeamMemberPerformance[] = [
	{
		name: 'Michael Scott',
		target: 50000,
		sales: 47000,
		progress: 94,
		opportunities: { inProgress: 70, won: 40, lost: 10 },
		region: 'Northeast',
		hiredAt: new Date('2005-04-01'),
		conversionRate: 33.33
	},
	{
		name: 'Jim Halpert',
		target: 60000,
		sales: 58000,
		progress: 96.67,
		opportunities: { inProgress: 80, won: 45, lost: 5 },
		region: 'West',
		hiredAt: new Date('2004-02-15'),
		conversionRate: 34.62
	},
	{
		name: 'Dwight Schrute',
		target: 70000,
		sales: 69000,
		progress: 98.57,
		opportunities: { inProgress: 75, won: 50, lost: 15 },
		region: 'Midwest',
		hiredAt: new Date('2003-06-10'),
		conversionRate: 35.71
	},
	{
		name: 'Pam Beesly',
		target: 55000,
		sales: 53000,
		progress: 96.36,
		opportunities: { inProgress: 73, won: 42, lost: 10 },
		region: 'South',
		hiredAt: new Date('2005-07-01'),
		conversionRate: 33.6
	},
	{
		name: 'Stanley Hudson',
		target: 45000,
		sales: 42000,
		progress: 93.33,
		opportunities: { inProgress: 68, won: 38, lost: 9 },
		region: 'Northeast',
		hiredAt: new Date('2001-09-23'),
		conversionRate: 33.04
	},
	{
		name: 'Phyllis Vance',
		target: 48000,
		sales: 45000,
		progress: 93.75,
		opportunities: { inProgress: 68, won: 39, lost: 11 },
		region: 'West',
		hiredAt: new Date('2002-05-20'),
		conversionRate: 33.05
	}
];
