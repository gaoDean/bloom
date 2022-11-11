<script lang="ts">
import { type Job } from '$lib/dbJobsTypes.js';
import { listToArray, formatTime } from '$lib/jobDisplayFunctions.js';
import '$lib/jobDescription.css';

export let selected: Job;
</script>

<dialog open>
	<article>
		<header style="margin-bottom: 2rem">
			<button
				class="secondary outline close"
				on:click={() => (selected = undefined)}
			/>
			<h3 style="margin-bottom: 0; padding-bottom: 1rem;">
				{selected.name}
			</h3>
			<p style="margin-bottom: 0">{selected.job}</p>
		</header>
		<ul>
			{#each listToArray(selected.short) as descLine}
				<li><strong>{descLine.replace(/- /, '')}</strong></li>
			{/each}
		</ul>
		<p>{selected.description}</p>
		<p>
			<em>{selected.location}</em>
			<br />
			<em
				>{selected.days}: from {formatTime(selected.from)} to {formatTime(
					selected.to,
				)}.</em
			>
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
