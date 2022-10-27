<script lang="ts">
	import logo from '../assets/bloom.svg';

	const href = 'https://bloomjobs.live';
</script>

<nav class="container-fluid">
	<ul class="logo">
		<li>
			<a href="{href}">
				<img alt="logo" src="{logo}" style="height: 30px" />
			</a>
		</li>

		<li><a href="{href}" class="secondary"><strong>Bloom</strong></a></li>
	</ul>
	<ul style="flex: 1; justify-content: center">
		<li class="search-container">
			<input type="search" id="search" placeholder="Search..." />
		</li>
	</ul>
	<ul class="profile">
		<li>
			<a href="{href}" class="secondary" style="padding: 8px"
				><svg
					height="30px"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					aria-hidden="true"
					focusable="false"
					role="img"
					fill="none"
				>
					<path
						d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
						stroke="currentColor"
						stroke-width="1.3"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
						stroke="currentColor"
						stroke-width="1.3"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
						stroke="currentColor"
						stroke-width="1.3"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
				</svg></a
			>
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
			right: 22px;
		}

		.search-container {
			width: 100%;
			padding-left: 0px;
			padding-right: 0px;
		}

		#search {
			background-image: url(../assets/bloom.svg);
			background-size: 24px auto;
			background-position: center left 0.9rem;
			border-left-color: var(--primary) !important;
			max-width: 100%;
			width: 100%;
			margin: 0 auto;
		}
	}
</style>
