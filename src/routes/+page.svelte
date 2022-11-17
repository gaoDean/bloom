<script>
import Navbar from './Navbar.svelte';
import Filters from './Filters.svelte';
import View from './View.svelte';
import Description from './Description.svelte';
import { filters as immutableFilters } from './filters.js';

let filters = immutableFilters; // eslint-disable-line

/* eslint-disable */
let selectedJob;
let search;

export let data;

const jobs = data.post;
</script>

{#if selectedJob}
	<Description bind:job={selectedJob} />
{/if}
<Navbar bind:search />
<main class="container">
	<div class="filter-component-container">
		<Filters bind:filters />
	</div>
	<div class="content">
		<View {search} {jobs} bind:selectedJob {filters} />
	</div>
</main>

<style>
@media only screen and (max-width: 500px) {
	.content {
		padding-right: var(--spacing);
		padding-left: var(--spacing);
	}

	.filter-component-container {
		/* padding from the left of the filters, needs compensation*/
		padding-left: calc(var(--spacing) - 4px);
		padding-right: var(--spacing);
	}
}

.container {
	margin-top: 0px;
	padding-top: 0px;
	padding-left: 0px;
	padding-right: 0px;
}
</style>
