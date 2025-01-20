export function currentTime() {
	const now = new Date();
	if (now.getSeconds() >= 30) {
		now.setMinutes(now.getMinutes() + 1);
	}
	now.setSeconds(0);
	return now.toLocaleTimeString('en-GB', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit'
	});
}
