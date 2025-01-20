import type { Page } from '@sveltejs/kit';
import { site } from '$lib/index';

export const customTitleResources = ['[id]'];
export const staticTitles: Record<string, string> = {};
const ignorePaths = ['/(pages)/grids/[id]', '/[panel]'];

// Return undefined if the title will be set by the page
// Return null to not display a title
export function getTitle(page: Page): string | null | undefined {
	try {
		const { pathname } = page.url;
		const routeId = page.route.id;
		const routeIdString = String(page.route.id);
		// Home page
		if (pathname === '/') {
			return siteName;
		}
		// Title will be set by the page
		if (ignorePaths.includes(routeIdString)) {
			return undefined;
		}

		const resourceTypeName = getResourceTypeName(pathname);
		const isCustom = customTitleResources.includes(resourceTypeName);
		const hasId = routeId?.includes('/[id]');
		const staticTitle = staticTitles[routeIdString];

		if (staticTitle) {
			return staticTitle;
		}

		// Generic title for resources without custom titles
		if (hasId && !isCustom) {
			return generateFriendlyResourceName(pathname) ?? siteName;
		}
		// Custom-title resources
		if (hasId && isCustom) {
			return undefined;
		}
	} catch {
		return siteName;
	}
	return null;
}

// Extracts the resource type name from the path
export function getResourceTypeName(path: string): string {
	return path.split('/')[1];
}

// Friendly names mapping for resource types
const resourceTypeFriendlyNames: Record<string, string> = {};

// Generates a friendly name for the resource based on the path
function generateFriendlyResourceName(path: string): string {
	const resourceFriendlyName = formatNameFromDashes(path);
	return `${resourceTypeFriendlyNames[getResourceTypeName(path)]} — ${resourceFriendlyName}`;
}

// Converts dashed paths to friendly names
function formatNameFromDashes(path: string): string {
	return path
		.split('/')
		.pop()!
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

// Site name constant
const siteName = site.name;
