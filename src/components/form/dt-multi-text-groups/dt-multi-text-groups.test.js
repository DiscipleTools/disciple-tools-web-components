import { html } from 'lit';
import { fixture, expect, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dt-multi-text-groups.js';

describe('DtMultiTextGroups', () => {

  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-multi-text-groups 
        placeholder="Custom Placeholder"
        .value=${[{ tempKey: 'new-key', type: 'default', value: '' }]}
        .groups=${[{ id: 'default', label: 'Default Group' }]}
      ></dt-multi-text-groups>`
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.placeholder).to.equal('Custom Placeholder');
  });

  it('sets value from attribute', async () => {
    const el = await fixture(
      html`<dt-multi-text-groups
        value="${JSON.stringify([{
          meta_id: 'cc01',
          value: 'Value 1',
          type: 'one',
        }, {
          meta_id: 'cc02',
          value: 'Value 2',
          type: 'two',
        }])}"
        groups="${JSON.stringify([{
          id: 'one',
          label: 'Group 1',
        }, {
          id: 'two',
          label: 'Group 2',
        }])}"
      ></dt-multi-text-groups>`
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
      html`<dt-multi-text-groups
        value="${JSON.stringify([{
          meta_id: 'cc01',
          value: 'Value 1',
          type: 'one',
        }, {
          meta_id: 'cc02',
          value: 'Value 2',
          type: 'two',
        }])}"
        groups="${JSON.stringify([{
          id: 'one',
          label: 'Group 1',
        }, {
          id: 'two',
          label: 'Group 2',
        }])}"
      ></dt-multi-text-groups>`
    );

    el.reset();

    await nextFrame();

    // Assert that the inputs are cleared and the empty state is shown
    const inputs = el.shadowRoot.querySelectorAll('input');
    expect(inputs).to.have.lengthOf(0);

    const emptyStateDiv = el.shadowRoot.querySelector('.groups-no-value');
    expect(emptyStateDiv).to.exist;
    expect(emptyStateDiv.textContent).to.include('No items to show');
  });

  it('deletes an item on remove button click', async () => {
    const el = await fixture(
      html`<dt-multi-text-groups
        value="${JSON.stringify([{
          meta_id: 'cc01',
          value: 'Value 1',
          type: 'one',
        }, {
          meta_id: 'cc02',
          value: 'Value 2',
          type: 'two',
        }])}"
        groups="${JSON.stringify([{
          id: 'one',
          label: 'Group 1',
        }, {
          id: 'two',
          label: 'Group 2',
        }])}"
      ></dt-multi-text-groups>`
    );

    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(2);

    const removeButton = el.shadowRoot.querySelector('button.btn-remove');
    removeButton.click();
    
    await nextFrame();

    // marked as deleted in value
    expect(el.value.length).to.equal(2);
    
    expect(el.value).to.deep.include({
      meta_id: 'cc01',
      value: 'Value 1',
      type: 'one',
      delete: true,
    });
    
    expect(el.value).to.deep.include({
      meta_id: 'cc02',
      value: 'Value 2',
      type: 'two',
    });

    // not rendered in DOM
    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(1);
  });

  it('triggers a change event - item added', async () => {
    const el = await fixture(
      html`<dt-multi-text-groups
        value="${JSON.stringify([{ 
          tempKey: 'new-key',
          type: 'default', 
          value: '' 
        }])}"
        groups="${JSON.stringify([{
          id: 'default',
          label: 'Default Group'
        }])}"
      ></dt-multi-text-groups>`
    );
    
    const input = el.shadowRoot.querySelector('input');
    
    // 1. Create a variable to hold the event data
    let changeEventDetail;

    // 2. Listen for the event and update the variable
    el.addEventListener('change', (e) => {
      changeEventDetail = e.detail;
    });

    // 3. Trigger the event
    input.focus();
    await sendKeys({ type: 'Test' });
    input.blur();

    // 4. Assert against the captured variable
    expect(changeEventDetail).to.exist;
    expect(changeEventDetail.newValue.length).to.equal(1);
    expect(changeEventDetail.newValue[0].value).to.equal('Test');
  });

  it('triggers a change event - item removed', async () => {
    const el = await fixture(
      html`<dt-multi-text-groups
        value="${JSON.stringify([{
          meta_id: 'cc01',
          value: 'Value 1',
          type: 'one',
        }, {
          meta_id: 'cc02',
          value: 'Value 2',
          type: 'two',
        }])}"
        groups="${JSON.stringify([{
          id: 'one',
          label: 'Group 1',
        }, {
          id: 'two',
          label: 'Group 2',
        }])}"
      ></dt-multi-text-groups>`
    );

    expect(el.shadowRoot.querySelectorAll('input')).to.have.length(2);

    // 1. Create a variable to hold the event data
    let changeEventDetail;

    // 2. Listen for the event
    el.addEventListener('change', (e) => {
      changeEventDetail = e.detail;
    });

    // 3. Trigger the event
    const removeButton = el.shadowRoot.querySelector('button.btn-remove');
    removeButton.click();
    
    await nextFrame();

    // 4. Assert against the captured variable
    expect(changeEventDetail).to.exist;
    expect(changeEventDetail.oldValue).to.have.length(2);
    expect(changeEventDetail.newValue).to.have.length(2);
    expect(changeEventDetail.newValue[0].value).to.equal('Value 1');
    expect(changeEventDetail.newValue[0].delete).to.equal(true);
  });
});