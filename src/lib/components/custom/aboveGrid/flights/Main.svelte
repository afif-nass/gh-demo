<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Plane from './Plane.svelte';
	import { writable } from 'svelte/store';

	const components = [Plane];

	let store = writable({ mounted: false });

	setContext('main', store);

	onMount(() => {
		$store.mounted = true;
	});
</script>

<div class="flex items-center justify-between gap-4 w-full h-[500px]">
	{#each components as component}
		<div class="shadow-md rounded w-full h-full">
			<svelte:component this={component} />
		</div>
	{/each}
	<div class="w-full" />
	<div class="w-full" />
</div>
