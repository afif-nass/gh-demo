<script lang="ts">
	export let headers: string[] = [];
	export let rows: string[][] = [];
</script>

<div class="relative overflow-x-auto w-full">
	<table class="w-full text-xs text-left rounded">
		<thead class="border-border-light">
			<tr>
				{#each headers as header}
					<th scope="col" class="px-3 pb-1 text-text-secondary font-medium">{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="rounded">
			{#each rows as row}
				<tr>
					{#each row as cell}
						<td class="px-3 py-[6px] rounded whitespace-nowrap">{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
