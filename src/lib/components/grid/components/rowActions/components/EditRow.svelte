<script lang="ts">
	import { getRowActionsState } from '$components/grid/state/rowActions';
	import { IconEdit } from '@tabler/icons-svelte';
	import { updateRow } from '$components/grid/operations/mutations/updateRow';

	const ctx = getRowActionsState();
	const grid = $ctx.props.context.grid as Grid.Store;
</script>

<button class="action-btn" on:click={() => updateRow($ctx.props.data, grid)}>
	<IconEdit size="1rem" class="pointer-events-none" />
</button>
