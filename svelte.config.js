import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess(),

    kit: {
        files: {
            assets: 'static',
            hooks: 'src/svelte/hooks',
            lib: 'src/svelte/lib',
            params: 'src/svelte/params',
            routes: 'src/svelte/routes',
            serviceWorker: 'src/svelte/service-worker',
            template: 'src/svelte/app.html',
        },
        adapter: adapter({
            pages: 'dist/html',
            assets: 'dist/html',
            fallback: null,
            precompress: false,
        }),
        vite: {
            server: {
                fs: {
                    // Allow serving files from one level up to the project root
                    allow: ['..'],
                },
            },
        },
    },
};

export default config;
