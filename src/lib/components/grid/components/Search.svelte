<script lang="ts">
	import Field from '$components/fields/Field.svelte';
	import { getGridState } from '$components/grid/state/grid';

	const grid = getGridState();

	let searchQuery = '';

	$: if ($grid.api) {
		$grid.api.setGridOption('quickFilterText', searchQuery);
	}
</script>

{#if $grid.props?.showSearchBar}
	<div class="w-full max-w-[350px]">
		<Field
			fieldDef={{
				id: 'search',
				name: 'Search',
				hideLabel: true,
				placeholder: `Search within current view`,
				fieldType: 'text'
			}}
			bind:fieldValue={searchQuery}
		/>
	</div>
{/if}
