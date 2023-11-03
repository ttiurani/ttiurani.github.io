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
        <h2>Employment</h2>
        <p>
            I work at Greenpeace International as a software engineer. I use my skills as a
            programmer and activist to increase the impact of Greenpeace.
        </p>
        <h2>Open Source</h2>
        <h3>Peermerge</h3>
        <p>
            <b>Description:</b>
            <a href="https://codeberg.org/convivialsoftware/peermerge">Peermerge</a> is a set of rust
            crates for managing peer-to-peer, multi-writer, JSON-like documents.
        </p>
        <p><b>Role:</b> author and maintainer</p>
        <p><b>Status:</b> alpha</p>
        <h3>Hypercore</h3>
        <p>
            <b>Description:</b> <a href="https://github.com/datrs/hypercore">hypercore</a> and
            <a href="https://github.com/datrs/hypercore-protocol-rs">hypercore-protocol</a> are rust
            crates that implement a secure, distributed append-only feed, and a peer-to-peer protocol,
            respectively.
        </p>
        <p><b>Role:</b> co-author and maintainer</p>
        <p><b>Status:</b> beta</p>
        <h3>Random Access Storage</h3>
        <p>
            <b>Description:</b>
            <a href="https://github.com/datrs/random-access-storage">random-access-storage</a>,
            <a href="https://github.com/datrs/random-access-disk">random-access-disk</a>, and ,
            <a href="https://github.com/datrs/random-access-memory">random-access-memory</a> are rust
            crates that implement reading and writing at random offsets to a disk or memory storage.
        </p>
        <p><b>Role:</b> co-author and maintainer</p>
        <p><b>Status:</b> released</p>
        <h3>Compact Encoding</h3>
        <p>
            <b>Description:</b>
            <a href="https://github.com/datrs/compact-encoding">compact-encoding</a> is a rust crate
            for building small and fast parsers and serializers.
        </p>
        <p><b>Role:</b> author and maintainer</p>
        <p><b>Status:</b> released</p>
    </Content>
</section>
