import { html } from 'lit';
import {
  fixture,
  expect,
  nextFrame,
  oneEvent,
  aTimeout,
} from '@open-wc/testing';

import './dt-church-health-circle.js';

// Minimal set of options shaped as the real component expects (object keyed by metric)
const options = {
  church_baptism: {
    label: 'Baptism',
    description: 'The group is baptising.',
    icon: '/groups/baptism-2.svg',
  },
  church_bible: {
    label: 'Bible Study',
    description: 'The group is studying the bible.',
    icon: '/groups/word-2.svg',
  },
  church_prayer: {
    label: 'Prayer',
    description: 'The group is praying.',
    icon: '/groups/prayer-2.svg',
  },
  // Special key: excluded from the circle and controlled by the toggle
  church_commitment: {
    label: 'Church Commitment',
    description: 'Committed as a church',
  },
};

describe('DT-Church-Health-Circle', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });

  it('sets options', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );
    const icons = el.shadowRoot.querySelectorAll('dt-church-health-icon');

    // Should render all metrics except church_commitment
    expect(icons).to.have.lengthOf(Object.keys(options).length - 1);
    expect(
      el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_baptism"]',
      ),
    ).to.exist;
    expect(
      el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_bible"]',
      ),
    ).to.exist;
    expect(
      el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_prayer"]',
      ),
    ).to.exist;
    // commitment should not render as an icon
    expect(
      el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_commitment"]',
      ),
    ).to.not.exist;
  });

  it('sets selection from attribute', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        value="${JSON.stringify(['church_baptism', 'church_bible'])}"
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );
    expect(
      el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_baptism"]',
      ),
    ).to.have.attribute('active');
    expect(
      el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_bible"]',
      ),
    ).to.have.attribute('active');
    expect(
      el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_prayer"]',
      ),
    ).to.not.have.attribute('active');
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        value="${JSON.stringify(['church_baptism', 'church_bible'])}"
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );

    el.reset();

    await nextFrame();

    const icons = Array.from(
      el.shadowRoot.querySelectorAll('dt-church-health-icon'),
    );
    expect(icons.every(i => !i.hasAttribute('active'))).to.be.true;
  });

  it('selects option via mouse', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );
    const icon = el.shadowRoot.querySelector(
      'dt-church-health-icon[data-value="church_baptism"]',
    );
    // Click the inner element that handles the click in the icon component
    icon.shadowRoot.querySelector('.health-item').click();
    await aTimeout(100);
    expect(icon).to.have.attribute('active');
    expect(el.value).to.eql(['church_baptism']);
  });

  // Keyboard selection tests from the button group do not apply to the icon-only UI.

  it('updates value attribute', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );
    const icon = el.shadowRoot.querySelector(
      'dt-church-health-icon[data-value="church_baptism"]',
    );
    icon.shadowRoot.querySelector('.health-item').click();
    await aTimeout(100);
    expect(el).to.have.attr('value', JSON.stringify(['church_baptism']));
  });

  it('prefixes removed options with hyphen', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        value="${JSON.stringify(['church_baptism', 'church_bible'])}"
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );
    const icon = el.shadowRoot.querySelector(
      'dt-church-health-icon[data-value="church_baptism"]',
    );
    icon.shadowRoot.querySelector('.health-item').click();
    await aTimeout(100);

    expect(el.value).to.contain('church_bible');
    expect(el.value).to.contain('-church_baptism');
  });

  it('adds previously removed value', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        value="${JSON.stringify(['-church_baptism'])}"
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );
    const icon = el.shadowRoot.querySelector(
      'dt-church-health-icon[data-value="church_baptism"]',
    );
    icon.shadowRoot.querySelector('.health-item').click();
    await aTimeout(100);

    expect(el.value).to.contain('church_baptism');
    expect(el.value).to.not.contain('-church_baptism');
  });

  it('triggers change event - item added', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        name="custom-name"
        value="${JSON.stringify(['church_bible'])}"
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );
    setTimeout(() => {
      const icon = el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_baptism"]',
      );
      icon.shadowRoot.querySelector('.health-item').click();
    });
    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.oldValue).to.eql(['church_bible']);
    expect(detail.newValue).to.eql(['church_bible', 'church_baptism']);
  });

  it('triggers change event - item removed', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        name="custom-name"
        value="${JSON.stringify(['church_baptism'])}"
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );
    setTimeout(() => {
      const icon = el.shadowRoot.querySelector(
        'dt-church-health-icon[data-value="church_baptism"]',
      );
      icon.shadowRoot.querySelector('.health-item').click();
    });
    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.oldValue).to.eql(['church_baptism']);
    expect(detail.newValue).to.eql(['-church_baptism']);
  });

  it('toggles church commitment via dt-toggle and updates class/value', async () => {
    const el = await fixture(
      html`<dt-church-health-circle
        name="health"
        options="${JSON.stringify(options)}"
      ></dt-church-health-circle>`,
    );

    const toggle = el.shadowRoot.querySelector('dt-toggle');
    // Initially not committed
    const circle = el.shadowRoot.querySelector('.health-circle');
    expect(circle.classList.contains('health-circle--committed')).to.be.false;
    expect(el.value || []).to.not.contain('church_commitment');

    // Click the toggle input inside its shadow DOM
    toggle.shadowRoot.querySelector('input').click();
    await aTimeout(50);

    expect(circle.classList.contains('health-circle--committed')).to.be.true;
    expect(el.value).to.contain('church_commitment');

    // Click again to uncommit -> should hyphenate
    toggle.shadowRoot.querySelector('input').click();
    await aTimeout(50);

    expect(circle.classList.contains('health-circle--committed')).to.be.false;
    expect(el.value).to.contain('-church_commitment');
  });
});
