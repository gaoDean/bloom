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

const filterElement = document.getElementById('filters');
function addFilter(key, value) {
  let list = '';
  Object.values(value.list).forEach((label) => {
    const checked = label[1] ? 'checked' : '';
    list = `${list}<li><label><input type='checkbox' ${checked}>${label[0]}</label></li>\n`;
  });

  const fullHTML = `
        <div class='filter'>
          <details role='list' class='filter-container filter-${key}-container'>
            <summary class='filter-time' aria-haspopup='listbox'>${value.name}</summary>
            <ul role='listbox'>
              ${list}
            </ul>
          </details>
        </div>`;

  filterElement.insertAdjacentHTML('beforeend', fullHTML);
}

Object.entries(filters).forEach(([key, value]) => addFilter(key, value));
filterElement.lastElementChild.style.cssText = 'margin-right: 0';
