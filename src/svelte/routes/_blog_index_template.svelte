<script context="module" lang="ts">
    import Hero from '$lib/Hero.svelte';
    import Content from '$lib/Content.svelte';
    import { browser, dev } from '$app/environment';
    export const hydrate = dev;
    export const router = browser;
</script>

<svelte:head>
    <title>Blog | Timo Tiuraniemi</title>
    <meta name="description" content="Blog posts by Timo Tiuraniemi" />
</svelte:head>

<section>
    <Hero>
        <h1>Blog</h1>
    </Hero>
    <Content>
        <p>
            Subscribe to the <a href="/feed.atom">blog's RSS (or technically Atom) feed</a> to get notified
            of new posts.
        </p>
        <h2>Latest Posts</h2>
        __BLOG_POST_START__
        <div class="blog-posts-item">
            <p>
                <a href="__BLOG_POST_PATH__"> __BLOG_POST_FULL_TITLE__ </a><br />
                <span class="entry-meta"> __BLOG_POST_TIME_META__ </span><br />
                <span class="entry-meta"> Under: __BLOG_POST_KEYWORDS__ </span>
            </p>
        </div>
        __BLOG_POST_END__
    </Content>
</section>
