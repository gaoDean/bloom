<script>
import { deepClone } from './filters.js';

const optionChanged = (filters, defaultFilters) =>
	JSON.stringify(filters.list) !== JSON.stringify(defaultFilters.list)
		? 'true'
		: 'false';

/* eslint-disable */
export let filters;
const defaultFilters = deepClone(filters);
let lastChangedFilterIndex = -1;

$: lastChangedFilterIndex >= 0
	? (filters[lastChangedFilterIndex].active = optionChanged(
			filters[lastChangedFilterIndex],
			defaultFilters[lastChangedFilterIndex],
	  ))
	: null;
</script>

<div class="filter-container">
	{#each filters as filter, filterIndex}
		<div>
			<details role="list" class="filter filter-{filter.id}-container">
				<summary
					class="filter-{filter.id}"
					aria-haspopup="listbox"
					filter-active={filter.active}
					><small>{filter.name}</small>
				</summary>
				<ul role="listbox">
					{#each filter.list as opt}
						<li>
							<label>
								{#if filter.type === 'checkbox'}
									<input
										type="checkbox"
										on:change={() => (lastChangedFilterIndex = filterIndex)}
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
:root {
	--filter-option-height: 16px;
	--filter-option-padding: 8px;
	--filter-option-border-radius: calc(var(--filter-option-height));
}

.filter-container {
	display: flex;
	flex-wrap: wrap;
	margin: auto;
	justify-content: left;
}

.filter-container > div {
	display: inline-block;
	height: var(--filter-option-height) !important;
	flex: 0.2;
	margin: 0px 0px var(--filter-option-padding) 4px !important;
}

.filter {
	margin: 0;
	padding-bottom: 1rem;
	height: inherit;
}

.filter > summary {
	height: inherit !important;
	border-radius: var(--filter-option-border-radius) !important;
	padding-top: 2px !important;
	padding-bottom: calc(0.5 * var(--filter-option-padding)) !important;
	border-color: var(--form-element-border-color) !important;
	box-shadow: none !important;
}

summary[filter-active='true'] {
	/* border-color: var(--primary) !important; */
	color: var(--primary) !important;
}

details[role='list'] > summary::after {
	transform: rotate(-90deg);
	background-image: none;
}

details[role='list'][open] > summary::after {
	transform: rotate(0);
}

details[role='list'] > summary {
	margin-inline-start: 0px;
	min-width: 0rem;
	transition: all 0.5s;
}

details[role='list'][open] > summary {
	transition: all 0.2s;
	min-width: 10rem;
	border-bottom-right-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}
</style>
