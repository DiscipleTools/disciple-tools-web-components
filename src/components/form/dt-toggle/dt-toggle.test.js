import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import './dt-toggle.js';

describe('dt-toggle', () => {
  it('Check id, name, label, and value attributes display correctly', async () => {
    const el = await fixture(
      html`<dt-toggle
        id="name"
        name="test-toggle"
        label="Label Name"
        checked
      ></dt-toggle>`,
    );

    expect(el.id).to.equal('name');
    expect(el.name).to.equal('test-toggle');
    expect(el.label).to.equal('Label Name');
    expect(el.checked).to.be.true;
    expect(el.value).to.be.true;
  });

  it('emits change event with correct details', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-toggle
        name="test-toggle"
        .checked=${false}
        @change=${e => {
          eventDetail = e.detail;
        }}
      ></dt-toggle>`,
    );

    const input = el.shadowRoot.querySelector('input');
    input.checked = true;
    input.dispatchEvent(new Event('click'));

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('test-toggle');
    expect(eventDetail.oldValue).to.be.false;
    expect(eventDetail.newValue).to.be.true;
    expect(el.checked).to.be.true;
  });

  it('input disabled', async () => {
    const el = await fixture(html`<dt-toggle disabled></dt-toggle>`);
    expect(el.shadowRoot.querySelector('input').disabled).to.be.true;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-toggle id="name" label="Label Name" checked></dt-toggle>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
