import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import './dt-button.js';

describe('DT-Button', () => {
  it('Check the label slot', async () => {
    const el = await fixture(html`<dt-button>Button</dt-button>`);

    expect(el.textContent).to.contain('Button');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-button
        id="name"
        name="Name"
        label="Label Name"
        value="John Doe"
      >Button</dt-button>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });

  it('Check the href attribute', async () => {
    const el = await fixture(html`<dt-button href="https://www.google.com">Button</dt-button>`);

    expect(el.href).to.equal('https://www.google.com');
  });

  it('Check the title attribute', async () => {
    const el = await fixture(html`<dt-button title="TestTitle">Button</dt-button>`);

    expect(el.title).to.equal('TestTitle');
  });

  it('Check the type attribute', async () => {
    const el = await fixture(html`<dt-button type="submit">Button</dt-button>`);

    expect(el.type).to.equal('submit');
  });

});
