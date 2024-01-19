import { static_view } from "../../src/dom/static_view";

describe('static_view', () => {
  const view = document.getElementById('container');
  const main = document.getElementById('main');

  test('the view container exists', () => {
    expect(view).toBeTruthy();
  })

  test('view contains the main container', () => {
    expect(view.innerHTML).toContain(main.outerHTML);
  });
});
