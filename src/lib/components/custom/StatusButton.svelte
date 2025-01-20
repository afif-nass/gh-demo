<script lang="ts">
	import { IconChecks } from '@tabler/icons-svelte';

	export let props: Grid.CustomComponents.StatusButtonProps;

	$: boolean = props.boolean;
	$: text = boolean ? props.text.true : props.text.false;
	$: textColor = boolean ? 'text-white' : 'text-brand-primary';
	$: btnColor = boolean ? 'from-brand-primary to-brand-secondary' : 'border-brand-primary border';

	function updateValue() {
		props.row.setDataValue(props.fieldName, !boolean);
	}
</script>

<button
	class="flex gap-[3px] justify-center items-center {btnColor} px-2 min-w-[90px] h-6 rounded-full bg-gradient-to-r"
	on:click={updateValue}
>
	{#if boolean}
		<IconChecks color="white" size={'1.1em'} class="pointer-events-none" />
	{/if}
	<p class="text-nowrap text-xs select-none {textColor} pointer-events-none">{text}</p>
</button>
