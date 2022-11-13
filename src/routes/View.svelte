<script lang="ts">
import { type Job } from '$lib/dbJobsTypes.js';
import '$lib/jobDescription.css';
import { listToArray, formatTime } from '$lib/jobDisplayFunctions.js';
import { type Filter, passesFilters} from './filters.js';

function getDisplayJobs(allJobs: Job[], filters: Filter[]): Job[] {
	let jobBuffer: Job[] = [];
	for (const job of allJobs) {
		if (passesFilters(job, filters)) {
			jobBuffer.push(job);
		}
	}
	console.log(jobBuffer);
	return jobBuffer;
}

export let jobs: Job[];
export let selected: Job;
export let filters: Filter[];

$: displayJobs = getDisplayJobs(jobs, filters);
</script>

{#each displayJobs as job}
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
				on:click={() => (selected = job)}
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
