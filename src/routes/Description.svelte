<script>
import { listToArray, formatTime } from '$lib/jobDisplayFunctions.js';
import '$lib/jobDescription.css';

const getFormattedDate = date =>
	`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

/* eslint-disable */
export let job;
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
			<small class="updated-time"
				>Updated {getFormattedDate(job.updated_at)}</small
			>
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
.updated-time {
	float: right;
}
@media only screen and (max-width: 500px) {
	.updated-time {
		margin-top: 2px;
		display: block;
		float: none;
	}
}
</style>
