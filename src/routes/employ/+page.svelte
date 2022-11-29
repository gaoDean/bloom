<script>
import Navbar from './Navbar.svelte';
import Listing from './Listing.svelte';

let newListing = false;
</script>

<Navbar />
<main class="container">
	<p style="text-align: center; margin-bottom: 0px">
		One job listing left! Upgrade to the <em>Premium</em> plan to have unlimited
		listings!
	</p>
	<button
		class="button outline"
		style="margin: auto; margin-top: 1rem; max-width: 50%;"
		on:click={() => (newListing = true)}>Create new listing</button
	>
	{#if newListing}
		<dialog open>
			<Listing bind:newListing />
		</dialog>
	{/if}
	<article>
		<hgroup>
			<h3 style="display: inline; margin-bottom: 8px">Barista</h3>
			<p>8 applications</p>
		</hgroup>
		<p>Views: 56</p>
		<p>Interacts: 19</p>
		<div class="button-container">
			<button class="button">View applications</button>
			<button class="button outline secondary button-info">
				Preview listing
			</button>
		</div>
	</article>
	<article>
		<hgroup>
			<h3 style="display: inline; margin-bottom: 8px">Cashier</h3>
			<p>3 applications</p>
		</hgroup>
		<p>Views: 82</p>
		<p>Interacts: 11</p>
		<div class="button-container">
			<button class="button">View applications</button>
			<button class="button outline secondary button-info">
				Preview listing
			</button>
		</div>
	</article>
	<hr />
	<h2 style="margin-bottom: 1rem; text-align: center">Your plan</h2>
	<div class="grid">
		<article style="opacity: 0.6">
			<h4>General Plan (Currently on)</h4>
			<p>Price: $80 per month</p>
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
			<p>Price: $180 per month</p>
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
</main>

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
.button-container {
	display: flex;
	justify-content: left;
}
.button-info {
	margin-left: 1rem;
}
@media only screen and (max-width: 500px) {
	ul > li {
		font-weight: var(--font-weight);
	}
	hgroup > h3 {
		font-size: 1.25rem;
	}
}
</style>
