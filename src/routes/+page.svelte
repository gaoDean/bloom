<script lang="ts">
import Navbar from './Navbar.svelte';
import Filters from './Filters.svelte';
import View from './View.svelte';
import Description from './Description.svelte';
import { type Job } from '$lib/dbJobsTypes.ts'; // eslint-disable-line
import { filters } from './filters.js';
import { selectedJob } from './stores.js';

/** @type {import('./$types').PageData} */
export let data: { post: Job[] };
const jobs: Job[] = data.post;
</script>

{#if $selectedJob}
	<Description />
{/if}
<Navbar />
<main class="container">
	<div class="filter-component-container">
		<Filters filters={filters} />
	</div>
	<div class="content">
		<View jobs={jobs} filters={filters} />
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
