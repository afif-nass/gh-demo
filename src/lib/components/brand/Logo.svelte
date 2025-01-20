<script lang="ts">
	import { onMount } from 'svelte';

	export let href: string = '/';
	export let standalone = false;

	let link: HTMLAnchorElement;
	let containerStyle = 'flex w-[200px] min-w-[200px] h-[35px] overflow-hidden ';
	if (href.length) {
		containerStyle += ' cursor-pointer';
	} else {
		containerStyle += ' cursor-default';
	}
	if (standalone) {
		containerStyle += ' justify-center';
	}

	onMount(async () => {
		if (!href.length) {
			link.setAttribute('tabIndex', '-1');
		}
	});
</script>

<a bind:this={link} class={containerStyle} {href}>
	<img
		src="/logo.svg"
		alt="logo"
		draggable="false"
		class="object-contain h-full w-fit max-w-full max-h-full"
	/>
</a>
