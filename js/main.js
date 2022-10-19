
function addListeners() {
  document.getElementsByName('filter-day').forEach((node) => {
    console.log(node);
    node.addEventListener('click', function (e) {
      if (this.getAttribute('checked') === 'true') {
        this.className = 'filter-day outline';
        this.setAttribute('checked', 'false');
      } else {
        this.className = 'filter-day';
        this.setAttribute('checked', 'true');
      }
    });
  });
}

addListeners();
