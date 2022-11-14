<script lang="ts">
import Navbar from './Navbar.svelte';
import Filters from './Filters.svelte';
import View from './View.svelte';
import Description from './Description.svelte';
import { type Job } from '$lib/dbJobTypes.ts'; // eslint-disable-line
import { filters as immutableFilters } from './filters.js';

let filters = immutableFilters;

/** @type {import('./$types').PageData} */
export let data: { post: Job[] };

const jobs: Job[] = data.post;
let selectedJob: Job;
</script>

{#if selectedJob}
	<Description bind:selected={selectedJob} />
{/if}
<Navbar />
<main class="container">
	<div class="filter-component-container">
		<Filters bind:filters />
	</div>
	<div class="content">
		<View jobs={jobs} bind:selected={selectedJob} filters={filters} />
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
