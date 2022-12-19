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
    <meta name="description" content="Personal home page of Timo Tiuraniemi" />
</svelte:head>

<section bind:clientWidth={layoutWidth}>
    <Hero>
        <div class="hero-row">
            <div class="hero-column">
                <h1>Timo Tiuraniemi</h1>
            </div>
        </div>
        <div class="hero-row">
            <div id="hero-text" class="hero-column">
                <p>
                    I'm terrified of the accelerating ecocide destroying our planet. Ecocide that's
                    driven by an obsession for economic growth, which in turn relies on the
                    colonization by the Global North over the Global South and the continued
                    commodification of our existence.
                </p>
                <p>At the same time, I see so much potential in everyday people to stop it.</p>
                <p>
                    I recognize that as a Finnish cis white male with marketable skills, I'm one of
                    the most privileged people in the world. I try to take that into account with
                    everything I build and write. I hope I'm able to use my privileges to fight for
                    a world where those privileges don't exist.
                </p>
                <p>
                    I work full-time as an activist for the commons. I stand for protecting and
                    expanding that which has no monetary value, that which resists ranking from
                    better to worse, that which doesn't quite fit into spreadsheets. Clean air,
                    healthy oceans, unowned forests and land. But also knowledge and the digital
                    tools we use.
                </p>
                <p>My craft is programming, and I have a background in philosophy.</p>
                <p>
                    But what I identify with, what I <em>am</em>, is a husband and a father.
                </p>
                <p>&mdash;</p>
                <p id="contact">
                    Subscribe to the <a href="/feed.atom">RSS feed</a> of
                    <a href="/blog">the blog</a>
                    to get notified of new posts. You're also welcome to
                    <a href="https://fosstodon.org/web/@ttiurani" rel="me">follow me on Mastodon</a>
                    or reach me <a href="mailto:timo.tiuraniemi@iki.fi">by email</a>.
                </p>
            </div>
            <div id="hero-image" class="hero-column">
                <picture>
                    <source
                        media="(max-width: 45rem)"
                        type="image/avif"
                        srcset="/images/profile_mobile.avif"
                    />
                    <source
                        media="(max-width: 45rem)"
                        type="image/webp"
                        srcset="/images/profile_mobile.webp"
                    />
                    <source
                        media="(max-width: 45rem)"
                        type="image/jpeg"
                        srcset="/images/profile_mobile.jpg"
                    />
                    <source
                        media="(min-width: 45rem)"
                        type="image/avif"
                        srcset="/images/profile.avif"
                    />
                    <source
                        media="(min-width: 45rem)"
                        type="image/webp"
                        srcset="/images/profile.webp"
                    />
                    <img src="/images/profile.jpg" alt="profile" />
                </picture>
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
    .hero-row {
        display: flex;
        flex-wrap: wrap-reverse;
    }
    #hero-image {
        padding: 0 0 1em 0;
    }
    @media (min-width: 45rem) {
        .hero-row {
            flex-wrap: nowrap;
        }
        .hero-column {
            flex: 50%;
        }
        #hero-image {
            padding: 1em 0 0 calc(1em + 5vw);
        }
    }
</style>
