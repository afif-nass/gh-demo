<script lang="ts">
	import { page } from '$app/stores';
	import { getTitleState } from '$src/lib/state/pageTitle';
	import PageHeader from '$components/layout/PageHeader.svelte';

	const titleState = getTitleState();
</script>

<div class="page-wrapper site-padding site-max-w">
	{#if $page.url.pathname !== '/' && !$titleState.hidden}
		<PageHeader title={$titleState.title}/>
	{/if}
	<slot />
</div>
