import { createEl, clear } from '../../src/dom/dom_helper';

describe('createEl', () => {
  it('creates html element', () => {
    const newDivEl = createEl('div_id', 'div_class');
    const newSpanEl = createEl('span_id', 'span_class', 'span');

    document.body.append(newDivEl, newSpanEl);

    expect(document.getElementById('div_id')).toBeTruthy();
    expect(document.getElementById('span_id')).toBeTruthy();
  });
});

describe('clear', () => {
  it('removes all child elements', () => {
    const container = createEl();

    container.append(createEl(), createEl(), createEl());

    expect(container.childNodes.length).toEqual(3);
    expect(clear(container).childNodes.length).toEqual(0);
  });
});
