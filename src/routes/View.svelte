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
	const curDate = new Date();

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

	function getScore(a: object, weights: number[]): number {
		const msInDay = 1000 * 60 * 60 * 24;
		const daysOld = 5;
		let max = -Infinity;
		for (let i = 0; i < weights.length; ++i) {
			if (a[i]) {
				const msDiff = curDate.getTime() - a.obj.updated_at.getTime();
				a[i].score += weights[i];
				a[i].score += 1000 * (daysOld - msDiff / msInDay);
				max = a[i].score > max ? a[i].score : max;
			}
		}
		return max;
	}

	const keyWeightPairs = {
		name: 20000,
		job: 10000,
		location: 3000,
		short: 500,
		description: 100,
	};

	const sortOptions = {
		keys: Object.keys(keyWeightPairs),
		all: true,
		limit: 20,
		scoreFn: a => getScore(a, Object.values(keyWeightPairs)),
	};

	const results: object = fuzzysort.go(search, jobBuffer, sortOptions);
	for (let i = 0; i < results.length; ++i) {
		results[i] = results[i].obj;
	}
	return results;
}

export let search: string = '';
export let jobs: Job[];
export let selectedJob: Job = undefined; // eslint-disable-line
export let filters: Filter[];

$: displayJobs = getDisplayJobs(jobs, filters, search);
</script>

{#each displayJobs as job}
	<article>
		<hgroup>
			<h3 style="margin-bottom: 8px">{job.name}</h3>
			<p>{job.job} - ${job.salary} an hour</p>
		</hgroup>
		<ul>
			{#each listToArray(job.short) as descLine}
				<li>{descLine.replace(/- /, '')}</li>
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
article {
	padding-top: 1.2rem;
	padding-bottom: 1rem;
}
article > hgroup {
	margin-bottom: 1rem;
}
hgroup > p {
	margin-bottom: 0px;
}
article > ul {
	margin-bottom: 1rem;
}
ul > li {
	font-weight: bolder;
}
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
	ul > li {
		font-weight: var(--font-weight);
	}
	hgroup > h3 {
		font-size: 1.25rem;
	}
}
</style>
