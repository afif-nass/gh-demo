<script lang="ts">
	import Button from '$components/misc/Button.svelte';
	import { getConn, getDB } from '$lib/services/duckdb/db';
	import { insertData } from '$lib/services/duckdb/insertData';
	import { runQuery } from '$lib/services/duckdb/queries';
	import * as duckdb from '@duckdb/duckdb-wasm';
	import { IconPlayerPlay } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import Editor from './Editor.svelte';
	import Results from './Results.svelte';
	import { addToast } from '$components/misc/popups/Toaster.svelte';

	export let grid: Grid.Store;

	let db: duckdb.AsyncDuckDB;
	let conn: duckdb.AsyncDuckDBConnection;
	let resultSet: any[];
	let query = 'SELECT * FROM rows';

	const schema = $grid.props.actions?.query?.schema;
	const data = grid.getRows('all');

	function updateGridData(result: any) {
		resultSet = result.toArray();
		// $grid.api?.setGridOption('rowData', result);
	}

	async function execute() {
		if (!conn || !query || !query.length) return;
		try {
			const result = await runQuery(conn, query);
			updateGridData(result);
		} catch (e) {
			addToast({
				data: {
					title: 'Error',
					description: String(e),
					color: 'red'
				}
			});
		}
	}

	onMount(async () => {
		const dbInstance = await getDB();
		if (dbInstance) {
			db = dbInstance;
			conn = await getConn(db);
			insertData(db, conn, data);
		}
	});
</script>

<div class="flex flex-col gap-4 w-full">
	<div class="grid grid-cols-2 w-[20%] *:w-32 *:min-w-20 *:h-8 *:min-h-8">
		<Button
			on:click={execute}
			props={{
				text: {
					default: 'Run query',
					loading: 'Running query...'
				},
				icon: { component: IconPlayerPlay, props: { size: '1.1rem' } },
				style: 'gradient',
				type: 'submit',
				rounded: 'rounded'
			}}
		/>
	</div>
	<div class="flex w-full gap-4 *:h-[200px] *:min-h-[200px]">
		<Editor bind:query />
		<Results bind:resultSet />
	</div>
</div>
