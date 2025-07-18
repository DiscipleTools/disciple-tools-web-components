import { html } from 'lit';
import { fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
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
      ></dt-date>`
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

  it.skip('triggers change event', async () => {
    const el = await fixture(html`<dt-date name="custom-name"></dt-date>`);

    el.shadowRoot.querySelector('input').value = '';
    el.shadowRoot.querySelector('input').focus();

    // The date input shows in the local and expects a MM-DD-YYYY format format but converts it to YYYY-MM-DD
    await sendKeys({
      type: '01-01-1999',
    });

    // this doesn't seem to work. probably because of not being able to type in the field
    setTimeout(async () => {
      await sendKeys({ press: 'Enter' });
    });

    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.newValue).to.eql(915148800);
  });

  it('accepts PHP timestamp', async () => {
    const el = await fixture(html`<dt-date timestamp="1577836800"></dt-date>`);
    expect(el.shadowRoot.querySelector('input').value).to.equal('2020-01-01');
  });

  it('accepts JS timestamp', async () => {
    const el = await fixture(
      html`<dt-date timestamp="1577836800000"></dt-date>`
    );
    expect(el.shadowRoot.querySelector('input').value).to.equal('2020-01-01');
  });

  it('displays as private field', async () => {
    const el = await fixture(
      html`<dt-date label="Label Name" private></dt-date>`
    );
    const label = await fixture(el.shadowRoot.querySelector('dt-label'));

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
      ></dt-date>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
