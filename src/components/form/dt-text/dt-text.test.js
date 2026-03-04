import { html } from 'lit';
import { fixture, expect, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-text.js';

describe('DT-Text', () => {
  it('Check id, name, label, and value attributes display correctly', async () => {
    const el = await fixture(
      html`<dt-text
        id="name"
        name="Name"
        label="Label Name"
        value="John Doe"
      ></dt-text>`,
    );

    expect(el.id).to.equal('name');
    expect(el.name).to.equal('Name');
    expect(el.label).to.equal('Label Name');
    expect(el.value).to.equal('John Doe');
  });

  it('update the text', async () => {
    const el = await fixture(
      html`<dt-text
        id="name"
        name="Name"
        label="Label Name"
        value="John Doe"
      ></dt-text>`,
    );
    el.shadowRoot.querySelector('input').value = '';
    el.shadowRoot.querySelector('input').focus();

    await sendKeys({
      type: 'test typing',
    });

    await sendKeys({
      press: 'Enter',
    });

    expect(el.value).to.equal('test typing');
  });

  it('input disabled', async () => {
    const el = await fixture(html`<dt-text disabled></dt-text>`);
    expect(el.shadowRoot.querySelector('input').disabled).to.be.true;
  });

  it('Check private field', async () => {
    const el = await fixture(
      html`<dt-text label="Label Name" private></dt-text>`,
    );
    const label = el.shadowRoot.querySelector('dt-label');

    expect(label.hasAttribute('private')).to.be.true;
  });

  it('emits change event with correct details', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-text
        name="test-field"
        value="initial"
        @change=${e => {
          eventDetail = e.detail;
        }}
      ></dt-text>`,
    );

    const input = el.shadowRoot.querySelector('input');
    input.value = 'new value';
    input.dispatchEvent(new Event('change'));

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('test-field');
    expect(eventDetail.oldValue).to.equal('initial');
    expect(eventDetail.newValue).to.equal('new value');
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-text name="Name" label="Label Name" value="John Doe"></dt-text>`,
    );
    const input = el.shadowRoot.querySelector('input');

    el.reset();

    await nextFrame();

    expect(input.value).to.be.empty;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-text
        id="name"
        name="Name"
        label="Label Name"
        value="John Doe"
      ></dt-text>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
