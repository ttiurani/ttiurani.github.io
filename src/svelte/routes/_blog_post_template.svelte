<script context="module" lang="ts">
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;
    export const prerender = true;
</script>

<svelte:head>
    <title>__BLOG_POST_TITLE__ | Blog | Timo Tiuraniemi</title>
    <meta name="description" content="'__BLOG_POST_TITLE__' by Timo Tiuraniemi" />
</svelte:head>

<div id="post">__BLOG_POST_CONTENT__</div>

<style>
</style>
