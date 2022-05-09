<script context="module" lang="ts">
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;
    export const prerender = true;
</script>

<svelte:head>
    <title>Blog | Timo Tiuraniemi</title>
    <meta name="description" content="Blog entries by Timo Tiuraniemi" />
</svelte:head>

<div id="blog">
    <h1>Blog</h1>
    <p>
        Normal text and then a <a href="https://www.wikipedia.org/">outside link text</a> for what
        the link is, and then some other text and <a href="/work">internal link</a>.
    </p>
</div>

<style>
</style>
