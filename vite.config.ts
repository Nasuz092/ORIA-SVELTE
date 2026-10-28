import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';

const rawEnv = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const env: Record<string, string> = {};
for (const [k, v] of Object.entries(rawEnv)) {
	env[k.replace(/^\uFEFF/, '').trim()] = v;
}

// Populate Node.js process.env for server-side execution (SSR and API handlers)
for (const [k, v] of Object.entries(env)) {
	if (v) process.env[k] = v;
}

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: isVercel ? adapterVercel() : adapterNode()
		})
	],
	server: {
		port: 5173,
		strictPort: true,
		proxy: {
			'/uploads': {
				target: env.STRAPI_URL || 'http://127.0.0.1:1338',
				changeOrigin: true
			},
			'/api': {
				target: env.STRAPI_URL || 'http://127.0.0.1:1338',
				changeOrigin: true,
				bypass: (req) => {
					if (req.url?.startsWith('/api/img')) {
						return req.url;
					}
				}
			}
		}
	},
	define: {
		'process.env.STRAPI_URL': JSON.stringify(env.STRAPI_URL || 'http://127.0.0.1:1338'),
		'process.env.SITE_URL': JSON.stringify(env.SITE_URL || 'https://oria.co.id'),
		'process.env.WA_NUMBER': JSON.stringify(env.WA_NUMBER || '6281252086455')
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
