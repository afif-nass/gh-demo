<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$components/layout/PageHeader.svelte';
	import { getTitleState } from '$src/lib/state/pageTitle';
	import { fade, blur, crossfade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let data: PageData;

	$: pageDef = data.pageDef!;
	$: pageName = pageDef?.label;
	$: title = data.sidebar.title + ' — ' + pageName;
	$: if (title) {
		getTitleState().update((state) => {
			state.title = title;
			return state;
		});
	}
</script>

<div class="flex flex-col gap-6">
	{#key pageName}
		<div in:fade={{ duration: 250, easing: cubicInOut }} class="flex flex-col gap-2">
			<div class="flex items-center gap-2 text-text-primary">
				<svelte:component this={pageDef.icon} {...{ size: '1.8rem' }} />
				<PageHeader title={pageName ?? ''} />
			</div>

			{#if pageDef.description}
				<p class="max-w-prose mt-1">{pageDef.description}</p>
			{/if}
		</div>
	{/key}
	{#if pageDef.component}
		<svelte:component this={pageDef.component} {...{ data }} />
	{/if}
</div>
