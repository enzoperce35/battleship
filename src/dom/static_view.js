import { createEl } from './dom_helper';

const view = createEl('container');
const main = createEl('main');

export const staticView = (() => {
  view.append(main);

  document.body.appendChild(view);
})();
