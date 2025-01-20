<script lang="ts">
	import Globe from '$components/misc/abstract/Globe.svelte';
	import Particles from '$components/misc/abstract/Particles.svelte';
	import PanelContent from './components/PanelContent.svelte';
	import Title from './components/Title.svelte';
	import Commits from './components/Commits.svelte';
	import Events from './components/Events.svelte';
	import GlobeEvents from './components/GlobeEvents.svelte';
	import Contributions from './components/Contributions.svelte';
	import LOC from './components/LOC.svelte';
	import {
		IconGitPullRequest,
		IconBrandGithub,
		IconGitCommit,
		IconCode,
		IconChartBarPopular,
		IconBroadcast
	} from '@tabler/icons-svelte';

	const ghPurple = '#6e5494';
	const panels = {
		top: [
			{
				title: 'Commits',
				component: Commits,
				icon: IconGitCommit
			},
			{
				title: 'Pull Requests',
				component: GlobeEvents,
				icon: IconGitPullRequest
			},
			{
				title: 'Events',
				component: Events,
				icon: IconBroadcast
			}
		],
		bottom: [
			{
				title: 'Lines of Code',
				component: LOC,
				icon: IconCode
			},
			{
				title: 'Contributions',
				component: Contributions,
				icon: IconBrandGithub
			},
			{
				title: 'Analytics',
				component: LOC,
				icon: IconChartBarPopular
			}
		]
	};
</script>

<div
	class="flex relative flex-col gap-1 p-2 bg-gradient-radial to-black from-[#614a83] rounded shadow-2xl h-[850px] w-full"
>
	<div class="absolute origin-center z-[1] w-full h-full">
		<Particles />
	</div>
	{#each Object.entries(panels) as [section, sectionPanels]}
		<div class={'flex z-[2] gap-1 min-h-0 ' + (section === 'top' ? 'basis-[80%]' : 'basis-[20%]')}>
			{#each sectionPanels as panel, i}
				<div
					class="grid min-w-[280px] *:row-start-1 *:col-start-1 p-2 bg-blue-100/[0.02] rounded {section ===
						'top' && i === 1
						? ''
						: 'backdrop-blur-sm'} {section === 'bottom'
						? 'basis-[33.33%]'
						: i === 1
						? 'basis-[75%]'
						: 'basis-[25%]'}"
				>
					{#if section === 'top' && i === 1}
						<div class="self-center justify-self-center">
							<Globe hex={ghPurple} size={500} />
						</div>
						<img
							class="w-10 h-10 justify-self-end animate-pulse"
							src="/misc/github.svg"
							alt="github"
						/>
					{/if}
					<PanelContent title={panel.title} component={panel.component} icon={panel.icon} />
				</div>
			{/each}
		</div>
	{/each}
</div>
