<script lang="ts">
	export let query = 'SELECT * FROM rows';
</script>

<textarea
	name="query"
	id="query"
	class="w-full p-2 h-40 card-border resize-y max-h-32 text-xs"
	bind:value={query}
/>
