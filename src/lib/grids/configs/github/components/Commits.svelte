<script lang="ts">
	import { IconGitCommit, IconUserCode } from '@tabler/icons-svelte';
	import { twConfig } from '$src/theme';
	import { onMount } from 'svelte';
	import { expoInOut } from 'svelte/easing';
	import { blur, fly } from 'svelte/transition';
	import Stat from './Stat.svelte';
	import Title from './Title.svelte';

	const num = 120000;
	const orgs = ['Mobile', 'Web', 'Infra', 'Data Science'];

	let i = 0;
	let org = orgs[i];
	let devs = generateNewDevs();

	function generateNewDevs() {
		return Array.from({ length: 10 }, (_, i) => ({
			img: 'https://avatars.githubusercontent.com/u/47398601?v=4',
			user: `new-dev`
		}));
	}

	onMount(() => {
		const interval = setInterval(() => {
			devs = generateNewDevs();
			i = (i + 1) % orgs.length;
			org = orgs[i];
		}, 3000);
		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col gap-6 w-full">
	<Stat {num} />
	<div class="flex flex-col gap-3 w-full">
		<div class="flex items-center justify-between w-full">
			<Title title={'Top Devs'} icon={IconUserCode} />
			{#key org}
				<p
					in:blur={{ duration: 500 }}
					class="font-semibold rounded-full w-fit py-[2px] px-3 bg-blue-500/10 text-blue-300 text-xs border-[1px] border-blue-600 uppercase"
				>
					{org}
				</p>
			{/key}
		</div>
		<div class="flex flex-col gap-1 gradient-blur">
			{#each devs as dev, i}
				{#key dev}
					<div
						in:fly={{ y: 150, delay: i * 100, duration: 200, easing: expoInOut }}
						out:blur={{ delay: 0, duration: 50, easing: expoInOut }}
						class="flex items-center justify-between shadow border-[0.25px] border-purple-400/[0.1] h-12 px-4 rounded backdrop-blur-[3px] gap-3"
					>
						<div class="flex items-center gap-1 rounded text-purple-200">
							<p class="text-xs">{i + 1}</p>
							<img class="rounded-full size-6 min-w-6 ml-3 mr-[2px]" src={dev.img} alt="github" />
							<p class="truncate text-inherit">
								{dev.user}
							</p>
						</div>
						<div class="flex items-center min-w-fit">
							<IconGitCommit color={'#d8b4feb3'} />
							<p class="text-purple-300/70">123</p>
						</div>
					</div>
				{/key}
			{/each}
		</div>
	</div>
</div>
