import {
	addMonths,
	subMonths,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	format
} from 'date-fns';

export type EngTeamMemberPerformance = {
	name: string;
	commits: Commits;
	linesOfCode: { added: number; removed: number };
	tickets: { bugs: number; enhancements: number };
	storyPoints: number;
};

export type Commits = {
	date: Date;
	value: number | null;
}[];

export const baseData: EngTeamMemberPerformance[] = [
	{
		name: 'Michael Scott',
		commits: [],
		linesOfCode: { added: 300, removed: 500 },
		tickets: { bugs: 20, enhancements: 5 },
		storyPoints: 110
	},
	{
		name: 'Jim Halpert',
		commits: [],
		linesOfCode: { added: 100, removed: 900 },
		tickets: { bugs: 10, enhancements: 10 },
		storyPoints: 85
	},
	{
		name: 'Dwight Schrute',
		commits: [],
		linesOfCode: { added: 2000, removed: 500 },
		tickets: { bugs: 0, enhancements: 8 },
		storyPoints: 90
	},
	{
		name: 'Pam Beesly',
		commits: [],
		linesOfCode: { added: 1500, removed: 400 },
		tickets: { bugs: 20, enhancements: 5 },
		storyPoints: 100
	},
	{
		name: 'Stanley Hudson',
		commits: [],
		linesOfCode: { added: 400, removed: 5100 },
		tickets: { bugs: 4, enhancements: 5 },
		storyPoints: 110
	},
	{
		name: 'Phyllis Vance',
		commits: [],
		linesOfCode: { added: 600, removed: 500 },
		tickets: { bugs: 15, enhancements: 5 },
		storyPoints: 80
	}
];

const generateCommitData = (members: EngTeamMemberPerformance[]): EngTeamMemberPerformance[] => {
	const now = new Date();
	const threeMonthsAgoStart = startOfMonth(subMonths(now, 3));
	const lastMonthEnd = endOfMonth(subMonths(now, 1));
	const dates = eachDayOfInterval({ start: threeMonthsAgoStart, end: lastMonthEnd });
	return members.map((member) => {
		const commits = dates.map((date) => ({
			date,
			value:
				Math.random() > 0.8 ? Math.floor(Math.random() * 7) + 4 : Math.floor(Math.random() * 3) + 1
		}));
		return { ...member, commits };
	});
};

export const data = generateCommitData(baseData);
