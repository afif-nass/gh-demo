<script lang="ts">
	export let props: Grid.CustomComponents.UserProps;

	$: imageURL = props.imageURL;
	$: primaryText = props.text.primary;
	$: secondaryText = props.text.secondary;

	let image: HTMLImageElement;

	function imgFallback() {
		image.onerror = null;
		image.src = '/misc/user.svg';
	}
</script>

<div class="flex items-center gap-3">
	<img
		class="w-12 h-12 object-top rounded-[50%] border-[2px] border-brand-primary flex-shrink-0 bg-muted"
		alt="User profile"
		loading="eager"
		src={imageURL || '/misc/user.svg'}
		bind:this={image}
		on:error={imgFallback}
	/>
	<div class="flex flex-col">
		<p class="truncate font-medium capitalize">{primaryText}</p>
		{#if secondaryText}
			<p class="truncate text-text-secondary">{secondaryText}</p>
		{/if}
	</div>
</div>
