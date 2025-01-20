<script lang="ts">
	import { type ComponentType } from 'svelte';

	export let mouse: App.State.MouseStore;
	export let component: ComponentType;
	export let props: Grid.CellHoverCard.State['props'];

	$: leftOffset = $mouse.pos!.x + 10;
	$: topOffset = $mouse.pos!.y + 20;
</script>

<div
	class="fixed bg-background flex w-fit !min-w-0 p-3 items-center popup-border min-h-[20px]"
	style="left: {leftOffset}px; top: {topOffset}px"
>
	<svelte:component this={component} {props} />
</div>
s
