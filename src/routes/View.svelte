<script lang="ts">
export let jobs;
export let filters;

function listToArray(list: string): string[] {
	return list.split(/\r?\n/).filter(element => element);
}

</script>

{#each jobs as job}
	<article>
		<h3>{job.name}</h3>
		<ul>
		{#each listToArray(job.short) as descLine}
			<li><b>{descLine.replace(/- /, '')}</b></li>
		{/each}
		</ul>
		<p class="long-desc">{job.description}</p>
		<button class="apply">
			Apply
		</button>
	</article>
{/each}

<style>
.apply {
	max-width: 10rem;
	height: 2rem;
	border-radius: 1rem;
	padding-top: 0;
	padding-bottom: 0;
}
@media only screen and (max-width: 500px) {
	.long-desc {
		display: none;
	}
}
</style>
