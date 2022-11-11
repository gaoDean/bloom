<script lang="ts">
import { type Job } from '$lib/dbJobsTypes.js';
import '$lib/jobDescription.css';
import { selectedJob } from './stores.js';
import { listToArray, formatTime } from '$lib/jobDisplayFunctions.js';
/* import { type Filter } from './filters.js'; */

export let jobs: Job[];
/* export let filters: Filter[]; */
</script>

{#each jobs as job}
	<article>
		<hgroup>
			<h3 style="margin-bottom: 1rem">{job.name}</h3>
			<p style="">{job.job}</p>
		</hgroup>
		<ul>
			{#each listToArray(job.short) as descLine}
				<li><strong>{descLine.replace(/- /, '')}</strong></li>
			{/each}
		</ul>
		<p class="long-desc">{job.description}</p>
		<p>
			<em>{job.location}</em>
			<br />
			<em>{job.days}: from {formatTime(job.from)} to {formatTime(job.to)}.</em>
		</p>
		<div class="button-container">
			<button class="button">Apply</button>
			<button
				class="button outline secondary button-info"
				on:click={() => selectedJob.set(job)}
			>
				Info
			</button>
		</div>
	</article>
{/each}

<style>
.button-container {
	display: flex;
	justify-content: left;
}
.button-info {
	margin-left: 1rem;
}
@media only screen and (max-width: 500px) {
	.long-desc {
		display: none;
	}
}
</style>
