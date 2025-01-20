import * as AG from 'ag-grid-community';
import type { UserRole } from './data';

export function nodeFilter(selectedFilter: string, node: AG.IRowNode<UserRole>) {
	if (!node.data) return true;
	const data = node.data;
	switch (selectedFilter) {
		case 'All':
			return true;
		case 'Admins':
			return data.role === 'admin';
		case 'Managers':
			return data.role.includes('manager');
		default:
			return true;
	}
}

export function displayName(email: string) {
	let names = email.split('.');
	const lastName = names[1].split('@')[0];
	return names[0] + ' ' + lastName;
}
