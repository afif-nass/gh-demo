<script lang="ts">
	import ImageCard from '$components/layout/imageCards/Card.svelte';

	export let cardDefs: App.Components.ImageCardDef[] = [];
	export let id: string = '';
</script>

<div
	class="w-full grid gap-4 grid-cols-[repeat(1fr)] sm:grid-cols-[repeat(auto-fit,390px)] place-content-center"
	{id}
>
	{#each cardDefs as cardDef, i (i)}
		{#if !(cardDef.hidden)}
			<ImageCard {cardDef} />
		{/if}
	{/each}
</div>
