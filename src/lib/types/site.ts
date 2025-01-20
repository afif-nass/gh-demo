import type { ComponentType } from 'svelte';

declare global {
	type SiteInfo = {
		name: string;
		mainUrl: string;
		hasAuth?: boolean;
		themeColor: string;
		btnRadius: '' | 'rounded-sm' | 'rounded-md' | 'rounded-full' | 'rounded';
		hero?: HeroSection;
		previewCard: PreviewCard;
		menuLinks?: { label: string; path: string; newTab?: boolean }[];
		emails?: Emails;
		footer?: {
			linkCategories?: {
				resources?: Link[];
				about?: Link[];
			};
			legal?: Link[];
			showSupportEmail?: boolean;
			showContactEmail?: boolean;
		};
	};
	type Sidebar = {
		title: string;
		pageDefs: {
			label: string;
			path: string;
			icon: ComponentType;
			description?: string;
			serverDataPath?: string;
			component?: ComponentType;
		}[];
		externalLinks?: {
			label: string;
			path: string;
		}[];
	};
}

export {};

type HeroSection = {
	topLine?: string;
	bottomLine?: string;
	description?: string;
	cta?: {
		text: string;
		path: string;
	};
	secondary?: {
		text: string;
		path: string;
	};
};
type Link = {
	label: string;
	path: string;
};
type Emails = {
	support?: string;
	contact?: string;
};
type PreviewCard = {
	twitterImageUrl: string;
	ogImageUrl: string;
};
