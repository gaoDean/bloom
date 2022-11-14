<script lang="ts">
import fuzzysort from 'fuzzysort';
import { type Job } from '$lib/dbJobTypes.js';
import '$lib/jobDescription.css';
import { listToArray, formatTime } from '$lib/jobDisplayFunctions.js';
import { type Filter, passesFilters } from './filters.js';

function getDisplayJobs(
	allJobs: Job[],
	filters: Filter[],
	search: string,
): Job[] {
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
	jobBuffer.sort((a: Job, b: Job) =>
		a.updated_at.getTime() < b.updated_at.getTime() ? 1 : -1,
	);

	const results = fuzzysort.go(search, jobBuffer, {
		keys: ['name', 'job', 'salary', 'location'],
		all: true,
		limit: 20,
	});
	for (let i = 0; i < results.length; ++i) {
		results[i] = results[i].obj;
	}
	return results;
}

export let search: string = '';
export let jobs: Job[];
export let selectedJob: Job;
export let filters: Filter[];

$: displayJobs = getDisplayJobs(jobs, filters, search);
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
			<em>From {formatTime(job.from)} to {formatTime(job.to)}</em>
			<br />
			<em>{job.days}</em>
			<br />
			<em>{job.location}</em>
		</p>
		<div class="button-container">
			<button class="button">Apply</button>
			<button
				class="button outline secondary button-info"
				on:click={() => (selectedJob = job)}
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
