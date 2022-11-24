<script>
import fuzzysort from 'fuzzysort';
import '$lib/jobDescription.css';
import { listToArray, formatTime } from '$lib/jobDisplayFunctions.js';
import { passesFilters } from './filters.js';
import { map, filter, sort, pipe } from './functional.js';

const fzsort = (search, sortOptions) => functor =>
	fuzzysort.go(search, functor, sortOptions);
const getTimeWeight = (t1, t2) =>
	1000 * (5 - (t1.getTime() - t2.getTime()) / (1000 * 60 * 60 * 24));
const getScore = (weights, currentTime, updatedTime) => (max, val, index) => {
	const weightedScore =
		(val ? val.score : -Infinity) +
		weights[index] +
		getTimeWeight(currentTime, updatedTime);
	return weightedScore > max ? weightedScore : max;
};
const getDisplayJobs = (jobs, filters, search, sortOptions) =>
	pipe(
		jobs,
		filter(x => passesFilters(x, filters)),
		sort((a, b) => (a.updated_at.getTime() < b.updated_at.getTime() ? 1 : -1)),
		fzsort(search, sortOptions),
		map(x => x.obj),
	);

const keyWeightPairs = {
	name: 20000,
	job: 25000,
	location: 3000,
	short: 500,
	description: 100,
};

const fzSortOptions = {
	keys: Object.keys(keyWeightPairs),
	all: true,
	limit: 20,
	scoreFn: a =>
		a.reduce(
			getScore(Object.values(keyWeightPairs), new Date(), a.obj.updated_at),
		),
};

/* eslint-disable */
export let search = '';
export let jobs;
export let selectedJob;
export let filters;

let displayJobs;
$: displayJobs = getDisplayJobs(jobs, filters, search, fzSortOptions);
</script>

{#each displayJobs as job}
	<article>
		<hgroup>
			{#if job.verified}
				<span class="verified" />
			{/if}
			<h3 style="display: inline; margin-bottom: 8px">{job.name}</h3>
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
.verified {
	background: var(--primary);
	background-image: var(--icon-checkbox);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 70%;
	border-radius: 50%;
	vertical-align: -3px;
	margin-right: 2px;
	display: inline-block;
	height: 20px;
	width: 20px;
}
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
