function addToggleFunctionality(node, classes) {
  node.addEventListener('click', function _() {
    if (this.getAttribute('checked') === 'true') {
      this.className = `${classes} outline`;
      this.setAttribute('checked', 'false');
    } else {
      this.className = classes;
      this.setAttribute('checked', 'true');
    }
  });
}

document.getElementsByName('filter-day')
  .forEach((node) => addToggleFunctionality(node, node.name));
document.getElementsByName('filter-time')
  .forEach((node) => addToggleFunctionality(node, node.name));
