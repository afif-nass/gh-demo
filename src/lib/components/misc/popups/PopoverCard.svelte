<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';

	export let classes = '';
	export let open: boolean = false;
	export let align: 'start' | 'center' | 'end' = 'start';
</script>

<Popover.Root portal={null} bind:open openFocus={false} closeFocus={false}>
	<Popover.Trigger class="rounded">
		<slot name="trigger" />
	</Popover.Trigger>
	<Popover.Content
		{align}
		sideOffset={3}
		class="bg-background flex !min-w-0 w-fit p-1 items-center justify-center popup-border *:focus:outline-none *:focus-visible:ring min-h-[20px] {classes}"
	>
		<slot name="content" />
	</Popover.Content>
</Popover.Root>
