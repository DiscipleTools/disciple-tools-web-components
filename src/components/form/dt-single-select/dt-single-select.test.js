import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-single-select.js';

const options = [{
  id: 'opt1',
  label: 'Option 1',
}, {
  id: 'opt2',
  label: 'Second Option',
}, {
  id: 'opt3',
  label: 'Option Three',
}];
async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

describe('dt-single-select', () => {

  it('sets placeholder', async () => {
    const el = await fixture(html`<dt-single-select placeholder="Custom Placeholder"></dt-single-select>`);
    const select = el.shadowRoot.querySelector('select');

    expect(select).to.have.descendant('option[value=""]').text('Custom Placeholder');

  });

  it('sets options', async () => {
    const el = await fixture(html`<dt-single-select options="${JSON.stringify(options)}"></dt-single-select>`);
    const select = el.shadowRoot.querySelector('select');

    expect(select).to.contain('option[value=opt1]');
    expect(select).to.contain('option[value=opt2]');
    expect(select).to.contain('option[value=opt3]');
  });

  it('sets selection from attribute', async () => {
    const el = await fixture(html`<dt-single-select value="opt1" options="${JSON.stringify(options)}"></dt-single-select>`);
    const select = el.shadowRoot.querySelector('select');

    expect(select).to.have.value('opt1');
  });

  it('updates value attribute', async () => {
    const el = await fixture(html`<dt-single-select options="${JSON.stringify(options)}"></dt-single-select>`);
    const select = el.shadowRoot.querySelector('select');
    select.focus();

    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    expect(select.value).to.equal('opt1');
    expect(el.value).to.equal('opt1');
  });

  it.skip('triggers change event', async () => {
    const el = await fixture(html`<dt-single-select name="custom-name" value="${JSON.stringify(['opt2'])}" options="${JSON.stringify(options)}"></dt-single-select>`);
    const select = el.shadowRoot.querySelector('select');
    select.focus();

    sendKeys({ press: 'ArrowDown' });

    setTimeout(() => sendKeys({ press: 'Enter' }));

    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.newValue).to.eql('opt1');
    expect(detail.oldValue).to.eql(undefined);
  });

  // todo: sets color
});
