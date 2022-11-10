<script lang="ts">
import { type Job } from '$lib/dbJobsTypes.js';
import { type Filter } from './filters.js';

export let jobs: Job[];
/* export let filters: Filter[]; */

function listToArray(list: string): string[] {
	return list.split(/\r?\n/).filter(element => element);
}

function formatTime(hms: string): string {
	const time: number[] = hms.split(':') as number[];
	const d = new Date();
	d.setHours(time[0]);
	d.setMinutes(time[1]);
	d.setSeconds(time[2]);
	return d.toLocaleTimeString('en-US');
}

let selectedJob: Job;
// $: console.log(selectedJob);
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
			<em>{job.days}; from {formatTime(job.from)} to {formatTime(job.to)}.</em>
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
{#if selectedJob}
	<dialog open>
		<article>
			<header style="margin-bottom: 2rem">
				<button
					class="secondary outline close"
					on:click={() => (selectedJob = undefined)}
				/>
				<h3 style="margin-bottom: 0; padding-bottom: 1rem;">
					{selectedJob.name}
				</h3>
				<p style="margin-bottom: 0">{selectedJob.job}</p>
			</header>
			<ul>
				{#each listToArray(selectedJob.short) as descLine}
					<li><strong>{descLine.replace(/- /, '')}</strong></li>
				{/each}
			</ul>
			<p>{selectedJob.description}</p>
			<p>
				<em>{selectedJob.location}</em>
				<br />
				<em
					>{selectedJob.days}; from {formatTime(selectedJob.from)} to {formatTime(
						selectedJob.to,
					)}.</em
				>
			</p>
			<button class="button" style="margin-top: 2rem">Apply</button>
		</article>
	</dialog>
{/if}

<style>
dialog > article {
	padding-bottom: 2rem;
}
.button-container {
	display: flex;
	justify-content: left;
}
.button {
	flex: auto;
	max-width: 10rem;
	height: 2rem;
	border-radius: 1rem;
	padding-top: 0;
	padding-bottom: 0;
}
.button-info {
	margin-left: 1rem;
}

.close {
	border: none;
	box-shadow: none;
}
@media only screen and (max-width: 500px) {
	.long-desc {
		display: none;
	}
}
</style>
