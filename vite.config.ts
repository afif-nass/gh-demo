import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import 'dotenv/config';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: []
	},
	server: {
		proxy: {
			// '/api': {
			// 	target: String(process.env.PUBLIC_API_URL),
			// 	changeOrigin: true,
			// 	rewrite: (path) => path.replace(/^\/api/, '')
			// }
		},
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..']
		}
	}
});
