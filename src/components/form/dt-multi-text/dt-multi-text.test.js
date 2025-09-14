import { html } from 'lit';
import { fixture, expect, oneEvent, aTimeout, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dt-multi-text.js';
import '../../layout/dt-phone-modal/dt-phone-modal.js';

describe('DtMultiText', () => {

  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-multi-text placeholder="Custom Placeholder"></dt-multi-text>`
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.placeholder).to.equal('Custom Placeholder');
  });

  it('sets value from attribute', async () => {
    const el = await fixture(
      html`<dt-multi-text
        value="${JSON.stringify([{
          key: 'cc01',
          value: 'Value 1',
          verified: true,
        }, {
          key: 'cc02',
          value: 'Value 2',
          verified: true,
        }])}"
      ></dt-multi-text>`
    );

    const inputGroup = el.shadowRoot.querySelector('.input-group');

    expect(inputGroup.querySelector('input[data-key="cc01"]'))
      .to.exist
      .and.have.value('Value 1');
    expect(inputGroup.querySelector('input[data-key="cc02"]'))
      .to.exist
      .and.have.value('Value 2');
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-multi-text
        value="${JSON.stringify([{
          key: 'cc01',
          value: 'Value 1',
          verified: true,
        }, {
          key: 'cc02',
          value: 'Value 2',
          verified: true,
        }])}"
      ></dt-multi-text>`
    );

    el.reset();

    await nextFrame();

    const inputGroup = el.shadowRoot.querySelector('.input-group');

    const input = inputGroup.querySelector('input');

    expect(input).to.have.attribute('type', 'text');
    expect(input).to.have.value('');
  });

  it('adds a new item on add button click', async () => {
    const el = await fixture(
      html`<dt-multi-text></dt-multi-text>`
    );

    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(1);

    const addButton = el.shadowRoot.querySelector('button.btn-add');
    addButton.click();
    await aTimeout(50);

    expect(el.value.length).to.equal(2);
    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(2);
  });

  it('deletes an item on remove button click', async () => {
    const el = await fixture(
      html`<dt-multi-text
        value="${JSON.stringify([{
        key: 'cc01',
        value: 'Value 1',
        verified: true,
      }, {
        key: 'cc02',
        value: 'Value 2',
        verified: true,
      }])}"
      ></dt-multi-text>`
    );

    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(2);

    const removeButton = el.shadowRoot.querySelector('button.btn-remove');
    removeButton.click();
    await aTimeout(50);

    // marked as deleted in value
    expect(el.value.length).to.equal(2);
    expect(el.value).to.deep.include.include({
      key: 'cc01',
      value: 'Value 1',
      verified: true,
      delete: true,
    });
    expect(el.value).to.deep.include.include({
      key: 'cc02',
      value: 'Value 2',
      verified: true,
    });

    // not rendered in DOM
    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(1);
  });

  it('triggers a change event - item added', async () => {
    const el = await fixture(
      html`<dt-multi-text></dt-multi-text>`
    );
    const input = el.shadowRoot.querySelector('input');

    input.focus();

    setTimeout(async () => {
      await sendKeys({ type: 'Test' });
      input.blur();
    })

    const { detail } = await oneEvent(el, 'change');

    expect(detail.newValue.length).to.equal(1);
    expect(detail.newValue[0].value).to.equal('Test')

  });

  it('triggers a change event - item removed', async () => {
    const el = await fixture(
      html`<dt-multi-text
        value="${JSON.stringify([{
        key: 'cc01',
        value: 'Value 1',
        verified: true,
      }, {
        key: 'cc02',
        value: 'Value 2',
        verified: true,
      }])}"
      ></dt-multi-text>`
    );

    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(2);

    const removeButton = el.shadowRoot.querySelector('button.btn-remove');

    setTimeout(() => removeButton.click());

    const { detail } = await oneEvent(el, 'change');

    expect(detail.oldValue).to.have.length(2);
    expect(detail.newValue).to.have.length(2);
    expect(detail.newValue[0].value).to.equal('Value 1')
    expect(detail.newValue[0].delete).to.equal(true);
  });

  describe('Phone type functionality', () => {
    it('shows "Open" button when type is phone and field has value', async () => {
      const el = await fixture(
        html`<dt-multi-text
          type="phone"
          value="${JSON.stringify([{
            key: 'cc01',
            value: '+1-555-123-4567',
            verified: true,
          }])}"
        ></dt-multi-text>`
      );

      await nextFrame();

      const phoneButton = el.shadowRoot.querySelector('.btn-phone-open');
      expect(phoneButton).to.exist;
      expect(phoneButton.textContent.trim()).to.include('Open');
      expect(phoneButton.dataset.phoneNumber).to.equal('+1-555-123-4567');
    });

    it('hides "Open" button when phone field is empty', async () => {
      const el = await fixture(
        html`<dt-multi-text type="phone"></dt-multi-text>`
      );

      await nextFrame();

      const phoneButton = el.shadowRoot.querySelector('.btn-phone-open');
      expect(phoneButton).to.not.exist;
    });

    it('shows "Open" button when type is phone-intl and field has value', async () => {
      const el = await fixture(
        html`<dt-multi-text
          type="phone-intl"
          value="${JSON.stringify([{
            key: 'cc01',
            value: '+33123456789',
            verified: true,
          }])}"
        ></dt-multi-text>`
      );

      await nextFrame();

      const phoneButton = el.shadowRoot.querySelector('.btn-phone-open');
      expect(phoneButton).to.exist;
      expect(phoneButton.dataset.phoneNumber).to.equal('+33123456789');
    });

    it('does not show "Open" button for non-phone types', async () => {
      const el = await fixture(
        html`<dt-multi-text
          type="email"
          value="${JSON.stringify([{
            key: 'cc01',
            value: 'test@example.com',
            verified: true,
          }])}"
        ></dt-multi-text>`
      );

      await nextFrame();

      const phoneButton = el.shadowRoot.querySelector('.btn-phone-open');
      expect(phoneButton).to.not.exist;
    });

    it('opens phone modal when "Open" button is clicked', async () => {
      const el = await fixture(
        html`<dt-multi-text
          type="phone"
          value="${JSON.stringify([{
            key: 'cc01',
            value: '+1-555-123-4567',
            verified: true,
          }])}"
        ></dt-multi-text>`
      );

      await nextFrame();

      // Remove any existing phone modals
      const existingModals = document.querySelectorAll('dt-phone-modal');
      existingModals.forEach(modal => modal.remove());

      const phoneButton = el.shadowRoot.querySelector('.btn-phone-open');
      expect(phoneButton).to.exist;

      phoneButton.click();
      await aTimeout(50);

      // Check that a phone modal was created
      const phoneModal = document.querySelector('dt-phone-modal');
      expect(phoneModal).to.exist;
      expect(phoneModal.phoneNumber).to.equal('+1-555-123-4567');
      expect(phoneModal.isOpen).to.be.true;

      // Clean up
      phoneModal.remove();
    });

    it('updates "Open" button visibility when phone value changes', async () => {
      const el = await fixture(
        html`<dt-multi-text type="phone"></dt-multi-text>`
      );

      await nextFrame();

      // Initially no button should be visible
      let phoneButton = el.shadowRoot.querySelector('.btn-phone-open');
      expect(phoneButton).to.not.exist;

      // Add a phone number value
      const input = el.shadowRoot.querySelector('input');
      input.focus();
      input.value = '+1-555-123-4567';
      input.dispatchEvent(new Event('change'));

      await nextFrame();

      // Now button should be visible
      phoneButton = el.shadowRoot.querySelector('.btn-phone-open');
      expect(phoneButton).to.exist;
      expect(phoneButton.dataset.phoneNumber).to.equal('+1-555-123-4567');

      // Clear the value
      input.value = '';
      input.dispatchEvent(new Event('change'));

      await nextFrame();

      // Button should be hidden again
      phoneButton = el.shadowRoot.querySelector('.btn-phone-open');
      expect(phoneButton).to.not.exist;
    });
  });
});
