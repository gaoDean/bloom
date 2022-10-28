<script lang="ts">
import Navbar from './mod/Navbar.svelte';
import Filters from './mod/Filters.svelte';

console.log('load');
</script>

<Navbar />
{#if window.matchMedia('(max-width: 500)').matches}
	<Filters />
{/if}
<main class="container">
	{#if !window.matchMedia('(max-width: 500)').matches}
		<Filters />
	{/if}
	<h1>test</h1>
</main>

<style>
</style>
