<script lang="ts">
import Navbar from './Navbar.svelte';
import Filters from './Filters.svelte';
import View from './View.svelte';

/* console.log('load'); */
</script>

<Navbar />
<main class="container">
	<div class="filter-component-container">
		<Filters />
	</div>
	<hr />
	<div class="content">
		<View />
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

hr {
	margin-top: 2rem;
}
</style>
