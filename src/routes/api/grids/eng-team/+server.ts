import { json } from '@sveltejs/kit';
import { data } from './data';

export async function GET(event) {
	return json(data);
}
