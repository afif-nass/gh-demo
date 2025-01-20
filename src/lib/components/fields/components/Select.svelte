<script lang="ts">
	import { IconCheck, IconChevronDown } from '@tabler/icons-svelte';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let options: { label: string; value: string }[];
	export let defaultSelected: { label: string; value: string } | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	const dispatch = createEventDispatcher();
	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open, selected },
		helpers: { isSelected }
	} = createSelect<string>({
		defaultSelected,
		forceVisible: true,
		preventScroll: false,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});

	$: if ($selected?.value) {
		dispatch('selected', $selected);
	}
</script>

<div class="flex flex-col gap-1">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<!-- <label class="block text-magnum-900" use:melt={$label}>Favorite Flavor</label> -->
	<button
		class="flex w-full items-center justify-between px-3
	text-text-light font-medium uppercase tracking-tight text-xs transition-opacity hover:text-text-primary"
		use:melt={$trigger}
		aria-label="Option"
	>
		{$selectedLabel ?? placeholder ?? 'Select an option'}
		<div class="transition-all transform" class:rotate-180={$open}>
			<IconChevronDown size="1rem" />
		</div>
	</button>
	{#if $open}
		<div
			class="z-10 flex max-h-[300px] flex-col overflow-y-auto bg-background popup-border w-full focus:!ring-0 p-1"
			use:melt={$menu}
			transition:fade={{ duration: 50 }}
		>
			{#each options as o}
				<div
					class="flex text-text-primary items-center justify-between text-xs cursor-pointer rounded p-3 py-2 hover:bg-muted focus:z-10
focus:text-text-primary
				data-[highlighted]:bg-muted
				data-[disabled]:opacity-50"
					use:melt={$option({ value: o.value, label: o.label })}
				>
					{o.label}
					{#if $isSelected(o.value)}
						<IconCheck size="1rem" />
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
