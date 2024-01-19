export function createEl(elId = '', elClass = '', el = 'div') {
  let element = document.createElement(el);

  if (elId != '') element.id = elId;
  if (elClass != '') element.className = elClass;

  return element
}

export function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }

  return element
}
