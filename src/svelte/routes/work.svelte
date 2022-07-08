<script context="module" lang="ts">
    import Hero  from '$lib/Hero.svelte';
    import Content  from '$lib/Content.svelte';
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;
    export const prerender = true;
</script>

<svelte:head>
    <title>Work | Timo Tiuraniemi</title>
    <meta name="description" content="What I'm working on currently" />
</svelte:head>

<section>
    <Hero>
        <h1>Work</h1>
    </Hero>

    <Content>
        <h2>Current</h2>
        <p>
            Building the digital commons. Protecting the environmental commons. Volunteering full-time
            to fight for the health our planet and for global social justice.
        </p>
    </Content>
</section>
