import { html } from 'lit';
import { fixture, expect, aTimeout, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-single-select.js';

const options = [
  {
    id: 'opt1',
    label: 'Option 1',
  },
  {
    id: 'opt2',
    label: 'Second Option',
  },
  {
    id: 'opt3',
    label: 'Option Three',
  },
];

describe('dt-single-select', () => {
  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-single-select
        placeholder="Custom Placeholder"
      ></dt-single-select>`,
    );
    const select = el.shadowRoot.querySelector('select');

    expect(select)
      .to.have.descendant('option[value=""]')
      .text('Custom Placeholder');
  });

  it('sets options', async () => {
    const el = await fixture(
      html`<dt-single-select
        options="${JSON.stringify(options)}"
      ></dt-single-select>`,
    );
    const select = el.shadowRoot.querySelector('select');

    expect(select).to.contain('option[value=opt1]');
    expect(select).to.contain('option[value=opt2]');
    expect(select).to.contain('option[value=opt3]');
  });

  it('sets selection from attribute', async () => {
    const el = await fixture(
      html`<dt-single-select
        value="opt1"
        options="${JSON.stringify(options)}"
      ></dt-single-select>`,
    );
    const select = el.shadowRoot.querySelector('select');

    expect(select).to.have.value('opt1');
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-single-select
        value="opt1"
        options="${JSON.stringify(options)}"
      ></dt-single-select>`,
    );
    const select = el.shadowRoot.querySelector('select');

    expect(el.value).to.equal('opt1');
    el.reset();

    await nextFrame();

    expect(el.value).to.be.empty;
  });

  it('updates value attribute', async () => {
    const el = await fixture(
      html`<dt-single-select
        value=""
        options="${JSON.stringify(options)}"
      ></dt-single-select>`,
    );
    const select = el.shadowRoot.querySelector('select');

    select.focus();
    sendKeys({ type: 'Option 1' });
    select.dispatchEvent(new Event('change'));

    await aTimeout(100);

    expect(select.value).to.equal('opt1');
    expect(el.value).to.equal('opt1');
  });

  it('triggers change event', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-single-select
        name="custom-name"
        value="opt2"
        options="${JSON.stringify(options)}"
        @change="${e => (eventDetail = e.detail)}"
      ></dt-single-select>`,
    );

    const select = el.shadowRoot.querySelector('select');
    select.value = 'opt1';
    select.dispatchEvent(new Event('change'));

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('custom-name');
    expect(eventDetail.newValue).to.equal('opt1');
    expect(eventDetail.oldValue).to.equal('opt2');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-single-select
        name="custom-name"
        options="${JSON.stringify(options)}"
      ></dt-single-select>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });

  it('sets color from options', async () => {
    const colorOptions = options.map((o, idx) => ({
      ...o,
      color: `#${idx}${idx}${idx}`,
    }));
    const el = await fixture(
      html`<dt-single-select
        value="opt1"
        options="${JSON.stringify(colorOptions)}"
      ></dt-single-select>`,
    );
    const select = el.shadowRoot.querySelector('select');

    expect(select.style.backgroundColor).to.eql('rgb(0, 0, 0)');
  });
});
