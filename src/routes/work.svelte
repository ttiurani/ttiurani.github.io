<script context="module">
    import { browser, dev } from '$app/env';

    // we don't need any JS on this page, though we'll load
    // it in dev so that we get hot module replacement...
    export const hydrate = dev;

    // ...but if the client-side router is already loaded
    // (i.e. we came here from elsewhere in the app), use it
    export const router = browser;

    // since there's no dynamic data here, we can prerender
    // it so that it gets served as a static asset in prod
    export const prerender = true;
</script>

<svelte:head>
    <title>Work | Timo Tiuraniemi</title>
    <meta name="description" content="Work by Timo Tiuraniemi" />
</svelte:head>

<div class="content">
    <h1>Work</h1>
    <h2>Current</h2>
    <p>Building the digital commons. Protecting the environmental commons. Volunteering full-time to fight for the health our planet and for global social justice.</p>
</div>

<style>
</style>
