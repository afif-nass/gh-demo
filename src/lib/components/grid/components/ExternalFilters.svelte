<script lang="ts">
	import RadioPills from '$components/misc/SegmentedTabs.svelte';
	import { type ComponentEvents } from 'svelte';
	import { getGridState } from '$components/grid/state/grid';

	const grid = getGridState();
	const initial = $grid.props?.externalFilters?.initial || '';
	const filters = $grid.props?.externalFilters?.names || [];

	$grid.props!.externalFilters!.current = initial;

	function applyFilter(event: ComponentEvents<RadioPills>['selected']) {
		$grid.props!.externalFilters!.current = event.detail;
		$grid.api!.onFilterChanged();
	}
</script>

<RadioPills on:selected={applyFilter} options={filters} selectedOption={initial} />
