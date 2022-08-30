import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';


import './dt-toggle.js';

describe('dt-toggle', () => {
  it('Check id, name, label, and value attributes display correctly', async () => {
    const el = await fixture(html`<dt-toggle id='name' label='Label Name' checked></dt-toggle>`);

    expect(el.id).to.equal('name');
    expect(el.label).to.equal('Label Name');
    expect(el.checked).to.be.true;
  });

  it('input disabled', async () => {
    const el = await fixture(html`<dt-toggle disabled ></dt-toggle>`);
    expect(el.shadowRoot.querySelector('input').disabled).to.be.true
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<dt-toggle id='name' label='Label Name' checked></dt-toggle>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
