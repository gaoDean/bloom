<script lang="ts">
import Navbar from './Navbar.svelte';
import Filters from './Filters.svelte';
import View from './View.svelte';
import { type Jobs } from '$lib/server/dbJobsTypes.ts';
import { filters } from './filters.js';


/** @type {import('./$types').PageData} */
export let data: { post: Jobs };
const jobs: Jobs = data.post;
</script>

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
