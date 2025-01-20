<script lang="ts">
	export let props: Grid.CustomComponents.ImageProps;

	$: imageURL = props.imageURL;

	let image: HTMLImageElement;

	function imgFallback() {
		image.onerror = null;
		image.src = '/misc/user.svg';
	}
</script>

<img
	class="w-24 h-24 object-top rounded-[50%] border-4 border-brand-primary flex-shrink-0 bg-muted"
	alt="User profile"
	loading="eager"
	src={imageURL || '/misc/user.svg'}
	bind:this={image}
	on:error={imgFallback}
/>
