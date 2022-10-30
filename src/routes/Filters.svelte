<script lang="ts">
import { type Filter, deepClone, defaultFilters } from './filters.js';
import { tick } from 'svelte';

// create a complete clone
const filters: Filter[] = deepClone(defaultFilters);

/* let lastChangedFilterIndex = -1; */
$: optionChanged(filters);

function optionChanged(fils: Filter[]) {
	fils.forEach((_, filterIndex) => {
		const defaultClass = `filter-${filters[filterIndex].id}`;
		const filterNodeId = document.querySelector(`.${defaultClass}`);

		console.log(filterNodeId);
		if (!filterNodeId) {
			return;
		}

		console.log(filters[filterIndex]);
		console.log(defaultFilters[filterIndex]);
		console.log(JSON.stringify(filters[filterIndex]),
			JSON.stringify(defaultFilters[filterIndex]));
		if (
			JSON.stringify(filters[filterIndex]) !==
				JSON.stringify(defaultFilters[filterIndex])
		) {
			filterNodeId.className += ' filter-changed';
		} else {
			filterNodeId.className = filterNodeId.className.replace(
				/ filter-changed/g,
				'',
			);
		}
	});
}
</script>

<div class="filter-container">
	{#each filters as filter, filterIndex}
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
										type="checkbox"
										bind:checked={opt.checked}
									/>{opt.text}
								{:else}
									<input type="radio" name="filter-payed-option" />{opt.text}
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
