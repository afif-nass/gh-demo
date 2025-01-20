import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import { preprocessMeltUI, sequence } from '@melt-ui/pp';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sequence([preprocess(), preprocessMeltUI()]),
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x'
		}),
		alias: {
			$components: 'src/lib/components',
			$src: 'src'
		}
	}
};

export default config;
