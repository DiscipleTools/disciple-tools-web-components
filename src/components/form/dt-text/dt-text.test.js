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
    const label = await fixture(el.shadowRoot.querySelector('dt-label'));

    expect(label.hasAttribute('private')).to.be.true;
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

  describe('readonly mode', () => {
    it('displays value as text when readonly is true', async () => {
      const el = await fixture(
        html`<dt-text value="John Doe" readonly></dt-text>`,
      );
      const valueDisplay = el.shadowRoot.querySelector('.readonly-value');
      expect(valueDisplay).to.exist;
      expect(valueDisplay.textContent.trim()).to.equal('John Doe');
      expect(el.shadowRoot.querySelector('input')).to.not.exist;
    });

    it('shows edit icon when readonly is true and not disabled', async () => {
      const el = await fixture(
        html`<dt-text label="Name" value="John Doe" readonly></dt-text>`,
      );
      const editIcon = el.shadowRoot.querySelector(
        'dt-icon[icon="mdi:pencil"]',
      );
      expect(editIcon).to.exist;
    });

    it('does not show edit icon when readonly is true but disabled', async () => {
      const el = await fixture(
        html`<dt-text
          label="Name"
          value="John Doe"
          readonly
          disabled
        ></dt-text>`,
      );
      const editIcon = el.shadowRoot.querySelector(
        'dt-icon[icon="mdi:pencil"]',
      );
      expect(editIcon).to.not.exist;
    });

    it('switches to edit mode and focuses input when edit icon is clicked', async () => {
      const el = await fixture(
        html`<dt-text label="Name" value="John Doe" readonly></dt-text>`,
      );
      const editIcon = el.shadowRoot.querySelector(
        'dt-icon[icon="mdi:pencil"]',
      );
      editIcon.click();
      await el.updateComplete;

      expect(el.readonly).to.be.false;
      const input = el.shadowRoot.querySelector('input');
      expect(input).to.exist;
      expect(el.shadowRoot.querySelector('.readonly-value')).to.not.exist;
      expect(el.shadowRoot.activeElement).to.equal(input);
    });
  });
});
