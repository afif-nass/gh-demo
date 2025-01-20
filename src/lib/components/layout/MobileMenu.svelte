<script lang="ts">
	import Button from '$components/misc/Button.svelte';
	import { navigating, page } from '$app/stores';
	import { shortcut } from '$src/lib/helpers/app/shortcut';
	import { IconLogin2, IconMail } from '@tabler/icons-svelte';
	import { getMainBtnProps } from '$src/lib/helpers/app/buttonProps';
	import { fly } from 'svelte/transition';

	export let authed = false;
	export let admin = false;
	export let innerWidth: number;
	export let site: SiteInfo;
	export let mobileMenuState: App.State.MobileMenuStore;

	$: btnProps = getMainBtnProps(authed);
	$: if (innerWidth > 640) {
		$mobileMenuState.menuVisible = false;
	}
	$: path = $page.url.pathname;
	$: if ($navigating) {
		hideMenu();
	}

	function hideMenu() {
		mobileMenuState.updateVisibility('menu', false);
	}
</script>

{#if $mobileMenuState.menuVisible}
	<div
		use:shortcut={{
			shortcuts: [
				{
					code: 'Escape',
					callback: hideMenu
				}
			]
		}}
		transition:fly={{ x: 300 }}
		class="fixed z-50 top-[4rem] left-0 right-0 bg-background site-padding pt-8 h-svh flex flex-col"
	>
		<div class="flex flex-col items-start gap-8 w-full max-w-md *:w-full *:text-left">
			<div class="flex flex-col gap-4">
				{#each Object.entries(btnProps) as [type, props]}
					<div class="h-14">
						<Button props={{ ...props, leftAligned: true }} />
					</div>
				{/each}
			</div>
			{#if site.menuLinks}
				<div class="flex flex-col gap-4">
					{#each site.menuLinks as link}
						<a
							class="font-medium text-text-secondary hover:text-text-primary w-fit"
							on:click={hideMenu}
							target={link.newTab ? '_blank' : '_self'}
							href={link.path}>{link.label}</a
						>
					{/each}
				</div>
			{/if}
			{#if site.hasAuth}
				{#if authed}
					{#if admin && path !== '/admin-panel'}
						<a class="underline mt-4" href="/admin-panel">Admin Panel</a>
					{/if}
					<a class="btn !w-full xs:!w-[300px] underline" href="/">Sign out</a>
				{:else}
					<a class="btn !w-full xs:!w-[300px]" href={'/'}><IconLogin2 />Sign in</a>
				{/if}
			{/if}
			{#if site.emails?.contact}
				<p class="mt-8 flex items-center gap-2 font-medium">
					<IconMail />
					{site.emails?.contact}
				</p>
			{/if}
		</div>
	</div>
{/if}
