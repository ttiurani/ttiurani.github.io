<script context="module" lang="ts">
    import BlogPost from '$lib/BlogPost.svelte';
    import { browser, dev } from '$app/environment';
    export const hydrate = dev;
    export const router = browser;
</script>

<svelte:head>
    <title>__BLOG_POST_FULL_TITLE__ | Blog | Timo Tiuraniemi</title>
    <meta name="description" content="__BLOG_POST_DESCRIPTION__" />
    <meta property="og:title" content="__BLOG_POST_FULL_TITLE__" />
    <meta property="og:description" content="__BLOG_POST_DESCRIPTION__" />
    <meta property="og:url" content="__BLOG_POST_URL__" />
    <meta property="og:image" content="__BLOG_POST_IMAGE__" />
    <meta property="og:type" content="article" />
</svelte:head>
<BlogPost>
    <svelte:fragment slot="hero">
        <header>
            <h1>__BLOG_POST_TITLE__</h1>
            __BLOG_POST_SUBTITLE_HTML__
            <p class="entry-meta">
                <span>__BLOG_POST_TIME_META__ by Timo Tiuraniemi</span><br />
                <span>Under: __BLOG_POST_KEYWORDS__</span>
            </p>
        </header>
    </svelte:fragment>
    <svelte:fragment slot="content">__BLOG_POST_CONTENT__</svelte:fragment>
</BlogPost>
