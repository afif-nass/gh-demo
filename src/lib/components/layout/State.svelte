<script lang="ts">
	import { page } from '$app/stores';
	import { getTitle } from '$src/lib/helpers/app/pageTitles';
	import { type Writable } from 'svelte/store';

	export let site: SiteInfo;
	export let titleState: Writable<App.State.Title>;

	// Handle page title changes
	$: if ($page.url.pathname) {
		const title = getTitle($page);
		if (title) {
			$titleState.title = title;
		} else if (title === null && !$page.error) {
			$titleState.title = site.name;
			$titleState.hidden = true;
		}
	}
</script>
