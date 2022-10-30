<script lang="ts">
import Navbar from './Navbar.svelte';
import Filters from './Filters.svelte';
import View from './View.svelte';

/* console.log('load'); */
</script>

<Navbar />
<main class="container">
	<Filters />
	<hr>
	<div class="content">
		<View />
	</div>
</main>

<style>
@media only screen and (min-width: 500) {
	.content {
		padding-right: var(--spacing);
		padding-left: var(--spacing);
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
