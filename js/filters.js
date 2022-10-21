const filterElement = document.getElementById('filters');
const filters = {
  days: {
    name: 'Days...',
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
    name: 'Time...',
    list: [
      ['Morning', true],
      ['Afternoon', true],
    ],
  },
};

function parseFilterUI(filterListNode) {
  let list = [];
  Array.from(filterListNode.getElementsByTagName('li')).forEach((label) => {
    label = label.firstElementChild;
    let name = label.textContent;
    let checked = label.firstElementChild.checked;
    list.push([name, checked]);
  });
  return list;
}

function addFilter(key, value) {
  let list = '';
  let defaultList = Object.values(value.list);
  defaultList.forEach((label) => {
    const checked = label[1] ? 'checked' : '';
    list = `${list}<li><label><input type='checkbox' ${checked}>${label[0]}</label></li>\n`;
  });

  const newFilterHTML = `
        <div class='filter'>
          <details role='list' class='filter-container filter-${key}-container'>
            <summary class='filter-${key}' aria-haspopup='listbox'>${value.name}</summary>
            <ul role='listbox'>
              ${list}
            </ul>
          </details>
        </div>`;

  filterElement.insertAdjacentHTML('beforeend', newFilterHTML);
  console.log(filterElement.lastElementChild.firstElementChild);
  filterElement.lastElementChild.firstElementChild.addEventListener('click', function _(node) {
    let parsedList = parseFilterUI(this.lastElementChild);
    if (JSON.stringify(defaultList) !== JSON.stringify(parsedList)) {
      this.firstElementChild.className = `filter-${key} filter-changed`;
    } else {
      this.firstElementChild.className = `filter-${key}`;
    }
  });
}

Object.entries(filters).forEach(([key, value]) => addFilter(key, value));

// flex space between uses margin-right, this cancels it for the rightmost element
filterElement.lastElementChild.style.cssText = 'margin-right: 0';
