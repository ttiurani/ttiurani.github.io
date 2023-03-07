<script lang="ts">
    import Metrics from '$lib/Metrics.svelte';
</script>

<svelte:head>
    <title>Site Statistics | Timo Tiuraniemi</title>
    <meta name="description" content="Site Statistics" />
</svelte:head>

<div class="content">
    <h1>Statistics</h1>
    <p>Below are statistics about HTTP GET responses from the past 30 days.</p>

    <Metrics />
</div>

<style>
</style>
