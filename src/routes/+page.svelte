<script lang="ts">
	import Layout from '$components/layout/imageCards/Layout.svelte';
	import PageWrapper from '$components/layout/PageWrapper.svelte';
	import { gridDefs } from '$src/lib/grids/gridDefs';

	const cardDefs = gridDefs().map((item) => ({
		...item,
		url: `/grids/${item.configFolder}`
	}));
</script>

<PageWrapper>
	<Layout {cardDefs} />
</PageWrapper>
