<script lang="ts">
	import CardContents from './CardContents.svelte';

	export let cardDef: App.Components.ImageCardDef;

	const style = 'flex flex-col bg-background card-border w-full';
</script>

{#if cardDef.url}
	<a class={style} href={cardDef.url}>
		<CardContents {cardDef} />
	</a>
{:else}
	<div class={style}>
		<CardContents {cardDef} />
	</div>
{/if}
