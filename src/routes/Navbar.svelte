<script>
import logo from '$lib/img/logo.svg';
import profile from '$lib/img/profile.svg';

const rootUrl = 'https://bloomjobs.live';

export let search;
</script>

<nav class="container-fluid">
	<ul class="logo">
		<li>
			<a href={rootUrl}>
				<img alt="logo" src={logo} style="height: 30px" />
			</a>
		</li>

		<li><a href={rootUrl} class="secondary"><strong>Bloom</strong></a></li>
	</ul>
	<ul style="flex: 1; justify-content: center">
		<li class="search-container">
			<input
				type="search"
				id="search"
				placeholder="Search..."
				bind:value={search}
			/>
		</li>
	</ul>
	<ul class="profile">
		<li>
			<a href={rootUrl} style="padding: 8px"
				><img
					alt="profile"
					style="content: url({profile}); filter: opacity(0.6)"
				/>
			</a>
		</li>
	</ul>
</nav>

<style>
#search {
	height: calc(
		1rem * var(--line-height) + var(--form-element-spacing-vertical) +
			var(--border-width) * 2
	);
	width: 50vw;
	max-width: 50vw;
	background-position: center left 1rem;
}

@media only screen and (max-width: 500px) {
	nav > .logo {
		display: none;
	}

	nav > .profile {
		margin-top: calc(0.25 * var(--nav-element-spacing-vertical));
		position: absolute;
		right: 21px;
	}

	.search-container {
		width: 100%;
		padding-left: 0px;
		padding-right: 0px;
		padding-bottom: 8px;
	}

	#search {
		background-image: url($lib/img/logo.svg);
		background-size: 24px auto;
		background-position: center left 0.8rem;
		border-left-color: var(--primary) !important;
		max-width: 100%;
		width: 100%;
		margin: 0 auto;
	}
}
</style>
