<script lang="ts">
import { type Job } from '$lib/dbJobTypes.js';
import { listToArray, formatTime } from '$lib/jobDisplayFunctions.js';
import '$lib/jobDescription.css';

function getFormattedDate(date: Date): Date {
	return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}

export let job: Job;
</script>

<dialog open>
	<article>
		<header style="margin-bottom: 2rem">
			<button
				class="secondary outline close"
				on:click={() => (job = undefined)}
			/>
			<h3 style="margin-bottom: 0; padding-bottom: 1rem;">
				{job.name}
			</h3>
			<p style="display: inline">{job.job} - ${job.salary} an hour</p>
			<p style="float: right">Updated {getFormattedDate(job.updated_at)}</p>
		</header>
		<ul>
			{#each listToArray(job.short) as descLine}
				<li><strong>{descLine.replace(/- /, '')}</strong></li>
			{/each}
		</ul>
		<p>{job.description}</p>
		<p>
			<em>From {formatTime(job.from)} to {formatTime(job.to)}</em>
			<br />
			<em>{job.days}</em>
			<br />
			<br />
			<em>{job.location}</em>
		</p>
		<button class="button" style="margin-top: 2rem">Apply</button>
	</article>
</dialog>

<style>
dialog {
	overscroll-behavior: none;
	overflow-y: scroll;
}
dialog > article {
	padding-bottom: 2rem;
}
.close {
	border: none;
	box-shadow: none;
}
</style>
