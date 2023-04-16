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
                    y label text
                </div>
                <div class="quadrant-chart__y-arrow"/>
                <div class="quadrant-chart__sidebar-left">
                    left sidebar text
                </div>
                <div class="quadrant-chart__content">
                </div>
                <div class="quadrant-chart__x-arrow"/>
                <div class="quadrant-chart__x-label">
                    x label  text
                </div>
                <div class="quadrant-chart__content-footer">
                    bottom sidebar text
                </div>
            </figure>
        <p>
    </Content>
</section>

<style>
.quadrant-chart {
  height: var(--widget-size);
  width: var(--widget-size);
  margin: 0;
  display: grid;
  grid-template-columns: repeat(17, minmax(10px, auto)) 10px minmax(10px, auto);
  grid-template-rows: minmax(10px, auto) 10px repeat(17, minmax(10px, auto));
}

.quadrant-chart__y-label {
  grid-column: 2 / span 17;
  grid-row: 1 / span 1;
}

.quadrant-chart__y-arrow {
  grid-column: 3 / span 1;
  grid-row: 2 / span 1;
}

.quadrant-chart__y-arrow::before {
  content: '^';
}

.quadrant-chart__sidebar-left {
  grid-column: 1 / span 2;
  grid-row: 3 / span 17;
}

.quadrant-chart__x-arrow {
  grid-column: 3 / span 1;
  grid-row: 2 / span 1;
}

.quadrant-chart__x-arrow {
  grid-column: 19 / span 1;
  grid-row: 18 / span 1;
}

.quadrant-chart__x-arrow::before {
  content: '>';
}

.quadrant-chart__x-label {
  grid-column: 20 / span 1;
  grid-row: 18 / span 2;
}

.quadrant-chart__content-footer {
  padding-right: 1em;
  grid-area: footer;
  grid-column: 3 / span 17;
  grid-row: 19 / span 1;
}
 
/* The content area */
.quadrant-chart__content {
  grid-column: 3 / span 16;
  grid-row: 3 / span 16;
  /* Remove any padding so we have as much space to work with inside the element */
  padding: 0;
  position: relative;
  /* The chart borders */
  border-bottom: 1px solid;
  border-left: 1px solid;
  /* https://css.gg/arrow-up
     https://css.gg/arrow-long-right
   */
}
</style>

