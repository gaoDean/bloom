<script lang="ts">
import { type Filter, deepClone, defaultFilters } from './filters.js';

// create a complete clone
const filters: Filter[] = deepClone(defaultFilters);
let lastChangedFilterIndex = -1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function optionChanged(_reactiveAssignment: Filter[]) {
	if (lastChangedFilterIndex >= 0 && lastChangedFilterIndex < filters.length) {
		const defaultClass = `filter-${filters[lastChangedFilterIndex].id}`;
		if (
			JSON.stringify(filters[lastChangedFilterIndex].list) !==
			JSON.stringify(defaultFilters[lastChangedFilterIndex].list)
		) {
			filters[lastChangedFilterIndex].class = `${defaultClass} filter-changed`;
		} else {
			filters[lastChangedFilterIndex].class = defaultClass;
		}
	}
}

$: optionChanged(filters);
</script>

<div class="filter-container">
	{#each filters as filter, filterIndex}
		<div>
			<details
				id="filter-{filter.id}"
				role="list"
				class="filter filter-{filter.id}-container"
			>
				<summary class={filter.class} aria-haspopup="listbox"
					>{filter.name}
				</summary>
				<ul role="listbox">
					{#each filter.list as opt}
						<li>
							<label>
								{#if filter.type === 'checkbox'}
									<input
										type="checkbox"
										on:change={() => {
											lastChangedFilterIndex = filterIndex;
										}}
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
