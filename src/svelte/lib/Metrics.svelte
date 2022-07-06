<script context="module" lang="ts">
    import { dayRanges } from '../stores/metrics';
</script>

<section id="metrics">
	{#each $dayRanges as dayRange}
    <div class="day-range">
        <table>
            <caption><h2>{dayRange.start} &ndash; {dayRange.end}</h2></caption>
            <thead>
                <tr>
                    <th>Path</th>
                    <th class="row-status">Status</th>
                    <th class="row-hits">Hits</th>
                </tr>
            </thead>
            <tbody>
            {#each dayRange.entries as entry}
                <tr>
                    <td>{entry.path}</td>
                    <td class="row-status">{entry.status}</td>
                    <td class="row-hits">{entry.count}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
    {/each}
</section>

<style>
    table {
        width: 100%;
        text-align: left;
        max-width: 700px;
    }
    table caption {
        text-align: left;
    }
    table, thead, tbody, tr, td, th {
        border-collapse: collapse;
    }
    thead {
        box-shadow: inset 0 -2px;
    }
    th, td {
        padding: 0.5rem 1rem;
    }
    .day-range {
        padding-bottom: 1rem;
    }
    .row-status {
        width: 4rem;
    }
    .row-hits {
        width: 6rem;
    }
</style>
