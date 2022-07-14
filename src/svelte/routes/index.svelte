<script lang="ts">
    import Hero from '$lib/Hero.svelte';
    import Content from '$lib/Content.svelte';
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;

    let layoutWidth: number | undefined;
</script>

<svelte:head>
    <title>Timo Tiuraniemi</title>
    <meta name="description" content="Timo Tiuraniemi" />
</svelte:head>

<section bind:clientWidth={layoutWidth}>
    <Hero>
        <div class="hero-row">
            <div id="hero-text" class="hero-column">
                <h1>Hi, I'm Timo</h1>
                <p>
                    I'm a <a
                        href="https://www.opendemocracy.net/en/transformation/husbandry-feminist-reclamation-of-men-s-responsibility-to-care/"
                        >husband and father</a
                    >. My craft is programming, but I have a
                    <a
                        href="https://www.helsinki.fi/en/faculty-arts/research/disciplines/philosophy-history-and-art/philosophy"
                        >background in philosophy</a
                    >.
                </p>
                <p>
                    I'm currently a full-time activist fighting for <a
                        href="https://en.wikipedia.org/wiki/Commons">the commons</a
                    >. I do that by building the digital commons with
                    <a href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
                        >free and open source software</a
                    >, and by protecting the environmental commons with demands for
                    <a href="https://en.wikipedia.org/wiki/Climate_justice">climate justice</a>
                    and <a href="https://degrowth.info">degrowth</a>.
                </p>
                <p>&mdash;</p>
                <p id="contact">
                    Subscribe to the <a href="/feed.atom">Atom feed</a> of
                    <a href="/blog">the blog</a>
                    to get notified of new posts. You're also welcome to
                    <a href="https://fosstodon.org/web/@ttiurani">follow me on Mastodon</a>
                    or reach me <a href="mailto:timo.tiuraniemi@iki.fi">by email</a>.
                </p>
            </div>
            <div id="hero-image" class="hero-column">
                <picture>
                    <source type="image/avif" srcset="/images/profile.avif" />
                    <source type="image/webp" srcset="/images/profile.webp" />
                    <img src="/images/profile.jpg" alt="profile" /></picture
                >
            </div>
        </div>
    </Hero>
    <Content>
        <h2>Latest toots</h2>
        <p>
            <iframe
                title="Recent Mastodon toots by Timo Tiuraniemi"
                allowfullscreen
                sandbox="allow-top-navigation allow-scripts"
                width={!layoutWidth || layoutWidth > 700 ? 700 : layoutWidth}
                height="800"
                src="https://fedifeed.com/api/v1/feed?user=ttiurani&instance=https%3A%2F%2Ffosstodon.org&instance_type=&theme=masto-dark&size=100&header=false&replies=false&boosts=false"
            />
        </p>
    </Content>
</section>

<style>
    #hero-image {
        display: none;
    }
    @media (min-width: 45rem) {
        .hero-row {
            display: flex;
        }
        .hero-column {
            flex: 50%;
        }
        #hero-image {
            display: inherit;
            padding-top: 1em;
            padding-left: calc(1em + 5vw);
        }
    }
</style>
