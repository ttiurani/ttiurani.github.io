<script context="module" lang="ts">
    import Hero from '$lib/Hero.svelte';
    import Content from '$lib/Content.svelte';
    import { browser, dev } from '$app/environment';
    export const hydrate = dev;
    export const router = browser;
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
            Building the digital commons. Protecting the environmental commons. Volunteering
            full-time to fight for the health our planet and for global social justice.
        </p>
        <h2>Past</h2>
        <p>20 years of programming.</p>

        <h2>Code Examples</h2>

        <h3>Quadrant chart</h3>
        <p>
            <figure class="quadrant-chart" style="--widget-size: 100%;">
                <div class="quadrant-chart__y-label">
                    <span class="smallish">Conviction required</span>
                </div>
                <div class="quadrant-chart__y-arrow"/>
                <div class="quadrant-chart__sidebar-left">
                    <div class="quadrant-chart__sidebar-left--4">
                        <span class="smallish">Brute optimism</span>
                    </div>
                    <div class="quadrant-chart__sidebar-left--12">
                        <span class="smallish">Grounded optimism</span>
                    </div>
                </div>
                <div class="quadrant-chart__content">
                    <div class="quadrant-chart__vertical-divider"/>
                    <div class="quadrant-chart__horizontal-divider"/>
                    <div class="quadrant-chart__point quadrant-chart__point--3-3"><span>Climate denial</span></div>
                    <div class="quadrant-chart__point quadrant-chart__point--3-6"><span>Climate delay</span></div>
                    <div class="quadrant-chart__point quadrant-chart__point--13-3"><span>Activist burnout</span></div>
                    <div class="quadrant-chart__point quadrant-chart__point--13-15"><span>Climate justice</span></div>
                </div>
                <div class="quadrant-chart__x-arrow"/>
                <div class="quadrant-chart__x-label">
                    <span class="smallish">Effort required</span>
                </div>
                <div class="quadrant-chart__content-footer">
                    <div class="quadrant-chart__content-footer-label quadrant-chart__content-footer-label--4">
                        <span class="smallish">Pacifying optimism</span>
                    </div>
                    <div class="quadrant-chart__content-footer-label quadrant-chart__content-footer-label--12">
                        <span class="smallish">Empowering optimism</span>
                    </div>
                </div>
            </figure>
        <p>
    </Content>
</section>

<style>

:root {
    --left-sidebar-column: minmax(4%, 1em);
    --container-content-cell: minmax(4%, 0.85em);
    --content-cell: minmax(6,2%, 0.85em);
    --footer-column: minmax(6%, 0.85em);
    --footer-row: minmax(4%, 1em);
    --right-label: minmax(4%, 1em);
    --x-label-padding-right: 0.7em;
    --content-point-font-size: calc(0.8rem + 0.5vw);
}
@media (min-width: 35rem) {
    :root {
        --container-content-cell: minmax(5%, 1em);
        --content-cell: minmax(6,2%, 1em);
        --footer-column: minmax(6,2%, 1em);
        --x-label-padding-right: 0.5em;
        --content-point-font-size: inherit;
    }
}

.quadrant-chart {
  height: var(--widget-size);
  width: var(--widget-size);
  margin: 0;
  display: grid;
  position: relative;
  grid-template-columns: repeat(2, var(--left-sidebar-column)) repeat(16, var(--container-content-cell)) 1px var(--right-label);
  grid-template-rows: minmax(10px, auto) 1px repeat(16, var(--container-content-cell)) var(--footer-row);
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
  transform: scale(var(--ggs,1));
  width: 22px;
  height: 22px
}

.quadrant-chart__y-arrow::after,
.quadrant-chart__y-arrow::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: 4px
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
    background: currentColor
}

.quadrant-chart__sidebar-left {
  grid-column: 1 / span 2;
  grid-row: 3 / span 17;
  display: grid;
  grid-template-columns: repeat(2, var(--left-sidebar-column));
  grid-template-rows: repeat(16, var(--container-content-cell)) var(--footer-row);
}

.quadrant-chart__sidebar-left span {
  writing-mode: vertical-rl;
  transform:scale(-1);
}

.quadrant-chart__sidebar-left--4 {
  grid-column: 1 / span 2;
  grid-row: 4 / span 1;
}

.quadrant-chart__sidebar-left--12 {
  grid-column: 1 / span 2;
  grid-row: 12 / span 1;
}

.quadrant-chart__x-arrow {
  grid-column: 19 / span 1;
  grid-row: 18 / span 1;

  box-sizing: border-box;
  position: absolute;
  display: block;
  transform: scale(var(--ggs,1));
  border-top: 3px solid transparent;
  border-bottom: 2px solid transparent;
  box-shadow: inset 0 0 0 1px;
  width: 24px;
  height: 6px;
  bottom: -2px;
  left: -1em;
}

.quadrant-chart__x-arrow::after {
    content: "";
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
  padding-left: var(--x-label-padding-right)
}

.quadrant-chart__content-footer {
  padding-right: 1em;
  grid-area: footer;
  grid-column: 3 / span 16;
  grid-row: 19 / span 1;
  display: grid;
  grid-template-columns: repeat(16, var(--footer-column));
  grid-template-rows: var(--footer-row);
  position: relative;
}

.quadrant-chart__content-footer-label:before {
  content: '';
  display: block;
}

.quadrant-chart__content-footer-label--4 {
  grid-column: 4 / span 1;
  grid-row: 1 / span 1;
}

.quadrant-chart__content-footer-label--12 {
  grid-column: 12 / span 1;
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
  top: 0; left: 0;
  height: 100%;
  width: 100%;
  font-size: var(--content-point-font-size);
}

.quadrant-chart__point--3-3 {
  grid-column: 3 / span 1;
  grid-row: 3 / span 1;
}

.quadrant-chart__point--3-6 {
  grid-column: 3 / span 1;
  grid-row: 6 / span 1;
}

.quadrant-chart__point--13-3 {
  grid-column: 13 / span 1;
  grid-row: 3 / span 1;
}

.quadrant-chart__point--13-15 {
  grid-column: 13 / span 1;
  grid-row: 14 / span 1;
}
</style>

