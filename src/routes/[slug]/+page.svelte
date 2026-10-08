<script lang="ts">
	import type { Component } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let Content = $derived(data.Content as Component);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<div class="prose mx-auto px-4 py-16">
	<h1>{data.meta.title}</h1>
	<Content />
	<a href="/">&larr; Back home</a>
</div>
