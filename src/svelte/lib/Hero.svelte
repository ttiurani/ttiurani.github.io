<div class="hero">
    <slot />
</div>

<style>
    .hero {
        max-width: calc(50rem + 20vw);
        margin-bottom: calc(5rem + 2vw);
    }

    @media (min-width: 100rem) {
        .hero {
            margin-bottom: 7rem;
        }
    }
</style>
