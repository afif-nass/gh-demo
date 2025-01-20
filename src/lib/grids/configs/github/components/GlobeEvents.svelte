<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import {
		IconGitBranch,
		IconGitFork,
		IconGitMerge,
		IconGitPullRequest
	} from '@tabler/icons-svelte';
	import type { ComponentType } from 'ag-grid-community';
	import Stat from './Stat.svelte';

	const icons: Record<string, any> = {
		branch: IconGitBranch,
		fork: IconGitFork,
		merge: IconGitMerge,
		pullRequest: IconGitPullRequest
	};

	const friendlyNames: Record<string, any> = {
		branch: 'New branch created',
		fork: 'Repo forked',
		merge: 'Branch merged',
		pullRequest: 'Pull request created'
	};

	type Event = {
		name: string;
		user: string;
		repo: string;
		icon: ComponentType;
		team: string;
		id: number;
	};

	const maxEvents = 6;
	const fakeUsers = ['JohnDoe', 'JaneSmith', 'BobBrown', 'AliceGreen', 'CharlieBlue'];
	const fakeRepos = ['project-x', 'alpha', 'beta', 'omega', 'gamma'];
	const fakeTeams = ['Mobile', 'Web', 'Infra', 'Data Science'];
	const lightTextColor = 'text-purple-300/70';

	let events: Event[] = [];
	let eventCounter = 0;

	$: overflow = events.length > maxEvents;

	function getRandomItem(array: string[]): string {
		return array[Math.floor(Math.random() * array.length)];
	}

	function generateEvent(): Event {
		const eventName = Object.keys(icons)[Math.floor(Math.random() * Object.keys(icons).length)];
		return {
			name: eventName,
			user: getRandomItem(fakeUsers),
			repo: getRandomItem(fakeRepos),
			icon: icons[eventName],
			team: getRandomItem(fakeTeams),
			id: eventCounter++
		};
	}

	function addEvent() {
		const newEvent = generateEvent();
		if (overflow) {
			events = [...events.slice(1), newEvent];
		} else {
			events = [...events, newEvent];
		}
	}

	onMount(() => {
		const interval = setInterval(() => {
			addEvent();
		}, 1000);
		return () => clearInterval(interval);
	});
</script>

<Stat num={122323} />
