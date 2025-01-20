import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';

export type UserRole = {
	id: string;
	userEmail: string;
	role: string;
	addedAt: string;
	updatedAt: string;
};

export const data: UserRole[] = [
	{
		id: uuid(),
		userEmail: 'pam.beesly@dundermifflin.com',
		role: 'office-administrator',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'jim.halpert@dundermifflin.com',
		role: 'sales-representative',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'michael.scott@dundermifflin.com',
		role: 'regional-manager',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'michael.scott@dundermifflin.com',
		role: 'admin',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'dwight.schrute@dundermifflin.com',
		role: 'assistant-to-the-regional-manager',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'dwight.schrute@dundermifflin.com',
		role: 'sales-representative',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'ryan.howard@dundermifflin.com',
		role: 'temp',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'angela.martin@dundermifflin.com',
		role: 'accountant',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'oscar.martinez@dundermifflin.com',
		role: 'accountant',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'kevin.malone@dundermifflin.com',
		role: 'accountant',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'toby.flenderson@dundermifflin.com',
		role: 'hr-representative',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'creed.bratton@dundermifflin.com',
		role: 'quality-assurance',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'stanley.hudson@dundermifflin.com',
		role: 'sales-representative',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'phyllis.vance@dundermifflin.com',
		role: 'sales-representative',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'meredith.palmer@dundermifflin.com',
		role: 'supplier-relations',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'andy.bernard@dundermifflin.com',
		role: 'sales-representative',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'kelly.kapoor@dundermifflin.com',
		role: 'customer-service-representative',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'erin.hannon@dundermifflin.com',
		role: 'receptionist',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	},
	{
		id: uuid(),
		userEmail: 'darryl.philbin@dundermifflin.com',
		role: 'warehouse-foreman',
		addedAt: new Date(faker.date.recent()).toISOString(),
		updatedAt: new Date(faker.date.recent()).toISOString()
	}
];
