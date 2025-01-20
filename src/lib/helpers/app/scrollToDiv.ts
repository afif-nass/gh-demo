import { replaceState } from '$app/navigation';

export function scrollToDiv(path: string) {
	try {
		navigator.clipboard.writeText('PUBLIC_BASE_URL' + path);
	} catch {}
	replaceState(path, {});
}
