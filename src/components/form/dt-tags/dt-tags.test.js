import { html } from 'lit';
import { fixture, expect, nextFrame, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-tags.js';

const options = [
  {
    id: 'opt1',
  },
  {
    id: 'opt2',
  },
  {
    id: 'opt3',
  },
];
const optionsWithLabel = [
  {
    id: 'opt1',
    label: 'Option 1',
  },
  {
    id: 'opt2',
    label: 'Option 2',
  },
  {
    id: 'opt3',
    label: 'Option 3',
  },
];

async function clickOption(el, id) {
  const input = el.shadowRoot.querySelector('input');
  const optionBtn = el.shadowRoot.querySelector(
    `.option-list button[value=${id}]`,
  );

  input.focus();

  optionBtn.click();
}

describe('dt-tags', () => {
  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-tags placeholder="Custom Placeholder"></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.placeholder).to.equal('Custom Placeholder');
  });

  it('sets options', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`,
    );
    const optionList = el.shadowRoot.querySelector('.option-list');

    expect(optionList.children).to.have.lengthOf(3);
    expect(optionList).to.contain('button[value=opt1]');
    expect(optionList).to.contain('button[value=opt2]');
    expect(optionList).to.contain('button[value=opt3]');

    expect(optionList).not.to.be.displayed;
  });

  it('sets selection from attribute', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify([options[0].id, options[1].id])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`,
    );
    const container = el.shadowRoot.querySelector('.field-container');

    expect(container).to.contain('button[data-value=opt1]');
    expect(container).to.contain('button[data-value=opt2]');
    expect(container).not.to.contain('button[data-value=opt3]');
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify([options[0].id, options[1].id])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`,
    );
    const container = el.shadowRoot.querySelector('.field-container');

    el.reset();

    await nextFrame();

    expect(container).not.to.contain('button[data-value=opt1]');
    expect(container).not.to.contain('button[data-value=opt2]');
    expect(container).not.to.contain('button[data-value=opt3]');
  });

  it('displays selection as option id if label available', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify(['opt1'])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`,
    );

    const container = el.shadowRoot.querySelector('.field-container');
    expect(container).to.contain('button[data-value=opt1]');

    const selectedValue = el.shadowRoot.querySelector('.selected-option a');
    expect(selectedValue.innerHTML).to.contain('opt1');
  });

  it('displays selection as option label if available', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify(['opt1'])}"
        options="${JSON.stringify(optionsWithLabel)}"
      ></dt-tags>`,
    );

    const container = el.shadowRoot.querySelector('.field-container');
    expect(container).to.contain('button[data-value=opt1]');

    const selectedValue = el.shadowRoot.querySelector('.selected-option a');
    expect(selectedValue.innerHTML).to.contain('Option 1');
  });

  it('opens option list on input focus', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionList = el.shadowRoot.querySelector('.option-list');

    expect(optionList).not.to.be.displayed;

    input.focus();
    await nextFrame();

    expect(optionList).to.be.displayed;
  });

  it('shows label in option list', async () => {
    const el = await fixture(
      html`<dt-tags
        options="${JSON.stringify(optionsWithLabel)}"
        .open="${true}"
      ></dt-tags>`,
    );
    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.be.displayed;

    const option = el.shadowRoot.querySelector(
      '.option-list button[value=opt1]',
    );
    expect(option.innerHTML).to.contain('Option 1');
  });

  it('shows id in option list if label does not exist', async () => {
    const el = await fixture(
      html`<dt-tags
        options="${JSON.stringify(options)}"
        .open="${true}"
      ></dt-tags>`,
    );
    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.be.displayed;

    const option = el.shadowRoot.querySelector(
      '.option-list button[value=opt1]',
    );
    expect(option.innerHTML).to.contain('opt1');
  });

  it('selects option via mouse', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionBtn = el.shadowRoot.querySelector(
      '.option-list button[value=opt1]',
    );

    input.focus();

    optionBtn.click();
    await nextFrame();

    const container = el.shadowRoot.querySelector('.field-container');
    expect(container).to.contain('button[data-value=opt1]');
  });

  it('selects option via keyboard', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    await sendKeys({
      press: 'ArrowDown',
    });
    await sendKeys({
      press: 'Enter',
    });

    await waitUntil(
      () => el.shadowRoot.querySelector('button[data-value=opt1]'),
      'Selected value not found',
    );
  });

  it('updates value attribute', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`,
    );

    await clickOption(el, 'opt1');

    expect(el).to.have.attr('value', JSON.stringify([options[0].id]));
  });

  it('marks removed options with `delete`', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify([options[0].id, options[1].id])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`,
    );
    const container = el.shadowRoot.querySelector('.field-container');

    expect(container).to.contain('button[data-value=opt1]');

    const optionBtn = el.shadowRoot.querySelector(
      `.selected-option button[data-value=opt1]`,
    );
    optionBtn.click();
    await nextFrame();

    expect(el.value).to.deep.include('opt2');
    expect(el.value).to.deep.include('-opt1');
  });

  it('adds previously removed value', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify([`-${options[0].id}`])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionBtn = el.shadowRoot.querySelector(
      '.option-list button[value=opt1]',
    );

    input.focus();

    optionBtn.click();
    await nextFrame();

    expect(el.value).to.deep.include('opt1');
    expect(el.value).to.not.deep.include('-opt1');
  });

  it('triggers change event - item added', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-tags
        name="custom-name"
        value="${JSON.stringify([options[1].id])}"
        options="${JSON.stringify(options)}"
        @change="${e => (eventDetail = e.detail)}"
      ></dt-tags>`,
    );

    await clickOption(el, 'opt1');

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('custom-name');
    expect(eventDetail.oldValue).to.have.members([options[1].id]);
    expect(eventDetail.newValue).to.have.members([
      options[1].id,
      options[0].id,
    ]);
  });

  it('triggers change event - item removed', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-tags
        name="custom-name"
        value="${JSON.stringify([options[0].id])}"
        options="${JSON.stringify(options)}"
        @change="${e => (eventDetail = e.detail)}"
      ></dt-tags>`,
    );

    const optionBtn = el.shadowRoot.querySelector(
      `.selected-option button[data-value=opt1]`,
    );
    optionBtn.click();

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('custom-name');
    expect(eventDetail.oldValue).to.have.members([options[0].id]);
    expect(eventDetail.newValue).to.have.members([`-${options[0].id}`]);
  });

  it('filters options on text input', async () => {
    const el = await fixture(
      html`<dt-tags
        options="${JSON.stringify(options)}"
        .open="${true}"
      ></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    await sendKeys({
      type: 'opt2',
    });

    const optionsList = el.shadowRoot.querySelector('.option-list');
    expect(optionsList).to.be.displayed;
    expect(optionsList).to.contain('button[value=opt2]');
    expect(optionsList).not.to.contain('button[value=opt1]');
    expect(optionsList).not.to.contain('button[value=opt3]');
    // },10);
  });

  it('filters options on option selection', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionsList = el.shadowRoot.querySelector('.option-list');
    input.focus();
    await clickOption(el, 'opt1');

    expect(optionsList).not.to.contain('button[value=opt1]');
    expect(optionsList).to.contain('button[value=opt2]');
    expect(optionsList).to.contain('button[value=opt3]');
  });

  it('loads options from event if no options provided (object list)', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-tags
        name="custom-name"
        value="${JSON.stringify([options[1].id])}"
        .open="${true}"
        @dt:get-data="${e => (eventDetail = e.detail)}"
      ></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    await sendKeys({ type: 'o' });

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('custom-name');
    expect(eventDetail.query).to.equal('o');
    expect(eventDetail.onSuccess).to.exist;

    await eventDetail.onSuccess([options[0]]);

    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.contain('button[value=opt1]');
    expect(optionList).not.to.contain('button[value=opt2]');
    expect(optionList).not.to.contain('button[value=opt3]');
  });

  it('loads options from event if no options provided (string list)', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-tags
        name="custom-name"
        value="${JSON.stringify([options[1].id])}"
        .open="${true}"
        @dt:get-data="${e => (eventDetail = e.detail)}"
      ></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    await sendKeys({ type: 'o' });

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('custom-name');
    expect(eventDetail.query).to.equal('o');
    expect(eventDetail.onSuccess).to.exist;

    await eventDetail.onSuccess([options[0].id]);

    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.contain('button[value=opt1]');
    expect(optionList).not.to.contain('button[value=opt2]');
    expect(optionList).not.to.contain('button[value=opt3]');
  });

  it('allows adding new option', async () => {
    const el = await fixture(
      html`<dt-tags
        options="${JSON.stringify(options)}"
        .open="${true}"
        allowAdd
      ></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionsList = el.shadowRoot.querySelector('.option-list');
    input.focus();

    await sendKeys({
      type: 'new',
    });

    expect(optionsList).not.to.contain('button[value=opt1]');
    expect(optionsList).not.to.contain('button[value=opt2]');
    expect(optionsList).not.to.contain('button[value=opt3]');
    expect(optionsList).to.contain('button[data-label=new]');

    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    expect(el.value).not.to.be.empty;
    expect(el.value).to.have.members(['new']);
  });

  it('disables inputs', async () => {
    const el = await fixture(
      html`<dt-tags
        disabled
        value="${JSON.stringify(['opt1', 'opt2'])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`,
    );

    const input = el.shadowRoot.querySelector('input');
    expect(input).to.have.attribute('disabled');

    const inputGroup = el.shadowRoot.querySelector('.input-group');
    expect(inputGroup).to.have.class('disabled');

    const selectedOption = el.shadowRoot.querySelector('.selected-option');
    expect(selectedOption)
      .to.have.descendant('button')
      .with.attribute('disabled');
    expect(selectedOption).to.have.descendant('a').with.attribute('disabled');
  });

  it('clicks add new button', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}" allowAdd></dt-tags>`,
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();
    await sendKeys({ type: 'new' });
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    const selectedOption = el.shadowRoot.querySelector('.selected-option');
    expect(selectedOption).to.have.descendant('a').with.text('new');
  });

  it('renders private field with label', async () => {
    const el = await fixture(
      html`<dt-tags
        label="Label Name"
        private
        privateLabel="Confidential Information"
      ></dt-tags>`,
    );

    const label = el.shadowRoot.querySelector('dt-label');
    expect(label).to.exist;
    expect(label).to.have.attribute('private');
  });

  it('dispatches dt:add-new event when add button is clicked', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-tags
        name="test-tags"
        allowAdd
        @dt:add-new="${e => (eventDetail = e.detail)}"
      ></dt-tags>`,
    );

    const input = el.shadowRoot.querySelector('input');
    input.focus();
    await sendKeys({ type: 'New Tag' });

    const addButton = el.shadowRoot.querySelector('.input-addon.btn-add');
    await addButton.click();

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('test-tags');
    expect(eventDetail.value).to.equal('New Tag');
  });
});
