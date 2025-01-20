
import { site } from '$lib/index';
import { IconVideo } from '@tabler/icons-svelte';

export function getMainBtnProps(authed: boolean) {
	return { cta: getBtnProps(authed, true) };
}

function getBtnProps(authed: boolean, cta: boolean) {
	return cta ? ctaProps(authed) : undefined;
}

function ctaProps(authed: boolean): App.Components.Button {
	return {
		text: { default: String(site?.hero?.cta?.text) },
		style: 'gradient',
		icon: { component: IconVideo, props: { size: '1.3rem', color: '#fff' } },
		link: {
			href: String(
				site.hasAuth ? (authed ? site?.hero?.cta?.path : '/') : site?.hero?.cta?.path
			),
			target: '_blank'
		},
		location: 'nav'
	};
}
