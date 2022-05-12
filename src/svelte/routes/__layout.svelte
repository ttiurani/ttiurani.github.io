<script lang="ts">
    import { page } from '$app/stores';
    import '../normalize.css';
    import '../app.css';
</script>

<header>
    <nav>
        <ul>
            <li class:active={$page.url.pathname === '/'}>
                <a href="/">Home</a>
            </li>
            <li class:active={$page.url.pathname === '/work'}>
                <a href="/work">Work</a>
            </li>
            <li class:active={$page.url.pathname === '/blog'}>
                <a href="/blog">Blog</a>
            </li>
        </ul>
    </nav>
</header>

<main>
    <slot />
</main>

<footer>
    <div id="siteinfo">
        tiuraniemi dot io by <a href="https://tiuraniemi.io" rel="cc:attributionURL"
            >Timo Tiuraniemi</a
        >
        is licensed under a
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/deed.en_US"
            >Creative Commons Attribution-ShareAlike 4.0 International License</a
        >.
    </div>
</footer>

<style>
    footer {
        border-top: 1px solid #bfbfbf;
        padding-top: 10px;
        text-align: center;
        font-size: 12px;
    }
    @media (prefers-color-scheme: dark) {
        footer {
            border-top-color: #5f5f5f;
        }
    }
</style>
