import { html } from 'lit';
import { fixture, expect, oneEvent, aTimeout, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dt-multi-text.js';

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
});
