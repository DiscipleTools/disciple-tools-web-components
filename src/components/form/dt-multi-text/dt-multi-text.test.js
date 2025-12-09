import { html } from 'lit';
import {
  fixture,
  expect,
  oneEvent,
  aTimeout,
  nextFrame,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dt-multi-text.js';

describe('DtMultiText', () => {
  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-multi-text placeholder="Custom Placeholder"></dt-multi-text>`,
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.placeholder).to.equal('Custom Placeholder');
  });

  it('sets value from attribute', async () => {
    const el = await fixture(
      html`<dt-multi-text
        value="${JSON.stringify([
          {
            key: 'cc01',
            value: 'Value 1',
            verified: true,
          },
          {
            key: 'cc02',
            value: 'Value 2',
            verified: true,
          },
        ])}"
      ></dt-multi-text>`,
    );

    const inputGroup = el.shadowRoot.querySelector('.input-group');

    expect(
      inputGroup.querySelector('input[data-key="cc01"]'),
    ).to.exist.and.have.value('Value 1');
    expect(
      inputGroup.querySelector('input[data-key="cc02"]'),
    ).to.exist.and.have.value('Value 2');
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-multi-text
        value="${JSON.stringify([
          {
            key: 'cc01',
            value: 'Value 1',
            verified: true,
          },
          {
            key: 'cc02',
            value: 'Value 2',
            verified: true,
          },
        ])}"
      ></dt-multi-text>`,
    );

    el.reset();

    await nextFrame();

    const inputGroup = el.shadowRoot.querySelector('.input-group');

    const input = inputGroup.querySelector('input');

    expect(input).to.have.attribute('type', 'text');
    expect(input).to.have.value('');
  });

  it('adds a new item on add button click', async () => {
    const el = await fixture(html`<dt-multi-text></dt-multi-text>`);

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
        value="${JSON.stringify([
          {
            key: 'cc01',
            value: 'Value 1',
            verified: true,
          },
          {
            key: 'cc02',
            value: 'Value 2',
            verified: true,
          },
        ])}"
      ></dt-multi-text>`,
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
    const el = await fixture(html`<dt-multi-text></dt-multi-text>`);
    const input = el.shadowRoot.querySelector('input');

    input.focus();

    setTimeout(async () => {
      await sendKeys({ type: 'Test' });
      input.blur();
    });

    const { detail } = await oneEvent(el, 'change');

    expect(detail.newValue.length).to.equal(1);
    expect(detail.newValue[0].value).to.equal('Test');
  });

  it('triggers a change event - item removed', async () => {
    const el = await fixture(
      html`<dt-multi-text
        value="${JSON.stringify([
          {
            key: 'cc01',
            value: 'Value 1',
            verified: true,
          },
          {
            key: 'cc02',
            value: 'Value 2',
            verified: true,
          },
        ])}"
      ></dt-multi-text>`,
    );

    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(2);

    const removeButton = el.shadowRoot.querySelector('button.btn-remove');

    setTimeout(() => removeButton.click());

    const { detail } = await oneEvent(el, 'change');

    expect(detail.oldValue).to.have.length(2);
    expect(detail.newValue).to.have.length(2);
    expect(detail.newValue[0].value).to.equal('Value 1');
    expect(detail.newValue[0].delete).to.equal(true);
  });

  describe('phone-intl type', () => {
    it('renders country code dropdown for phone-intl type', async () => {
      const el = await fixture(
        html`<dt-multi-text type="phone-intl"></dt-multi-text>`,
      );

      const countryButton = el.shadowRoot.querySelector('.country-button');
      expect(countryButton).to.exist;
      countryButton.click();
      await nextFrame();
      const dropdown = el.shadowRoot.querySelector('.country-dropdown');
      expect(dropdown).to.exist;
      expect(dropdown.classList.contains('open')).to.be.true;
      const options = dropdown.querySelectorAll('.country-option');
      expect(options.length).to.be.greaterThan(0);
    });

    it('renders phone number input for phone-intl type', async () => {
      const el = await fixture(
        html`<dt-multi-text type="phone-intl"></dt-multi-text>`,
      );

      const phoneInput = el.shadowRoot.querySelector(
        'input[data-type="phone"]',
      );
      expect(phoneInput).to.exist;
    });

    it('handles phone-intl value format', async () => {
      const el = await fixture(
        html`<dt-multi-text
          type="phone-intl"
          value="${JSON.stringify([
            {
              key: 'phone01',
              value: '+1 555-123-4567',
              countryCode: 'US',
              verified: true,
            },
          ])}"
        ></dt-multi-text>`,
      );

      const button = el.shadowRoot.querySelector('.country-button');
      expect(button).to.exist;
      const dialCode = el.shadowRoot.querySelector('.dial-code');
      expect(dialCode).to.exist;
      expect(dialCode.textContent.trim()).to.equal('+1');
      const phoneInput = el.shadowRoot.querySelector(
        'input[data-type="phone"]',
      );
      expect(phoneInput.value).to.equal('555-123-4567');
    });

    it('detects country code when entering full international number', async () => {
      const el = await fixture(
        html`<dt-multi-text type="phone-intl"></dt-multi-text>`,
      );
      
      await nextFrame(); // Allow country options to load

      const phoneInput = el.shadowRoot.querySelector(
        'input[data-type="phone"]',
      );
      
      // Simulate typing a full international number
      phoneInput.value = '+961 12345678';
      phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
      
      await nextFrame();
      
      // Check that Lebanon (+961) was detected
      const dialCode = el.shadowRoot.querySelector('.dial-code');
      expect(dialCode.textContent.trim()).to.equal('+961');
      expect(phoneInput.value).to.equal('12345678');
    });

    it('allows country selection when field is empty', async () => {
      const el = await fixture(
        html`<dt-multi-text type="phone-intl"></dt-multi-text>`,
      );
      
      await nextFrame(); // Allow country options to load

      // Click the country button to open dropdown
      const countryButton = el.shadowRoot.querySelector('.country-button');
      countryButton.click();
      await nextFrame();

      // Select a different country (e.g., UK)
      const ukOption = el.shadowRoot.querySelector(
        '.country-option[data-country-code="GB"]',
      );
      if (ukOption) {
        ukOption.click();
        await nextFrame();

        // Check that the dial code was updated
        const dialCode = el.shadowRoot.querySelector('.dial-code');
        expect(dialCode.textContent.trim()).to.equal('+44');
        
        // Check that a change event was triggered with the dial code
        expect(el.value[0].value).to.equal('+44 ');
      }
    });

    it('handles various international phone number formats', async () => {
      const el = await fixture(
        html`<dt-multi-text type="phone-intl"></dt-multi-text>`,
      );

      await nextFrame(); // Allow country options to load

      // Test various phone number formats
      const testCases = [
        { input: '+96112345678', expectedDialCode: '+961', expectedPhone: '12345678' },
        { input: '+1 555 555 5555', expectedDialCode: '+1', expectedPhone: '555 555 5555' }, // Stored format preserves spaces
        { input: '+15555555555', expectedDialCode: '+1', expectedPhone: '5555555555' }, // Compact format strips spaces
        { input: '0096112345678', expectedDialCode: '+961', expectedPhone: '12345678' },
        { input: '001 555 555 5555', expectedDialCode: '+1', expectedPhone: '5555555555' }, // Cleaned format strips spaces
        { input: '00155555555555', expectedDialCode: '+1', expectedPhone: '55555555555' },
      ];

      for (const testCase of testCases) {
        const parsed = el._parsePhoneValue(testCase.input);
        // For +1 dial code, always expect US as it's marked as preferred
        const expectedCountryCode = testCase.expectedDialCode === '+1' ? 'US' : 
          el._countries.find(c => c.data.dial_code === testCase.expectedDialCode)?.data?.code || 'US';
        expect(parsed.countryCode).to.equal(expectedCountryCode, `Failed for input: ${testCase.input}`);
        expect(parsed.phoneNumber).to.equal(testCase.expectedPhone, `Failed for input: ${testCase.input}`);
      }
    });
  });
});
