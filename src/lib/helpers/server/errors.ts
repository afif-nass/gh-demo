import type { NumericRange } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

function isClientOrServerError(status: number): status is NumericRange<400, 599> {
	return status >= 400 && status <= 599;
}

export async function checkError(res: Response) {
	if (!res.ok && isClientOrServerError(res.status)) {
		error(res.status);
	}
}
