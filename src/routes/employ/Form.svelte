<script>
import '$lib/jobDescription.css';
</script>

<form>
	<article>
		<h1 style="text-align: center">Job Listing</h1>
		<label for="name">
			Business name
			<input type="text" placeholder="Name" required />
		</label>

		<label for="job">
			Job
			<input type="text" placeholder="Working position" required />
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

		<label for="abn">
			Business Registration Number
			<input type="number" placeholder="Australian Business Number" required />
			<small>This will be checked with the Australian Business Register</small>
		</label>

		<label for="location">
			Location
			<input type="text" placeholder="Business location" required />
		</label>

		<div class="grid">
			<label for="email">
				Email address
				<input type="email" placeholder="Email address" required />
			</label>

			<label for="contact-other">
				Other contact details (optional)
				<input type="email" placeholder="Contacts" />
			</label>
		</div>

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

		<label for="description">
			Full description of your business and the job
			<textarea
				rows="7"
				placeholder="Any format e.g:
At xyz, we do ..."
				maxlength="2000"
				required
			/>
		</label>
	</article>

	<div class="grid">
		<article>
			<h4>General Plan</h4>
			<ul>
				<li>Advertise specific positions</li>
				<li>Your job listing will display:</li>
				<ul>
					<li>Job/position</li>
					<li>Business name</li>
					<li>Business location</li>
					<li>A short description of the job</li>
					<li>A full description of your business and the job</li>
					<li>A way to apply</li>
				</ul>
				<li>Reports of viewers and viewing time</li>
				<li>Will appear in user job recommendations</li>
			</ul>
			<button
				type="submit"
				class="button secondary outline"
				style="margin: auto">General</button
			>
		</article>
		<article>
			<h4>Premium Plan</h4>
			<p>All the benefits of the General Plan, plus a few extra perks:</p>
			<ul>
				<li>Attract users with a company logo</li>
				<li>Priority listings on search results</li>
				<li>Reports of viewers and viewing time</li>
				<li>Will appear in user job recommendations</li>
			</ul>
			<button
				type="submit"
				class="button outline"
				style="margin: auto; margin-top: 2rem">Premium</button
			>
		</article>
	</div>
</form>
