<script lang="ts">
	import { twConfig } from '$src/theme';
	import { IconExternalLink } from '@tabler/icons-svelte';

	export let props: Grid.CustomComponents.ButtonListProps;

	$: buttons = props.buttons;
</script>

<div class="flex flex-col gap-2">
	{#each buttons as btn}
		<a
			class="flex justify-between items-center pl-3 pr-2 py-1 w-[130px] rounded-sm shadow hover:brightness-[.98]"
			style="background-color: {btn.bgColor};"
			href={btn.url}
			target="_blank"
		>
			<div class="flex items-center gap-2">
				<img class="h-4" src={btn.img} alt={btn.text} />
				<p class="font-semibold text-sm" style="color: {btn.textColor}">{btn.text}</p>
			</div>
			<IconExternalLink size={'1.1em'} color={twConfig.theme.colors.text.secondary} />
		</a>
	{/each}
</div>
