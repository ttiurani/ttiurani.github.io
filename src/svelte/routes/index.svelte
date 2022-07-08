<script lang="ts">
    import Hero  from '$lib/Hero.svelte';
    import Content  from '$lib/Content.svelte';
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;

    let layoutWidth: number | undefined;
</script>

<svelte:head>
    <title>Timo Tiuraniemi</title>
    <meta name="description" content="Timo Tiuraniemi" />
</svelte:head>

<section bind:clientWidth={layoutWidth}>

    <Hero>
        <h1>Timo Tiuraniemi</h1>
        <p>
            Husband and father, activist for the commons (digital &amp; environmental), programmer and
            philosopher. He/him.
        </p>
    </Hero>
    <Content>
        <p>
            <iframe
                title="Recent Mastodon toots by Timo Tiuraniemi"
                allowfullscreen
                sandbox="allow-top-navigation allow-scripts"
                width="{!layoutWidth || layoutWidth > 700 ? 700 : layoutWidth}"
                height="800"
                src="https://fedifeed.com/api/v1/feed?user=ttiurani&instance=https%3A%2F%2Ffosstodon.org&instance_type=&theme=masto-dark&size=100&header=false&replies=false&boosts=false"
            />
        </p>
    </Content>
</section>

<style>
</style>
