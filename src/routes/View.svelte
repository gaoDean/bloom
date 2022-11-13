<script lang="ts">
import { type Job } from '$lib/dbJobsTypes.js';
import '$lib/jobDescription.css';
import { listToArray, formatTime } from '$lib/jobDisplayFunctions.js';
import { type Filter, passesFilters } from './filters.js';

function getDisplayJobs(allJobs: Job[], filters: Filter[]): Job[] {
	const maxIters = 50;
	const jobBuffer: Job[] = [];
	for (let jobIndex = 0; jobIndex < allJobs.length; ++jobIndex) {
		if (jobIndex >= maxIters) {
			break;
		}
		if (passesFilters(allJobs[jobIndex], filters)) {
			jobBuffer.push(allJobs[jobIndex]);
		}
	}
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
			<p style="">{job.job} - ${job.salary} an hour</p>
		</hgroup>
		<ul>
			{#each listToArray(job.short) as descLine}
				<li><strong>{descLine.replace(/- /, '')}</strong></li>
			{/each}
		</ul>
		<p class="long-desc">{job.description}</p>
		<p>
			<em>From {formatTime(job.from)} to {formatTime(job.to)}.</em>
			<br />
			<em>{job.days}</em>
			<br />
			<em>{job.location}</em>
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
