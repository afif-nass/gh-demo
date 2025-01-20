<script lang="ts">
	import { navigating, page } from '$app/stores';
	import Logo from '$components/brand/Logo.svelte';
	import Button from '$components/misc/Button.svelte';
	import { IconMenu, IconUser, IconX, IconDeviceDesktopAnalytics } from '@tabler/icons-svelte';
	import { fade } from 'svelte/transition';
	import { getMainBtnProps } from '$src/lib/helpers/app/buttonProps';
	import PopoverCard from '$components/misc/popups/PopoverCard.svelte';
	import { goto } from '$app/navigation';

	export let authed = false;
	export let admin = false;
	export let site: SiteInfo;
	export let scrollY: number;
	export let mobileMenuState: App.State.MobileMenuStore;

	let userPopover = false;

	$: btnProps = getMainBtnProps(authed);
	$: path = $page.url.pathname;
	$: navBarColor = $mobileMenuState.menuVisible
		? 'bg-background'
		: scrollY < 20
		? 'bg-transparent'
		: 'bg-background/50 backdrop-blur-md';
	$: if ($navigating) {
		userPopover = false;
	}
</script>

<div class="top-0 w-full {navBarColor} border-b-thin flex items-center justify-center h-16">
	<nav
		class="grid grid-cols-2 showNavLinks:grid-cols-3 items-center h-full site-padding w-full site-max-w *:text-sm"
	>
		<Logo />
		<button
			class="justify-self-end text-text-secondary showNavLinks:hidden"
			name="menu"
			aria-label="menu"
			on:click={() => mobileMenuState.updateVisibility('menu', !$mobileMenuState.menuVisible)}
		>
			{#if $mobileMenuState.menuVisible}
				<div in:fade={{ duration: 300 }}>
					<IconX />
				</div>
			{:else}
				<div in:fade={{ duration: 300 }}>
					<IconMenu />
				</div>
			{/if}
		</button>
		{#if site.menuLinks}
			<div class="hidden showNavLinks:flex items-center gap-3 justify-center">
				{#each site.menuLinks as link}
					<a
						class="font-medium text-text-light hover:text-text-primary hidden"
						target={link.newTab ? '_blank' : '_self'}
						href={link.path}>{link.label}</a
					>
				{/each}
			</div>
		{/if}
		<div class="hidden showNavLinks:flex items-center justify-end h-[60%] gap-3 text-text-primary">
			<!-- {#each Object.entries(btnProps) as [type, props]}
				<Button {props} />
			{/each} -->
			{#if site.hasAuth}
				{#if authed}
					{#if admin && !path.includes('/admin')}
						<a href="/admin"><IconDeviceDesktopAnalytics /></a>
					{/if}
					<PopoverCard bind:open={userPopover}>
						<button slot="trigger" class="flex items-center" tabindex={-1}>
							<IconUser />
						</button>
						<div slot="content" class="flex flex-col w-32 p-2">
							<button class="text-left font-medium" on:click={() => goto('/')}>Log out</button>
						</div>
					</PopoverCard>
				{:else}
					<a href={'/'}>Sign in</a>
				{/if}
			{/if}
		</div>
	</nav>
</div>
