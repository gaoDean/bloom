<script lang="ts">
	import { filters } from './filter-data.js';
</script>

<div class="filter-container">
	{#each filters as filter}
		<div>
			<details
				id="filter-{filter.id}"
				role="list"
				class="filter filter-{filter.id}-container"
			>
				<summary class="filter-{filter.id}" aria-haspopup="listbox"
					>{filter.name}
				</summary>
				<ul role="listbox">
					{#each filter.list as opt}
						<li>
							<label>
								{#if filter.type === 'checkbox'}
									<input
										type="{filter.type}"
										checked="{opt.checked}"
									/>{opt.text}
								{:else}
									<input
										type="{filter.type}"
										name="filter-payed-option"
									/>{opt.text}
								{/if}
							</label>
						</li>
					{/each}
				</ul>
			</details>
		</div>
	{/each}
</div>

<style>
	.filter-container {
		display: flex;
		flex-wrap: wrap;
		margin: auto;
		justify-content: left;
	}

	.filter-container > div {
		display: inline-block;
		height: var(--filter-option-height) !important;
		flex: 0.6;
		margin-bottom: calc(var(--form-element-spacing-vertical)) !important;
		margin-left: calc(var(--form-element-spacing-horizontal) / 4);
		margin-right: calc(var(--form-element-spacing-horizontal) / 4);
	}

	.filter {
		margin: 0;
		height: inherit;
	}

	.filter > summary {
		height: inherit !important;
		border-radius: var(--filter-option-border-radius) !important;
		padding-top: calc(0.5 * var(--form-element-spacing-vertical)) !important;
		padding-bottom: calc(0.5 * var(--form-element-spacing-vertical)) !important;
		border-color: var(--form-element-border-color) !important;
		box-shadow: none !important;
	}

	.filter-time-container,
	.filter-days-container,
	.filter-salary-container {
		min-width: 9rem !important;
	}

	.filter-changed {
		border-color: var(--primary) !important;
		color: var(--primary) !important;
	}

	details[role='list'][open] > summary {
		border-bottom-right-radius: 0 !important;
		border-bottom-left-radius: 0 !important;
	}
</style>
