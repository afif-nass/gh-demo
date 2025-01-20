<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let props: Grid.Tooltip.Params;

	let component: ComponentType;
	let computedProps: any;

	$: if (props.componentName) {
		getComponent();
	}

	async function getComponent() {
		computedProps = props.propsGetter(props);
		component = (await import(`../../../components/custom/${props.componentName}.svelte`)).default;
	}
</script>

<div class="fixed bg-background flex w-fit !min-w-0 p-3 items-center popup-border min-h-[20px]">
	{#if component}
		<svelte:component this={component} props={computedProps} />
	{/if}
</div>
