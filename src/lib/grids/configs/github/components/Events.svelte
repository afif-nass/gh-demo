<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount, type ComponentType } from 'svelte';
	import { flip } from 'svelte/animate';
	import {
		IconGitBranch,
		IconGitFork,
		IconGitMerge,
		IconGitPullRequest
	} from '@tabler/icons-svelte';
	import { twConfig } from '$src/theme';

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

{#if events.length}
	<div class="relative h-full overflow-hidden w-full" class:gradient-blur-y={overflow}>
		<div class="w-1 h-full bg-purple-400/10 rounded-full" />
		{#each Array(1) as _, i (i)}
			<div
				class="absolute top-1/2 -translate-y-1/2 w-full h-full flex flex-col gap-1"
				class:top-[30%]={overflow}
				class:-translate-y-[40%]={overflow}
				animate:flip={{ duration: 700, delay: 0 }}
			>
				{#each events as event, i (event.id)}
					<div
						animate:flip={{ duration: 700, delay: 0 }}
						in:fly={{ duration: 500, y: 500, delay: 0 }}
						class="flex gap-2 w-full items-center"
					>
						<div class="w-1 h-6 bg-purple-400 rounded-full" />
						<div class="flex flex-col gap-4 rounded bg-purple-400/10 p-4 w-full">
							<div class="flex justify-between items-center w-full">
								<div class="flex gap-1 items-center">
									<svelte:component
										this={event.icon}
										{...{ stroke: '2px', color: twConfig.theme.colors.purple[200] }}
									/>
									<p class="truncate text-purple-200">
										{friendlyNames[event.name]}
									</p>
								</div>
								<p class="truncate text-xs {lightTextColor} uppercase tracking-tight">
									{event.repo}
								</p>
							</div>
							<div class="flex items-center justify-between w-full">
								<div class="flex items-center gap-1">
									<img
										class="rounded-full size-4 min-w-4"
										src={'https://avatars.githubusercontent.com/u/47398601?v=4'}
										alt="github"
									/>
									<p class="truncate {lightTextColor} text-sm">
										{event.user} — {event.team}
									</p>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}
