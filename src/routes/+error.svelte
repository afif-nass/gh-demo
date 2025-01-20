<script lang="ts">
	import { page } from '$app/stores';
	import { getTitleState } from '$src/lib/state/pageTitle';
	import PageWrapper from '$components/layout/PageWrapper.svelte';

	const titleState = getTitleState();

	const fallbackMessage =
		'Something went wrong. Please try refreshing and checking back later. If the issue persists, please contact support.';

	const errorMessages: Record<number, string> = {
		400: 'Bad request.',
		401: 'Authorization required.',
		403: 'Insufficient permission.',
		404: "The page you're looking for was not found.",
		429: "You've sent too many requests recently. Please try again later.",
		500: fallbackMessage
	};

	$: if ($page.status > 399) {
		$titleState.hidden = false;
		$titleState.title = `${$page.status} — Error`;
	}
</script>

<PageWrapper>
	<p class="max-w-prose">
		{$page.error?.message ?? errorMessages[$page.status] ?? fallbackMessage}
	</p>
</PageWrapper>
