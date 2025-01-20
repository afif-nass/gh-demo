<script lang="ts">
	import Table from '$components/misc/Table.svelte';

	export let resultSet: any[];
</script>

{#if resultSet}
	<Table
		headers={Object.keys(resultSet[0])}
		rows={resultSet.map((record) => Object.values(record))}
	/>
{/if}
