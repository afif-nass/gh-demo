<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/stores';
	import Footer from '$components/layout/Footer.svelte';
	import MobileMenu from '$components/layout/MobileMenu.svelte';
	import Alert from '$components/misc/popups/Alert.svelte';
	import Navbar from '$components/layout/Navbar.svelte';
	import State from '$components/layout/State.svelte';
	import Drawer from '$components/misc/popups/Drawer.svelte';
	import Toaster from '$components/misc/popups/Toaster.svelte';
	import Meta from '$lib/components/brand/Meta.svelte';
	import { site } from '$lib/index';
	import '$src/app.css';
	import { setDrawerState } from '$src/lib/state/drawer';
	import { setMobileMenuState } from '$src/lib/state/mobileMenu';
	import { setMouseState } from '$src/lib/state/mouse';
	import { setTitleState } from '$src/lib/state/pageTitle';
	import { setAlertState } from '$src/lib/state/alert';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';

	const titleState = setTitleState({ title: site.name });
	const mobileMenuState = setMobileMenuState();
	const mouseState = setMouseState();
	const drawerState = setDrawerState({ visible: false });
	const alertState = setAlertState({
		visible: false,
		title: 'Are you sure?',
		description: "This can't be undone."
	});

	let innerWidth = 0;
	let scrollY = 0;
	let authed = true;
	let admin = true;

	beforeNavigate(async ({ willUnload, to }) => {
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<State {site} {titleState} />
<Meta {site} {titleState} />
<svelte:window bind:innerWidth bind:scrollY on:mousemove={mouseState.updatePos} />
<Navbar bind:authed bind:admin bind:scrollY {site} {mobileMenuState} />
<MobileMenu bind:authed bind:admin bind:innerWidth {site} {mobileMenuState} />
<Toaster />
<slot />
<ProgressBar class="text-brand-primary !h-[6px]" zIndex={9999} />
<Alert {alertState} />
<Drawer {drawerState} />
<Footer />
