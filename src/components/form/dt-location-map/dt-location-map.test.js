import { html } from 'lit';
import { fixture, expect, nextFrame, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-location-map.js';
import './dt-map-modal.js'; // Needed because it's used internally

const basicOptions = [
  {
    grid_meta_id: '65',
    post_id: '43',
    post_type: 'contacts',
    postmeta_id_location_grid: '1671',
    grid_id: '100366112',
    lng: '-73.9866',
    lat: '40.7306',
    level: 'place',
    source: 'user',
    label: 'New York, New York, United States',
  },
  {
    grid_meta_id: '66',
    post_id: '43',
    post_type: 'contacts',
    postmeta_id_location_grid: '1673',
    grid_id: '100364858',
    lng: '-87.624421',
    lat: '41.875562',
    level: 'place',
    source: 'user',
    label: 'Chicago, Illinois, United States',
  },
];

describe('dt-location-map', () => {
  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-location-map
        placeholder="Custom Placeholder"
      ></dt-location-map>`,
    );
    // Placeholder is passed to dt-location-map-item, so we need to query that
    const item = el.shadowRoot.querySelector('dt-location-map-item');
    expect(item).to.have.attribute('placeholder', 'Custom Placeholder');
  });

  it('sets value from attribute', async () => {
    const el = await fixture(
      html`<dt-location-map .value="${[basicOptions[0]]}"></dt-location-map>`,
    );
    const items = el.shadowRoot.querySelectorAll('dt-location-map-item');
    expect(items).to.have.lengthOf(1);
    expect(items[0].metadata.label).to.equal(basicOptions[0].label);
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-location-map .value="${[basicOptions[0]]}"></dt-location-map>`,
    );
    el.reset();
    await nextFrame();
    expect(el.value).to.eql([]);
    const items = el.shadowRoot.querySelectorAll('dt-location-map-item');
    expect(items).to.have.lengthOf(1); // Should have one empty item after reset
    expect(items[0].metadata).to.have.property('id');
    expect(items[0].metadata).to.not.have.property('label');
  });

  it('adds new location when add button is clicked', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-location-map
        label="Field Name"
        .value="${[basicOptions[0]]}"
        limit="0"
        @change="${e => (eventDetail = e.detail)}"
      ></dt-location-map>`,
    );
    const addButton = el.shadowRoot.querySelector('#add-item');
    expect(addButton).to.exist;

    addButton.click();
    await nextFrame();

    const items = el.shadowRoot.querySelectorAll('dt-location-map-item');
    expect(items).to.have.lengthOf(2); // One initial empty, one new empty
  });

  it('selects location from map modal', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-location-map
        @change="${e => (eventDetail = e.detail)}"
      ></dt-location-map>`,
    );
    const item = el.shadowRoot.querySelector('dt-location-map-item');
    expect(item).to.exist;

    // Simulate event from dt-location-map-item
    item.dispatchEvent(
      new CustomEvent('select', {
        detail: { metadata: basicOptions[0] },
        bubbles: true,
        composed: true,
      }),
    );
    await nextFrame();

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.newValue[0].label).to.equal(basicOptions[0].label);
    expect(el.value).to.have.lengthOf(1);
  });

  it('deletes location item', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-location-map
        .value="${[basicOptions[0], basicOptions[1]]}"
        @change="${e => (eventDetail = e.detail)}"
      ></dt-location-map>`,
    );
    const items = el.shadowRoot.querySelectorAll('dt-location-map-item');
    expect(items).to.have.lengthOf(2);

    // Simulate delete event from first item
    items[0].dispatchEvent(
      new CustomEvent('delete', {
        detail: { metadata: basicOptions[0] },
        bubbles: true,
        composed: true,
      }),
    );
    await nextFrame();

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.newValue).to.have.lengthOf(1);
    expect(eventDetail.newValue[0].label).to.equal(basicOptions[1].label);
    expect(el.value).to.have.lengthOf(1);
  });

  it('enforces limit on locations', async () => {
    const el = await fixture(
      html`<dt-location-map
        .value="${[basicOptions[0]]}"
        limit="1"
      ></dt-location-map>`,
    );
    await nextFrame();
    const addButton = el.shadowRoot.querySelector('#add-item');
    expect(addButton).to.not.exist; // Add button should not be present if limit is reached
  });

  it('renders private field with label', async () => {
    const el = await fixture(
      html`<dt-location-map
        label="Field Name"
        private
        privateLabel="Confidential Information"
      ></dt-location-map>`,
    );

    const label = el.shadowRoot.querySelector('dt-label');
    expect(label).to.exist;
    expect(label).to.have.attribute('private');
  });

  it('displays an error message', async () => {
    const el = await fixture(
      html`<dt-location-map error="Custom error message"></dt-location-map>`,
    );
    const errorMessage = el.shadowRoot.querySelector(
      '.error-container .attr-msg',
    );
    expect(errorMessage).to.exist;
    expect(errorMessage).to.have.text('Custom error message');
  });
});
