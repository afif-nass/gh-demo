export type CampaignDelivery = {
	id: string;
	name: string;
	paceIndicator: number;
	flightProgress: number;
	reviewed?: boolean;
	fullDeliveryLikely: boolean;
	recentDelivery: RecentDelivery[];
	actualSpend: number;
	expectedSpend: number;
	flightTargetSpend: number;
	startDate: Date;
	endDate: Date;
};

export type RecentDelivery = {
	date: Date;
	expected: number;
	actual: number;
};

export const data: CampaignDelivery[] = [
	{
		id: '1',
		name: 'Spring Sale Promo',
		paceIndicator: 0.92,
		flightProgress: 0.5,
		fullDeliveryLikely: false,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 500, actual: 350 },
			{ date: new Date('2024-05-12'), expected: 500, actual: 480 },
			{ date: new Date('2024-05-13'), expected: 500, actual: 460 },
			{ date: new Date('2024-05-14'), expected: 500, actual: 370 },
			{ date: new Date('2024-05-15'), expected: 500, actual: 300 },
			{ date: new Date('2024-05-16'), expected: 500, actual: 420 },
			{ date: new Date('2024-05-17'), expected: 500, actual: 510 }
		],
		actualSpend: 2890,
		expectedSpend: 3500,
		flightTargetSpend: 7000,
		startDate: new Date('2024-05-01'),
		endDate: new Date('2024-05-31')
	},
	{
		id: '2',
		name: 'Summer Launch',
		paceIndicator: 1.05,
		flightProgress: 0.75,
		fullDeliveryLikely: true,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 600, actual: 530 },
			{ date: new Date('2024-05-12'), expected: 600, actual: 620 },
			{ date: new Date('2024-05-13'), expected: 600, actual: 540 },
			{ date: new Date('2024-05-14'), expected: 600, actual: 710 },
			{ date: new Date('2024-05-15'), expected: 600, actual: 670 },
			{ date: new Date('2024-05-16'), expected: 600, actual: 630 },
			{ date: new Date('2024-05-17'), expected: 600, actual: 580 }
		],
		actualSpend: 9280,
		expectedSpend: 9000,
		flightTargetSpend: 12000,
		startDate: new Date('2024-04-01'),
		endDate: new Date('2024-05-31')
	},
	{
		id: '3',
		name: 'Fall Collection Teaser',
		paceIndicator: 1.02,
		flightProgress: 0.25,
		fullDeliveryLikely: true,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 300, actual: 310 },
			{ date: new Date('2024-05-12'), expected: 300, actual: 280 },
			{ date: new Date('2024-05-13'), expected: 300, actual: 305 },
			{ date: new Date('2024-05-14'), expected: 300, actual: 325 },
			{ date: new Date('2024-05-15'), expected: 300, actual: 340 },
			{ date: new Date('2024-05-16'), expected: 300, actual: 270 },
			{ date: new Date('2024-05-17'), expected: 300, actual: 300 }
		],
		actualSpend: 2130,
		expectedSpend: 2100,
		flightTargetSpend: 8400,
		startDate: new Date('2024-05-01'),
		endDate: new Date('2024-08-01')
	},
	{
		id: '4',
		name: 'Back to School',
		paceIndicator: 0.88,
		flightProgress: 0.6,
		fullDeliveryLikely: false,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 400, actual: 290 },
			{ date: new Date('2024-05-12'), expected: 400, actual: 360 },
			{ date: new Date('2024-05-13'), expected: 400, actual: 330 },
			{ date: new Date('2024-05-14'), expected: 400, actual: 340 },
			{ date: new Date('2024-05-15'), expected: 400, actual: 355 },
			{ date: new Date('2024-05-16'), expected: 400, actual: 300 },
			{ date: new Date('2024-05-17'), expected: 400, actual: 370 }
		],
		actualSpend: 4045,
		expectedSpend: 4400,
		flightTargetSpend: 7333,
		startDate: new Date('2024-04-15'),
		endDate: new Date('2024-06-15')
	},
	{
		id: '5',
		name: 'Holiday Specials',
		paceIndicator: 1.1,
		flightProgress: 0.4,
		fullDeliveryLikely: true,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 700, actual: 770 },
			{ date: new Date('2024-05-12'), expected: 700, actual: 650 },
			{ date: new Date('2024-05-13'), expected: 700, actual: 750 },
			{ date: new Date('2024-05-14'), expected: 700, actual: 630 },
			{ date: new Date('2024-05-15'), expected: 700, actual: 790 },
			{ date: new Date('2024-05-16'), expected: 700, actual: 810 },
			{ date: new Date('2024-05-17'), expected: 700, actual: 700 }
		],
		actualSpend: 5100,
		expectedSpend: 4600,
		flightTargetSpend: 11500,
		startDate: new Date('2024-05-01'),
		endDate: new Date('2024-06-30')
	},
	{
		id: '6',
		name: 'Winter Sale',
		paceIndicator: 0.95,
		flightProgress: 0.7,
		fullDeliveryLikely: true,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 450, actual: 430 },
			{ date: new Date('2024-05-12'), expected: 450, actual: 410 },
			{ date: new Date('2024-05-13'), expected: 450, actual: 455 },
			{ date: new Date('2024-05-14'), expected: 450, actual: 465 },
			{ date: new Date('2024-05-15'), expected: 450, actual: 440 },
			{ date: new Date('2024-05-16'), expected: 450, actual: 430 },
			{ date: new Date('2024-05-17'), expected: 450, actual: 410 }
		],
		actualSpend: 5990,
		expectedSpend: 6300,
		flightTargetSpend: 9000,
		startDate: new Date('2024-04-01'),
		endDate: new Date('2024-06-01')
	},
	{
		id: '7',
		name: 'New Year Campaign',
		paceIndicator: 1.03,
		flightProgress: 0.55,
		fullDeliveryLikely: true,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 500, actual: 490 },
			{ date: new Date('2024-05-12'), expected: 500, actual: 520 },
			{ date: new Date('2024-05-13'), expected: 500, actual: 515 },
			{ date: new Date('2024-05-14'), expected: 500, actual: 505 },
			{ date: new Date('2024-05-15'), expected: 500, actual: 450 },
			{ date: new Date('2024-05-16'), expected: 500, actual: 510 },
			{ date: new Date('2024-05-17'), expected: 500, actual: 515 }
		],
		actualSpend: 6500,
		expectedSpend: 6400,
		flightTargetSpend: 12000,
		startDate: new Date('2024-04-15'),
		endDate: new Date('2024-06-30')
	},
	{
		id: '8',
		name: 'Black Friday Blitz',
		paceIndicator: 1.15,
		flightProgress: 0.3,
		fullDeliveryLikely: true,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 800, actual: 900 },
			{ date: new Date('2024-05-12'), expected: 800, actual: 700 },
			{ date: new Date('2024-05-13'), expected: 800, actual: 830 },
			{ date: new Date('2024-05-14'), expected: 800, actual: 810 },
			{ date: new Date('2024-05-15'), expected: 800, actual: 820 },
			{ date: new Date('2024-05-16'), expected: 800, actual: 750 },
			{ date: new Date('2024-05-17'), expected: 800, actual: 840 }
		],
		actualSpend: 5650,
		expectedSpend: 5200,
		flightTargetSpend: 19900,
		startDate: new Date('2024-05-01'),
		endDate: new Date('2024-10-01')
	},
	{
		id: '9',
		name: 'Cyber Monday Deals',
		paceIndicator: 0.97,
		flightProgress: 0.65,
		fullDeliveryLikely: true,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 350, actual: 340 },
			{ date: new Date('2024-05-12'), expected: 350, actual: 300 },
			{ date: new Date('2024-05-13'), expected: 350, actual: 360 },
			{ date: new Date('2024-05-14'), expected: 350, actual: 250 },
			{ date: new Date('2024-05-15'), expected: 350, actual: 360 },
			{ date: new Date('2024-05-16'), expected: 350, actual: 340 },
			{ date: new Date('2024-05-17'), expected: 350, actual: 355 }
		],
		actualSpend: 4305,
		expectedSpend: 4700,
		flightTargetSpend: 7000,
		startDate: new Date('2024-04-15'),
		endDate: new Date('2024-06-15')
	},
	{
		id: '10',
		name: 'Q4 Brand Awareness',
		paceIndicator: 0.91,
		flightProgress: 0.35,
		fullDeliveryLikely: false,
		recentDelivery: [
			{ date: new Date('2024-05-11'), expected: 600, actual: 550 },
			{ date: new Date('2024-05-12'), expected: 600, actual: 540 },
			{ date: new Date('2024-05-13'), expected: 600, actual: 560 },
			{ date: new Date('2024-05-14'), expected: 600, actual: 450 },
			{ date: new Date('2024-05-15'), expected: 600, actual: 600 },
			{ date: new Date('2024-05-16'), expected: 600, actual: 530 },
			{ date: new Date('2024-05-17'), expected: 600, actual: 580 }
		],
		actualSpend: 3810,
		expectedSpend: 4200,
		flightTargetSpend: 10900,
		startDate: new Date('2024-05-01'),
		endDate: new Date('2024-09-01')
	}
];
