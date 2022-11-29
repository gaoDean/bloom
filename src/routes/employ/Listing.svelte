<script>
import '$lib/jobDescription.css';

/* eslint-disable */
export let newListing;
</script>

<form>
	<article>
		<header style="margin-bottom: 2rem">
			<button
				class="secondary outline close"
				on:click={() => (newListing = undefined)}
			/>
			<h3 style="text-align: center; margin-bottom: 0">Create new listing</h3>
		</header>
		<label for="job">
			Job/Position
			<input type="text" placeholder="e.g: Barista" required />
		</label>

		<label for="salary">
			Salary per hour
			<input type="number" placeholder="e.g: 24" />
		</label>

		<div class="grid">
			<label for="start">
				Estimated shift starting time
				<input type="time" placeholder="" />
			</label>
			<label for="end">
				Estimated shift ending time
				<input type="time" placeholder="" />
			</label>
		</div>

		<label for="days">
			Available working days
			<input
				type="text"
				placeholder="Comma delimited e.g: Monday, Friday, Sunday"
			/>
		</label>
		<label for="short">
			Short description about the job
			<textarea
				rows="5"
				placeholder="List format e.g:
- You will do ...
- Requirements are ..."
				maxlength="100"
				required
			/>
		</label>
		<button type="submit" class="button outline">Create</button>
	</article>
</form>

<style>
.close {
	border: none;
	box-shadow: none;
}
</style>
