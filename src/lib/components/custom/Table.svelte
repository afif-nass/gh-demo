<script lang="ts">
	import Table from '$lib/components/misc/Table.svelte';

	export let props: Grid.CustomComponents.TableProps;

	$: rows = props.rows;
	$: headers = props.headers;
</script>

<Table {headers} {rows} />
