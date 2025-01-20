<script lang="ts">
	import { IconCheck } from '@tabler/icons-svelte';
	import { IconX } from '@tabler/icons-svelte';
	import { twConfig } from '$src/theme';

	export let props: Grid.CustomComponents.BooleanProps;

	const colors = twConfig.theme.colors;

	$: boolean = props.boolean;
	$: trueText = props.text?.true || 'True';
	$: falseText = props.text?.false || 'False';
	$: text = boolean ? trueText : falseText;
	$: theme = {
		primary: boolean ? colors.affirmative.primary : colors.destructive.primary,
		secondary: boolean ? colors.affirmative.light : colors.destructive.light,
		textColor: colors.white
	};

	const iconSize = '0.9rem';
</script>

<div
	class="flex gap-[3px] rounded w-[55px] p-1 justify-center items-center"
	style="background-color: {theme.secondary}; border: 0.5px solid {theme.primary}50"
>
	{#if boolean}
		<IconCheck color={theme.primary} size={iconSize} />
	{:else}
		<IconX color={theme.primary} size={iconSize} />
	{/if}
	<p class="text-nowrap text-xs" style="color: {theme.primary};">{text}</p>
</div>
