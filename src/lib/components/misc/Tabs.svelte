<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let tabItems: App.Components.Tabs.TabItem[] = [];
	export let activeTabValue: string = tabItems[0].label;
	export let urlParamName: string | undefined = undefined;

	$: if (activeTabValue && browser) {
		setParam(activeTabValue);
	}

	function setParam(tabValue: string) {
		if (urlParamName) {
			const newURL = new URL($page.url);
			newURL?.searchParams?.set(urlParamName, tabValue);
			goto(newURL, { keepFocus: true, replaceState: true });
		}
	}
</script>

<div class="flex gap-4 items-center border-b-thin overflow-x-scroll no-scrollbar">
	{#each tabItems as item}
		{@const label = item.label}
		<button
			type="button"
			on:click={() => {
				activeTabValue = label;
			}}
			class="flex items-center justify-center text-center min-w-fit gap-2 p-1 border-b text-sm transition-all {activeTabValue ===
			label
				? 'text-brand-primary border-brand-primary'
				: 'text-text-light hover:text-text-primary border-transparent'}"
		>
			{label}
		</button>
	{/each}
</div>
