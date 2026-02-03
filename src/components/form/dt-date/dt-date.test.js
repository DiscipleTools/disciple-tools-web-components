import { html } from 'lit';
import { fixture, expect, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-date.js';

describe('DT-Date', () => {
  it('displays id, name, label, and value attributes correctly', async () => {
    const el = await fixture(
      html`<dt-date
        id="name"
        name="Field Name"
        label="Label Name"
        value=""
        timestamp="1577836800000"
      ></dt-date>`,
    );

    expect(el.id).to.equal('name');
    expect(el.name).to.equal('Field Name');
    expect(el.label).to.equal('Label Name');
    expect(el.value).to.equal('2020-01-01');
    expect(el.timestamp).to.equal(1577836800000);
  });

  it('updates the text', async () => {
    const el = await fixture(html`<dt-date value="2020-01-01"></dt-date>`);

    el.shadowRoot.querySelector('input').value = '';
    el.shadowRoot.querySelector('input').focus();

    // The date input shows in the local and expects a MM-DD-YYYY format format but converts it to YYYY-MM-DD
    await sendKeys({
      type: '01-01-1999',
    });

    await sendKeys({
      press: 'Enter',
    });
    expect(el.value).to.equal('1999-01-01');
  });

  it('emits change event with correct details', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-date
        name="test-field"
        value="2020-01-01"
        @change=${e => {
          eventDetail = e.detail;
        }}
      ></dt-date>`,
    );

    const input = el.shadowRoot.querySelector('input');
    input.value = '2021-01-01';
    input.dispatchEvent(new Event('change'));

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('test-field');
    expect(eventDetail.oldValue).to.equal('2020-01-01');
    expect(eventDetail.newValue).to.equal('2021-01-01');
  });

  it('displays as private field', async () => {
    const el = await fixture(
      html`<dt-date label="Label Name" private></dt-date>`,
    );
    const label = el.shadowRoot.querySelector('dt-label');

    expect(label.hasAttribute('private')).to.be.true;
  });

  it('resets value', async () => {
    const el = await fixture(html`<dt-date value="2020-01-01"></dt-date>`);

    const input = el.shadowRoot.querySelector('input');

    expect(input.value).to.equal('2020-01-01');

    el.reset();

    await nextFrame();

    expect(input.value).to.equal('');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-date
        id="name"
        name="Name"
        label="Label Name"
        value="John Doe"
        timestamp="1577836800000"
      ></dt-date>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
