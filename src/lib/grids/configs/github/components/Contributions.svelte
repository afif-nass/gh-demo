<script lang="ts">
	import HeatCalendar from '$components/custom/HeatCalendar.svelte';

	async function getData() {
		const res = await fetch('/api/grids/eng-team');
		const data = await res.json();
		const user = data[0];
		const x = user['commits'];
		return x;
	}
</script>

<div class="flex h-full w-full justify-center gradient-blur">
	{#await getData() then data}
		{#each Array(2) as _}
			<HeatCalendar props={{ data }} />
		{/each}
	{/await}
</div>
