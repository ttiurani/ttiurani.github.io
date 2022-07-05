<script context="module" lang="ts">
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;
    export const prerender = true;
</script>

<svelte:head>
    <title>Work | Timo Tiuraniemi</title>
    <meta name="description" content="What I'm working on currently" />
</svelte:head>

<div class="content">
    <h1>Work</h1>
    <h2>Current</h2>
    <p>
        Building the digital commons. Protecting the environmental commons. Volunteering full-time
        to fight for the health our planet and for global social justice.
    </p>
</div>

<style>
</style>
