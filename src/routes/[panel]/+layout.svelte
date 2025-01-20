<script lang="ts">
	import { twConfig } from '$src/theme';
	import { IconExternalLink } from '@tabler/icons-svelte';
	import type { LayoutData } from './$types';
	import Select from '$components/fields/components/Select.svelte';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	$: sidebar = data.sidebar;
	$: panelItems = { pageDefs: sidebar.pageDefs, externalLinks: sidebar.externalLinks ?? [] };
	$: selectedPanelField = { label: String(sidebar.title), value: String(data.panel) };
	$: panelFields = Object.entries(data.sidebars).map(([route, sidebar]) => ({
		value: route,
		label: sidebar.title
	}));

	const brandColor = twConfig.theme.colors.brand.primary;
	const primaryTextColor = twConfig.theme.colors.text.primary;
</script>

<div class="flex w-full site-max-w site-padding">
	<aside
		class="flex self-start gap-5 sticky top-0 flex-col overflow-y-auto overflow-x-clip min-w-[190px] pr-3"
	>
		<div class="pt-6 pb-3">
			{#if panelFields.length > 1}
				{#key selectedPanelField}
					<Select
						defaultSelected={selectedPanelField}
						on:selected={(e) => {
							goto('/' + e.detail['value'], { replaceState: true });
						}}
						options={panelFields}
					/>
				{/key}
			{:else}
				<p class="text-text-light uppercase font-medium text-xs tracking-tight pl-3">
					{data.sidebar.title}
				</p>
			{/if}
		</div>
		{#each Object.entries(panelItems) as [label, items]}
			{@const pageDefs = label === 'pageDefs'}
			<div>
				{#each items as item, i}
					{@const selected = data.tab === item.path}
					<a
						class="text-xs transition-opacity duration-200 px-3 w-full h-[35px] flex items-center font-medium tracking-tight rounded {selected
							? '*:text-brand-primary bg-brand-primaryLight '
							: ''} gap-2 {pageDefs ? '' : 'justify-between flex-row-reverse'} "
						class:hover:bg-muted={!selected}
						href={pageDefs ? `/${data.panel}?tab=${item.path}` : item.path}
						target={pageDefs ? '_self' : '_blank'}
					>
						<div class="min-w-fit">
							<svelte:component
								this={'icon' in item ? item.icon : IconExternalLink}
								{...{
									size: '1rem',
									stroke: '2px',
									color: selected ? brandColor : primaryTextColor
								}}
							/>
						</div>
						<p class="truncate">{item.label}</p>
					</a>
				{/each}
			</div>
		{/each}
	</aside>
	<main class="flex flex-col pl-6 pr-0 pb-24 pt-3 w-full border-l-thin min-h-[600px]">
		<slot />
	</main>
</div>
