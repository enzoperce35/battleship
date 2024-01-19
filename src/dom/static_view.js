import { createEl } from "./dom_helper";

let view = createEl('container');
let main = createEl('main');

export let static_view = (() => {
  view.append(main);

  document.body.appendChild(view)
})();
