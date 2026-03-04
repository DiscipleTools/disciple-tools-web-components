import { html } from 'lit';
import { fixture, expect, nextFrame } from '@open-wc/testing';

import './dt-datetime.js';

describe('dt-datetime', () => {
  it('displays id, name, label, and value attributes correctly', async () => {
    const el = await fixture(
      html`<dt-datetime
        id="dt-id"
        name="dt-name"
        label="Datetime Label"
        value="2020-01-01T12:00"
      ></dt-datetime>`,
    );

    expect(el.id).to.equal('dt-id');
    expect(el.name).to.equal('dt-name');
    expect(el.label).to.equal('Datetime Label');
    expect(el.value).to.equal('2020-01-01T12:00');
  });

  it('emits change event with correct details', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-datetime
        name="test-field"
        value="2020-01-01T12:00"
        @change=${e => {
          eventDetail = e.detail;
        }}
      ></dt-datetime>`,
    );

    const input = el.shadowRoot.querySelector('input');
    input.value = '2021-01-01T13:00';
    input.dispatchEvent(new Event('change'));

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('test-field');
    expect(eventDetail.oldValue).to.equal('2020-01-01T12:00');
    expect(eventDetail.newValue).to.equal('2021-01-01T13:00');
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-datetime value="2020-01-01T12:00"></dt-datetime>`,
    );
    const input = el.shadowRoot.querySelector('input');

    el.reset();
    await nextFrame();

    expect(input.value).to.equal('');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-datetime
        label="Datetime Label"
        value="2020-01-01T12:00"
      ></dt-datetime>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
