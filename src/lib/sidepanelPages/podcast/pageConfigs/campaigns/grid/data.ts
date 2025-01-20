import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';

export type Role = {
	id: string;
	name: string;
	description: string;
	addedAt: string;
	expiresAt: string;
	deletedAt: string;
	updatedAt: string;
};

export const data: Role[] = [
	{
		id: uuid(),
		name: 'admin',
		description:
			'Full system access with ability to manage users, roles, and system configurations',
		addedAt: new Date(faker.date.recent()).toISOString(),
		expiresAt: '',
		deletedAt: '',
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		name: 'internal_user',
		description: 'Employee with access to internal systems and data',
		addedAt: new Date(faker.date.recent()).toISOString(),
		expiresAt: '',
		deletedAt: '',
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		name: 'external_user',
		description: 'Client or partner with limited access to specific external-facing systems',
		addedAt: new Date(faker.date.recent()).toISOString(),
		expiresAt: '',
		deletedAt: '',
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		name: 'marketing',
		description: 'Access to marketing tools, analytics, and campaign management systems',
		addedAt: new Date(faker.date.recent()).toISOString(),
		expiresAt: '',
		deletedAt: '',
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		name: 'temp',
		description: 'Temporary contractor',
		addedAt: new Date(faker.date.recent()).toISOString(),
		expiresAt: new Date(faker.date.recent()).toISOString(),
		deletedAt: '',
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		name: 'sales',
		description:
			'Access to CRM, sales tools, and customer data for lead management and sales processes',
		addedAt: new Date(faker.date.recent()).toISOString(),
		expiresAt: '',
		deletedAt: '',
		updatedAt: new Date(faker.date.recent()).toISOString()
	}
];
