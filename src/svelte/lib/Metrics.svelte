<script context="module" lang="ts">
    import { dayRanges } from '../stores/metrics';
</script>

<section id="metrics">
	{#each $dayRanges as dayRange}
    <div>
        <h2>{dayRange.start} &ndash; {dayRange.end}</h2>
        <ul>
        {#each dayRange.entries as entry}
            <li>{entry.path} {entry.status} {entry.count}</li>
        {/each}
        </ul>
    </div>
    {/each}
</section>

<style>
</style>
