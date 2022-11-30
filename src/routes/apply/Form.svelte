<script>
import '$lib/jobDescription.css';
</script>

<h2 style="margin-bottom: 1rem">Register your business with Bloom</h2>
<form>
	<label for="name">
		<input type="text" placeholder="Business Name" required />
	</label>
	<label for="abn">
		<input
			type="number"
			placeholder="Australian Business Registration Number"
			required
		/>
		<small>This will be checked with the Australian Business Register</small>
	</label>

	<label for="location">
		<input type="text" placeholder="Business location" required />
	</label>

	<div class="grid">
		<label for="email">
			<input type="email" placeholder="Email address" required />
		</label>

		<label for="contact-other">
			<input type="email" placeholder="Other contact details (optional)" />
		</label>
	</div>

	<label for="description">
		<textarea
			rows="7"
			placeholder="A description of your business to go on the listings"
			maxlength="2000"
			required
		/>
	</label>

	<div class="grid">
		<article>
			<h4>General Plan</h4>
			<p>Price: $40 per month</p>
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
				<li>Number of listings limited to 2</li>
			</ul>
			<button
				type="submit"
				class="button secondary outline"
				style="margin: auto">General</button
			>
		</article>
		<article>
			<h4>Premium Plan</h4>
			<p>Price: $90 per month</p>
			<p>All the benefits of the General Plan, plus a few extra perks:</p>
			<ul>
				<li>Attract users with a company logo</li>
				<li>Unlimited job listings</li>
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
