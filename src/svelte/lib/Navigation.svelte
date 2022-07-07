<script context="module" lang="ts">
    import Logo from './Logo.svelte';
    import { page } from '$app/stores';
</script>

<div class="nav-wrapper">
    <a href="/" title="tiuraniemi.io">
       <Logo/>
    </a>
    <nav class="main-nav" id="main-nav" aria-label="Main Navigation">
        <ul class="main-nav__list">
            <li id="about" class="main-nav__item" class:active={$page.url.pathname === '/'}>
                <a href="/">About</a>
            </li>
            <li id="work" class="main-nav__item" class:active={$page.url.pathname === '/work'}>
                <a href="/work">Work</a>
            </li>
            <li class="main-nav__item" class:active={$page.url.pathname.startsWith('/blog')}>
                <a href="/blog">Blog</a>
            </li>
        </ul>
    </nav>
</div>

<style>
    .nav-wrapper {
        --column-gap-item: calc(1.1rem + 2vw);
        display: flex;
        align-items: center;
        justify-content: space-between;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 1.5rem;
        margin: 0 auto;
        max-width: 95vw;
    }
    .nav-wrapper a {
        border-bottom: 0;
        color: var(--color-link);
    }
    .nav-wrapper .main-nav__item.active a {
        border-bottom: 2px solid;
    }
    .nav-wrapper .main-nav {
        font-size: calc(0.8rem + 0.4vw);
        line-height: calc(1.0rem + 0.4vw);
        flex: 1;
    }
    .nav-wrapper .main-nav .main-nav__list {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        text-align: right;
    }
    .nav-wrapper .main-nav .main-nav__list .main-nav__item {
        position: relative;
        list-style: none;
    }
    .nav-wrapper .main-nav .main-nav__list .main-nav__item:not(:first-child) {
        margin-left: var(--column-gap-item);
    }
    .nav-wrapper .main-nav .main-nav__list .main-nav__item a {
        display: block;
        text-decoration: none;
        text-transform: uppercase;
    }
    #about {
        display: none;
    }
    #work {
        margin-left: 0;
    }
    @media only screen and (min-width: 25rem) {
        #about {
            display: inherit;
        }
        #work {
            margin-left: var(--column-gap-item);
        }
    }
</style>
