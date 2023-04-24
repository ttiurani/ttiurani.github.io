import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        files: {
            assets: 'static',
            hooks: {
                client: 'src/svelte/hooks.client',
                server: 'src/svelte/hooks.server',
            },
            lib: 'src/svelte/lib',
            params: 'src/svelte/params',
            routes: 'src/svelte/routes',
            serviceWorker: 'src/svelte/service-worker',
            appTemplate: 'src/svelte/app.html',
            errorTemplate: 'src/svelte/error.html',
        },
        adapter: adapter({
            pages: 'dist/html',
            assets: 'dist/html',
            fallback: null,
            precompress: false,
            strict: true,
        }),
    },
};

export default config;
