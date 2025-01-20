import * as AG from 'ag-grid-community';
import type { SalesTeamMemberPerformance } from './data';

export function nodeFilter(
	selectedFilter: string,
	node: AG.IRowNode<SalesTeamMemberPerformance>
): boolean {
	if (!node.data || selectedFilter === 'All') return true;

	const data = node.data;

	return selectedFilter === data['region'];
}
