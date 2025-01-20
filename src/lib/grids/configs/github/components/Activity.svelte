<script lang="ts">
	import type { ComponentType } from 'svelte';
	import Title from './Title.svelte';

	export let title: string | undefined = undefined;
	export let icon: ComponentType | undefined = undefined;
	export let component: ComponentType;
</script>

<div class="flex flex-col gap-1 w-full min-h-0 overflow-clip">
	{#if title}
		<div class="flex items-center gap-1">
			<svelte:component this={icon} {...{ color: '#e9d5ff', size: 16 }} />
			<Title {title} />
		</div>
	{/if}
	<svelte:component this={component} />
</div>
