<script lang="ts">
	import { type RowActionsState } from '$components/grid/state/rowActions';
	import { type Writable } from 'svelte/store';

	export let actionsContext: Writable<RowActionsState>;

	const drawer = $actionsContext.props.context.drawer;
	const visibility = $actionsContext.visibility;

	$: if (!$drawer.visible) {
		$visibility.drawer = false;
	}
</script>

<div class="flex w-full h-full">
	<h1>
		Viewing row with ID: {$actionsContext.props.data['id']}
	</h1>
</div>
