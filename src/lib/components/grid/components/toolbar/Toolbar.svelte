<script lang="ts">
	import { getGridState } from '$components/grid/state/grid';
	import Search from '../Search.svelte';
	import ClearFilters from './components/ClearFilters.svelte';
	import BulkUpload from './components/BulkUpload.svelte';
	import Download from './components/Download.svelte';
	import NewRecord from './components/NewRecord.svelte';
	import RowCount from './components/RowCount.svelte';
	import Delete from './components/Delete.svelte';

	const grid = getGridState();
</script>

<div
	class={$grid.props?.showSearchBar
		? 'flex flex-col items-start gap-2'
		: 'flex justify-between gap-2'}
>
	<div class="flex flex-wrap items-end justify-between w-full gap-4">
		<Search />
		<div class="flex gap-4 flex-wrap">
			<ClearFilters />
			<NewRecord />
			<BulkUpload />
			<Download />
			<Delete />
			<RowCount />
		</div>
	</div>
</div>
