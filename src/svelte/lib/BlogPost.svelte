<script context="module" lang="ts">
    import Hero  from '$lib/Hero.svelte';
    import Content  from '$lib/Content.svelte';
</script>
 
<article>
    <Hero>
        <slot name="hero"/>
    </Hero>
    <Content>
        <slot name="content"/>
    </Content>
</article>
