<script lang="ts">
    import Navigation from '$lib/Navigation.svelte';
    import SiteInfo from '$lib/SiteInfo.svelte';
    import '../normalize.css';
    import '../app.css';
</script>

<header>
    <Navigation />
</header>

<main>
    <slot />
</main>

<footer>
    <SiteInfo />
</footer>

<style>
    header {
        padding: calc(1.7rem + 1vw) 0 1rem;
    }
    main {
        flex-grow: 1;
        padding-bottom: 8rem;
        max-width: 100rem;
        margin-top: calc(1rem + 2vw);
    }

    @media (min-width: 80rem) {
        main {
            margin-left: calc(0.1rem + 5vw);
        }
    }

    @media (min-width: 100rem) {
        main {
            margin-left: calc(0.3rem + 10vw);
        }
    }

    footer {
        border-top: 1px solid #bfbfbf;
        padding: 1.2rem;
        text-align: center;
    }
    @media (prefers-color-scheme: dark) {
        footer {
            border-top-color: #5f5f5f;
        }
    }
</style>
