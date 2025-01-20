<script lang="ts">
	import { page } from '$app/stores';
	import { type Writable } from 'svelte/store';

	export let site: SiteInfo;
	export let titleState: Writable<App.State.Title>;

	$: pathName = $page.url.pathname;

	let siteName = site.name;
	let mainUrl = site.mainUrl;
	let fullDescription = 'Demos for Custom Grids';
</script>

<svelte:head>
	<title>{$titleState.title}</title>

	<link rel="canonical" href={mainUrl + String(pathName)} />

	<meta name="title" content={siteName} />
	<meta name="description" content={fullDescription} />
	<meta name="theme-color" content={site.themeColor} />

	<meta name="og:site_name" content={siteName} />
	<meta property="og:url" content={mainUrl} />
	<meta property="og:title" content={siteName} />
	<meta property="og:description" content={fullDescription} />
	<meta property="og:image" content={site.previewCard.ogImageUrl} />

	<meta property="twitter:domain" content={new URL(mainUrl).hostname} />
	<meta property="twitter:url" content={mainUrl} />
	<meta name="twitter:title" content={siteName} />
	<meta name="twitter:description" content={fullDescription} />
	<meta name="twitter:image" content={site.previewCard.twitterImageUrl} />
</svelte:head>
