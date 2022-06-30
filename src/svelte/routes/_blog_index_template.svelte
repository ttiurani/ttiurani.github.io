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
    <p>Subscribe to the <a href="/feed.atom">blog's Atom feed</a> to get notified of new posts.</p>
    <h2>Latest Posts</h2>
    __BLOG_POST_START__
    <div class="blog-posts-item">
        <a href="__BLOG_POST_PATH__">
            <span>__BLOG_POST_TITLE__</span><br />
            <span>__BLOG_POST_DATE__</span>
        </a>
    </div>
    __BLOG_POST_END__
</div>

<style>
</style>
