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
    <h1>Posts</h1>

    __BLOG_POST_START__
    <div class="blog-posts-item">
        <a href="__BLOG_POST_PATH__">
            <span>__BLOG_POST_TITLE__</span><br/>
            <span>__BLOG_POST_DATE__</span>
        </a>
    </div>
    __BLOG_POST_END__
</div>

<style>
</style>
