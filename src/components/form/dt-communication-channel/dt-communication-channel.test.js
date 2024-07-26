import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';


import './dt-comm-channel.js';

async function wait(ms) {
  return new Promise(r => {
    setTimeout(r, ms);
  });
}

describe('DtCommChannel', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<dt-comm-channel id="name" name="field-name" label="Field Name"></dt-comm-channel>`);
  });

  it('should be initialized correctly', () => {
    expect(element).to.exist;
  });

  it('reflects the "value" property', async () => {
    const testValue = [{ verified: false, value: 'test', key: 'new-test-1' }];
    element.value = testValue;
    await element.updateComplete;
    expect(element.value).to.deep.equal(testValue);
  });

  it('adds a new item on add button click', async () => {
    const addButton = element.shadowRoot.querySelector('button.add-btn');

    addButton.click();
    await wait(50);

    expect(element.value.length).to.equal(2);
  });

  it('deletes an item on _deleteField', async () => {
    element.value = [{ verified: false, value: 'test', key: 'new-test-1' }];
    await element.updateComplete;
    element._deleteField(element.value[0]);
    await element.updateComplete;
    expect(element.value.length).to.equal(1);
  });

  it('emits a "change" event on adding a new item', async () => {
    const input = element.shadowRoot.querySelector('input');

    input.focus();

    await sendKeys({
      type: 'Tes',
    });
    await wait(50);
    const listener = oneEvent(element, 'change');

    await sendKeys({
      type: 't',
    });
    input.blur();

    await wait(50);

    const event = await listener;

    await wait(50);

    expect(event.detail.newValue.length).to.equal(1);
    expect(event.detail.newValue[0].value).to.equal('Test')

  });

  it('emits a "change" event with correct details on deleting an item', async () => {
    element.value = [{ verified: false, value: 'test', key: 'new-test-1' }, { verified: false, value: 'test2', key: 'new-test-2' }];
    await element.updateComplete;
    const listener = oneEvent(element, 'change');
    const deleteButton = element.shadowRoot.querySelectorAll('button.delete-button');

    deleteButton[1].click();
    await wait(50);

    const event = await listener;
    expect(event).to.exist;
    expect(event.detail.oldValue.key).to.equal('new-test-2');
    expect(event.detail.newValue.length).to.equal(1);
    expect(event.detail.newValue[0].key).to.equal('new-test-1');

  });

});
