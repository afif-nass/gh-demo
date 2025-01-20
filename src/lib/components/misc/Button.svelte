<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { site } from '$lib/index';

	export let props: App.Components.Button = {};
	export let loading: boolean = false;
	export function focus() {
		self.focus();
	}

	let self: HTMLAnchorElement | HTMLButtonElement;

	const { text, type, style, rounded, link, location, onClickFunc, leftAligned, icon } = props;
	const padding = getPadding();
	const btnStyle = getStyle();

	function getStyle() {
		const solid = 'border border-brand-primary bg-brand-primary text-white';
		if (!style || style === 'solid') return solid;
		switch (style) {
			case 'danger':
				return 'border border-destructive-primary bg-destructive-primary text-white';
			case 'shadow':
				return 'border border-white shadow bg-background text-text-primary';
			case 'gradient':
				return 'border border-none gradient text-white';
			case 'border':
				return 'border border-brand-primary text-brand-primary';
		}
	}

	function getPadding() {
		if (!location) return 'px-3';
		switch (location) {
			case 'hero':
				return 'px-8';
			case 'nav':
				return 'px-3';
		}
	}

	const styleVars = `flex font-medium min-w-fit h-full gap-[6px] shadow items-center ${btnStyle} ${
		rounded ?? site.btnRadius
	} ${padding} ${leftAligned ? '' : 'justify-center'}`;
</script>

{#if link}
	<a
		class={styleVars}
		href={link.href}
		bind:this={self}
		class:!flex-row-reverse={icon?.rightSide}
		target={link.target ?? '_self'}
		on:click={() => {
			if (onClickFunc) {
				onClickFunc();
			}
			return false;
		}}
	>
		{#if icon}
			<svelte:component this={icon.component} {...icon.props} />
		{/if}
		{text?.default || ''}
	</a>
{:else}
	<button
		class={styleVars + ' disabled:opacity-60 disabled:cursor-wait text-sm hover:brightness-[0.98]'}
		disabled={loading}
		bind:this={self}
		on:click={() => {
			if (onClickFunc) {
				onClickFunc();
			}
			return false;
		}}
		type={type || 'button'}
		class:disabled={loading}
	>
		{#if icon && !loading}
			<svelte:component this={icon.component} {...icon.props} />
		{/if}
		{#if loading}
			<div class="min-w-fit">
				<Circle size={1} unit={'rem'} color={'#FFFFFF'} duration="0.5s" />
			</div>
		{/if}
		{(loading ? text?.loading : text?.default) || ''}
	</button>
{/if}
