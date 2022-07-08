<script context="module" lang="ts">
    import BlogPost  from '$lib/BlogPost.svelte';
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;
    export const prerender = true;
</script>

<svelte:head>
    <title>__BLOG_POST_TITLE__ | Blog | Timo Tiuraniemi</title>
    <meta name="description" content="__BLOG_POST_DESCRIPTION__" />
    <meta property="og:title" content="__BLOG_POST_TITLE__" />
    <meta property="og:description" content="__BLOG_POST_DESCRIPTION__" />
    <meta property="og:url" content="__BLOG_POST_URL__" />
    <meta property="og:image" content="__BLOG_POST_IMAGE__" />
    <meta property="og:type" content="article" />
</svelte:head>
<BlogPost>
    <svelte:fragment slot="hero">
       <h1>__BLOG_POST_TITLE__</h1>
    </svelte:fragment>
    <svelte:fragment slot="content">
       __BLOG_POST_CONTENT__
   </svelte:fragment>
</BlogPost>
