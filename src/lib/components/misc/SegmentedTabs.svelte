<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let options: string[];
	export let selectedOption: string;

	const dispatch = createEventDispatcher<{ selected: string }>();

	function selectOption(option: string) {
		if (selectedOption === option) return;
		selectedOption = option;
		dispatch('selected', option);
	}
</script>

<div
	class="flex items-center bg-muted/70 w-fit p-[2px] overflow-x-auto no-scrollbar border-[thin] border-border-light rounded-[5.5px]"
>
	{#each options as option, i (i)}
		<button
			on:click={() => selectOption(option)}
			class={`px-3 text-sm py-[3px] rounded-[4px] text-text-light min-w-[60px] ${
				selectedOption === option ? 'bg-background shadow text-text-primary transition' : ''
			}`}
		>
			{option}
		</button>
	{/each}
</div>
