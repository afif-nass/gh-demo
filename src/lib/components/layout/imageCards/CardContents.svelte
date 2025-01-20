<script lang="ts">
	export let cardDef: App.Components.ImageCardDef;
</script>

<div class="flex flex-col w-full bg-background rounded">
	<!-- Image Section -->
	<div class="flex items-center justify-center w-full h-48 bg-background rounded-t">
		{#if cardDef.imageUrl}
			<img
				class="w-full h-full object-contain pointer-events-none"
				src={cardDef.imageUrl ?? ''}
				alt={cardDef.title}
			/>
		{:else if cardDef.component}
			<svelte:component this={cardDef.component} {...{ size: '50%' }} />
		{:else}
			<p class="text-3xl font-semibold tracking-tighter">{cardDef.title}</p>
		{/if}
	</div>

	<!-- Content Section -->
	{#if !cardDef.imageOnly}
		<div class="flex flex-col gap-2 p-4 border-t border-border-light flex-1">
			<p class="font-semibold">{cardDef.title}</p>
			{#if cardDef.description}
				<p class="text-sm">{cardDef.description}</p>
			{/if}
		</div>
	{/if}
</div>
