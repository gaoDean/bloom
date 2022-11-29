<script>
import logo from '$lib/img/logo.svg';
import profile from '$lib/img/profile.svg';

const rootUrl = 'https://bloomjobs.live';
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
.title {
	margin-bottom: 0px;
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

	.title-container {
		width: 100%;
		padding-left: 0px;
		padding-right: 0px;
		padding-bottom: 8px;
	}
}
</style>
