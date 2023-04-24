<script lang="ts">
    type IndexRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    interface AxisDescription {
        text: string;
        index: IndexRange;
    }

    interface Point {
        text: string;
        xIndex: IndexRange;
        yIndex: IndexRange;
    }

    export let yAxisLabel: string;
    export let yAxisDescriptions: AxisDescription[] = [];
    export let xAxisLabel: string;
    export let xAxisDescriptions: AxisDescription[] = [];
    export let points: Point[];
</script>

<figure class="quadrant-chart" style="--widget-size: 100%;">
    <div class="quadrant-chart__y-label">
        <span class="label-text">{yAxisLabel}</span>
    </div>
    <div class="quadrant-chart__y-arrow" />
    <div class="quadrant-chart__sidebar-left">
        {#each yAxisDescriptions as desc}
            <div
                class="quadrant-chart__sidebar-left-label"
                style="grid-row: {desc.index} / span 1;"
            >
                <span class="label-text">{desc.text}</span>
            </div>
        {/each}
    </div>
    <div class="quadrant-chart__content">
        <div class="quadrant-chart__vertical-divider" />
        <div class="quadrant-chart__horizontal-divider" />
        {#each points as point}
            <div
                class="quadrant-chart__point"
                style="grid-column: {point.xIndex} / span 1; grid-row: {point.yIndex} / span 1;"
            >
                <span>{point.text}</span>
            </div>
        {/each}
    </div>
    <div class="quadrant-chart__x-arrow" />
    <div class="quadrant-chart__x-label">
        <span class="label-text">{xAxisLabel}</span>
    </div>
    <div class="quadrant-chart__footer">
        {#each xAxisDescriptions as desc}
            <div
                class="quadrant-chart__footer-label"
                style="grid-column: {desc.index + 2} / span 1;"
            >
                <span class="label-text">{desc.text}</span>
            </div>
        {/each}
    </div>
</figure>

<style>
    :root {
        --left-sidebar-column: minmax(4%, 1em);
        --container-content-cell: minmax(4%, 0.75em);
        --content-cell: minmax(6%, 0.75em);
        --footer-column: minmax(3.5%, 0.55em);
        --footer-row: minmax(4%, 1em);
        --right-label: minmax(4%, 1em);
        --x-label-padding-right: 0.7em;
        --content-point-font-size: calc(0.7rem + 0.5vw);
        --label-font-size: calc(0.6rem + 0.5vw);
    }

    @media (min-width: 25rem) {
        :root {
            --container-content-cell: minmax(4.5%, 0.85em);
            --content-cell: minmax(6%, 0.75em);
            --footer-column: minmax(4.5%, 0.75em);
        }
    }

    @media (min-width: 35rem) {
        :root {
            --container-content-cell: minmax(5%, 1em);
            --content-cell: minmax(6%, 1em);
            --footer-column: minmax(5%, 1em);
            --x-label-padding-right: 0.5em;
            --content-point-font-size: inherit;
            --label-font-size: calc(0.7rem + 0.6vw);
        }
    }

    @media (min-width: 100rem) {
        :root {
            --label-font-size: 1.2rem;
        }
    }

    .label-text {
        font-size: var(--label-font-size);
    }

    .quadrant-chart {
        height: var(--widget-size);
        width: var(--widget-size);
        margin: 0;
        display: grid;
        position: relative;
        grid-template-columns:
            repeat(2, var(--left-sidebar-column)) repeat(16, var(--container-content-cell))
            1px var(--right-label);
        grid-template-rows: minmax(10px, auto) 1px repeat(16, var(--container-content-cell)) var(
                --footer-row
            );
        padding-top: 2em;
        padding-bottom: 2em;
        border-top: 1px dotted;
        border-bottom: 1px dotted;
    }

    .quadrant-chart__y-label {
        grid-column: 2 / span 3;
        grid-row: 1 / span 1;
        line-height: 80%;
        padding-bottom: 0.5em;
    }

    .quadrant-chart__y-arrow {
        grid-column: 3 / span 1;
        grid-row: 2 / span 1;
        box-sizing: border-box;
        position: absolute;
        left: -0.5em;
        display: block;
        transform: scale(var(--ggs, 1));
        width: 22px;
        height: 22px;
    }

    .quadrant-chart__y-arrow::after,
    .quadrant-chart__y-arrow::before {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 4px;
    }

    .quadrant-chart__y-arrow::after {
        width: 0.5em;
        height: 0.5em;
        border-top: 2px solid;
        border-left: 2px solid;
        transform: rotate(45deg);
        left: 0.27em;
    }

    .quadrant-chart__y-arrow::before {
        width: 1px;
        left: 0.5em;
        height: 10px;
        background: currentColor;
    }

    .quadrant-chart__sidebar-left {
        grid-column: 1 / span 2;
        grid-row: 3 / span 16;
        display: grid;
        grid-template-columns: repeat(2, var(--left-sidebar-column));
        grid-template-rows: repeat(16, var(--container-content-cell));
    }

    .quadrant-chart__sidebar-left-label {
        grid-column: 1 / span 2;
        white-space: pre-wrap;
    }

    .quadrant-chart__sidebar-left-label > span {
        writing-mode: vertical-rl;
        transform: scale(-1);
    }

    .quadrant-chart__x-arrow {
        grid-column: 19 / span 1;
        grid-row: 18 / span 1;

        box-sizing: border-box;
        position: absolute;
        display: block;
        transform: scale(var(--ggs, 1));
        border-top: 3px solid transparent;
        border-bottom: 2px solid transparent;
        box-shadow: inset 0 0 0 1px;
        width: 24px;
        height: 6px;
        bottom: -2px;
        left: -1em;
    }

    .quadrant-chart__x-arrow::after {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 0.5em;
        height: 0.5em;
        border-top: 2px solid;
        border-right: 2px solid;
        transform: rotate(45deg);
        right: 0;
        bottom: -0.22em;
    }

    .quadrant-chart__x-label {
        grid-column: 20 / span 1;
        grid-row: 18 / span 2;
        line-height: 80%;
        padding-left: var(--x-label-padding-right);
    }

    .quadrant-chart__footer {
        padding-right: 1em;
        grid-area: footer;
        grid-column: 1 / span 20;
        grid-row: 19 / span 1;
        display: grid;
        grid-template-columns:
            repeat(2, var(--left-sidebar-column)) repeat(16, var(--footer-column))
            1px var(--right-label);
        grid-template-rows: var(--footer-row);
    }

    .quadrant-chart__footer-label {
        grid-row: 1 / span 1;
    }

    .quadrant-chart__content {
        grid-column: 3 / span 16;
        grid-row: 3 / span 16;
        padding: 0;
        position: relative;
        border-bottom: 1px solid;
        border-left: 1px solid;
        display: grid;
        grid-template-columns: repeat(16, var(--content-cell));
        grid-template-rows: repeat(16, var(--content-cell));
    }

    .quadrant-chart__vertical-divider {
        grid-column: 8 / span 1;
        grid-row: 1 / span 16;
        border-right: 1px dashed;
    }

    .quadrant-chart__horizontal-divider {
        grid-column: 1 / span 16;
        grid-row: 8 / span 1;
        border-bottom: 1px dashed;
    }

    .quadrant-chart__point {
        position: relative;
    }

    .quadrant-chart__point:before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .quadrant-chart__point span {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        font-size: var(--content-point-font-size);
    }
</style>
