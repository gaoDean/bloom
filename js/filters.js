const filterContainer = document.getElementById('filters');
const filters = {
  days: {
    display: 'Days...',
    type: 'checkbox',
    list: [
      ['Monday', true],
      ['Tuesday', true],
      ['Wednesday', true],
      ['Thursday', true],
      ['Friday', true],
      ['Saturday', false],
      ['Sunday', false],
    ],
  },
  time: {
    display: 'Time...',
    type: 'checkbox',
    list: [
      ['Morning', true],
      ['Afternoon', true],
    ],
  },
  salary: {
    display: 'Salary...',
    type: 'radio',
    list: [
      ['Payed', false],
      ['Volunteer', false],
    ],
  },
};

function parseFilterUI(filterListNode) {
  const list = [];
  filterListNode.querySelectorAll('li').forEach((labelParent) => {
    const label = labelParent.firstElementChild;
    const name = label.textContent;
    const { checked } = label.firstElementChild;
    list.push([name, checked]);
  });
  return list;
}

function addFilter(name, opts) {
  let list = '';
  const defaultList = Object.values(opts.list);
  defaultList.forEach((label) => {
    const checked = label[1] ? 'checked' : '';
    list = `${list}<li><label><input type='${opts.type}' ${checked}>${label[0]}</label></li>\n`;
  });

  const newFilterHTML = `
        <div>
          <details id='filter-${name}' role='list' class='filter filter-${name}-container'>
            <summary class='filter-${name}' aria-haspopup='listbox'>${opts.display}</summary>
            <ul role='listbox'>
              ${list}
            </ul>
          </details>
        </div>`;

  filterContainer.insertAdjacentHTML('beforeend', newFilterHTML);
  filterContainer.querySelector(`:scope > div > details#filter-${name}`).addEventListener('click', function _() {
    const parsedList = parseFilterUI(this.lastElementChild);
    if (JSON.stringify(defaultList) !== JSON.stringify(parsedList)) {
      this.firstElementChild.className = `filter-${name} filter-changed`;
    } else {
      this.firstElementChild.className = `filter-${name}`;
    }
  });
}

Object.entries(filters).forEach(([name, opts]) => addFilter(name, opts));

// flex space between uses margin-right, this cancels it for the rightmost element
filterContainer.firstElementChild.style.cssText = 'margin-left: 0';
