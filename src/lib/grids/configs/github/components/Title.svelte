<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let title: string | undefined = undefined;
	export let icon: ComponentType | undefined = undefined;
</script>

<div class="flex items-center gap-1">
	<svelte:component this={icon} {...{ color: '#e9d5ff', size: 18 }} />
	<p
		class="font-sf-pro-rounded-medium text-gradient-base from-purple-50 to-purple-400 font-semibold uppercase tracking-tighter"
	>
		{title}
	</p>
</div>
