<script lang="ts">
    import Logo from '$lib/Logo.svelte';
    import { page } from '$app/stores';
    import '../normalize.css';
    import '../app.css';
</script>

<header>
    <div class="nav-wrapper">
       <h1 class="logo">
           <a href="/" title="tiuraniemi.io">
               <Logo/>
            </a>
        </h1>
        <nav class="main-nav" id="main-nav" aria-label="Main">
            <ul class="main-nav__list">
                <li id="about" class="main-nav__item" class:active={$page.url.pathname === '/'}>
                    <a href="/">About</a>
                </li>
                <li class="main-nav__item" class:active={$page.url.pathname === '/work'}>
                    <a href="/work">Work</a>
                </li>
                <li class="main-nav__item" class:active={$page.url.pathname.startsWith('/blog')}>
                    <a href="/blog">Blog</a>
                </li>
            </ul>
        </nav>
    </div>
</header>

<main class="main-content">
    <slot />
</main>

<footer>
    <div id="siteinfo">
        tiuraniemi dot io by <a href="https://tiuraniemi.io" rel="cc:attributionURL">Timo Tiuraniemi</a>
        is licensed under a
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/deed.en_US">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
    </div>
</footer>

<style>
    header {
        padding: 2em 0 1em;
    }
    header .nav-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 1.5rem;
        margin: 0 auto;
        max-width: 95vw;
    }
    header .nav-wrapper a {
        border-bottom: 0;
        color: var(--color-link);
    }
    header .nav-wrapper .main-nav__item.active a {
        border-bottom: 2px solid;
    }
    header .nav-wrapper .main-nav {
        flex: 1;
    }
    header .nav-wrapper .main-nav .main-nav__list {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        text-align: right;
    }
    header .nav-wrapper .main-nav .main-nav__list .main-nav__item {
        margin-left: 1.5rem;
        position: relative;
        list-style: none;
    }
    header .nav-wrapper .main-nav .main-nav__list .main-nav__item a {
        font-size: .85em;
        display: block;
        text-decoration: none;
        margin-top: 0.5em;
        text-transform: uppercase;
    }

    .main-content {
        flex-grow: 1;
        padding-bottom: 100px;
        max-width: 1000px;
    }

    footer {
        border-top: 1px solid #bfbfbf;
        padding: 20px;
        text-align: center;
        font-size: 12px;
    }
    @media (prefers-color-scheme: dark) {
        footer {
            border-top-color: #5f5f5f;
        }
    }

    #about {
        display: none;
    }

    @media only screen and (min-width: 450px) {
      #about {
          display: inherit;
      }
    }
</style>
