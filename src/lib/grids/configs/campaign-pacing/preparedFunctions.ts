import * as AG from 'ag-grid-community';
import type { CampaignDelivery } from './data';

export function getPace(metric: number): string {
	if (metric >= 0.95 && metric <= 1.05) {
		return 'On pace';
	} else if (metric > 1.03) {
		return 'Over-pacing';
	} else {
		return 'Under-pacing';
	}
}

export function nodeFilter(selectedFilter: string, node: AG.IRowNode<CampaignDelivery>): boolean {
	if (!node.data) return true;

	const data = node.data;
	const pace = getPace(data.paceIndicator);

	switch (selectedFilter) {
		case 'All':
			return true;
		case 'On pace':
		case 'Over-pacing':
		case 'Under-pacing':
			return pace === selectedFilter;
		default:
			return false;
	}
}
