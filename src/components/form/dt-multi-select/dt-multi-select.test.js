import { html } from 'lit';
import { fixture, expect, nextFrame, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-multi-select.js';

const options = [
  {
    id: 'opt1',
    label: 'Option 1',
  },
  {
    id: 'opt2',
    label: 'Second Option',
  },
  {
    id: 'opt3',
    label: 'Option Three',
  },
];

async function clickOption(el, id) {
  const input = el.shadowRoot.querySelector('input');
  const optionBtn = el.shadowRoot.querySelector(
    `.option-list button[value=${id}]`,
  );

  input.focus();
  await nextFrame(); // wait for UI update

  expect(optionBtn).to.exist;
  expect(optionBtn).to.be.visible;

  optionBtn.click();
  await nextFrame();
}

describe('dt-multi-select', () => {
  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-multi-select
        placeholder="Custom Placeholder"
      ></dt-multi-select>`,
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.placeholder).to.equal('Custom Placeholder');
  });

  it('sets options', async () => {
    const el = await fixture(
      html`<dt-multi-select
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
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
      html`<dt-multi-select
        value="${JSON.stringify(['opt1', 'opt2'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const container = el.shadowRoot.querySelector('.field-container');

    expect(container).to.contain('button[data-value=opt1]');
    expect(container).to.contain('button[data-value=opt2]');
    expect(container).not.to.contain('button[data-value=opt3]');
  });

  it('resets value', async () => {
    const el = await fixture(
      html`<dt-multi-select
        value="${JSON.stringify(['opt1', 'opt2'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const container = el.shadowRoot.querySelector('.field-container');

    el.reset();

    await nextFrame();

    expect(container).not.to.contain('button[data-value=opt1]');
    expect(container).not.to.contain('button[data-value=opt2]');
    expect(container).not.to.contain('button[data-value=opt3]');
  });

  it.skip('opens option list on input focus', async () => {
    const el = await fixture(
      html`<dt-multi-select
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionList = el.shadowRoot.querySelector('.option-list');

    expect(optionList).not.to.be.displayed;

    input.focus();
    await nextFrame();

    expect(optionList).to.be.displayed;
  });

  it('selects option via mouse', async () => {
    const el = await fixture(
      html`<dt-multi-select
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionBtn = el.shadowRoot.querySelector(
      '.option-list button[value=opt1]',
    );

    input.focus();
    await nextFrame();

    optionBtn.click();
    await nextFrame();

    const container = el.shadowRoot.querySelector('.field-container');
    expect(container).to.contain('button[data-value=opt1]');
  });

  it('selects option via keyboard', async () => {
    const el = await fixture(
      html`<dt-multi-select
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    sendKeys({
      press: 'ArrowDown',
    });
    sendKeys({
      press: 'Enter',
    });

    await waitUntil(
      () => el.shadowRoot.querySelector('button[data-value=opt1]'),
      'Selected value not found',
    );
  });

  it('updates value attribute', async () => {
    const el = await fixture(
      html`<dt-multi-select
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );

    await clickOption(el, 'opt1');

    await nextFrame();

    expect(el).to.have.attr('value', JSON.stringify(['opt1']));
  });

  it('prefixes removed options with hyphen', async () => {
    const el = await fixture(
      html`<dt-multi-select
        value="${JSON.stringify(['opt1', 'opt2'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const container = el.shadowRoot.querySelector('.field-container');

    expect(container).to.contain('button[data-value=opt1]');

    const optionBtn = el.shadowRoot.querySelector(
      `.selected-option button[data-value=opt1]`,
    );
    optionBtn.click();
    await nextFrame();

    expect(el.value).to.contain('opt2');
    expect(el.value).to.contain('-opt1');
  });

  it('adds previously removed value', async () => {
    const el = await fixture(
      html`<dt-multi-select
        value="${JSON.stringify(['-opt1'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionBtn = el.shadowRoot.querySelector(
      '.option-list button[value=opt1]',
    );

    input.focus();

    optionBtn.click();
    await nextFrame();

    expect(el.value).to.contain('opt1');
    expect(el.value).to.not.contain('-opt1');
  });

  it('triggers change event - item added', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-multi-select
        name="custom-name"
        value="${JSON.stringify(['opt2'])}"
        options="${JSON.stringify(options)}"
        @change=${e => {
          eventDetail = e.detail;
        }}
      ></dt-multi-select>`,
    );

    await clickOption(el, 'opt1');

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('custom-name');
    expect(eventDetail.oldValue).to.have.members(['opt2']);
    expect(eventDetail.newValue).to.have.members(['opt1', 'opt2']);
  });

  it('triggers change event - item removed', async () => {
    let eventDetail = null;
    const el = await fixture(
      html`<dt-multi-select
        name="custom-name"
        value="${JSON.stringify(['opt1'])}"
        options="${JSON.stringify(options)}"
        @change=${e => {
          eventDetail = e.detail;
        }}
      ></dt-multi-select>`,
    );

    const optionBtn = el.shadowRoot.querySelector(
      `.selected-option button[data-value=opt1]`,
    );
    optionBtn.click();

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.field).to.equal('custom-name');
    expect(eventDetail.oldValue).to.have.members(['opt1']);
    expect(eventDetail.newValue).to.have.members(['-opt1']);
  });

  it('filters options on text input', async () => {
    const el = await fixture(
      html`<dt-multi-select
        options="${JSON.stringify(options)}"
        .open="${true}"
      ></dt-multi-select>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionsList = el.shadowRoot.querySelector('.option-list');
    input.focus();

    await sendKeys({
      type: 'Sec',
    });

    expect(optionsList).to.be.displayed;
    expect(optionsList).to.contain('button[value=opt2]');
    expect(optionsList).not.to.contain('button[value=opt1]');
    expect(optionsList).not.to.contain('button[value=opt3]');
  });

  it('filters options on option selection', async () => {
    const el = await fixture(
      html`<dt-multi-select
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const input = el.shadowRoot.querySelector('input');
    const optionsList = el.shadowRoot.querySelector('.option-list');
    input.focus();
    await clickOption(el, 'opt1');

    await nextFrame();

    expect(optionsList).not.to.contain('button[value=opt1]');
    expect(optionsList).to.contain('button[value=opt2]');
    expect(optionsList).to.contain('button[value=opt3]');
  });

  it('filters options on option removal', async () => {
    const el = await fixture(
      html`<dt-multi-select
        value="${JSON.stringify(['opt1', 'opt2'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );
    const container = el.shadowRoot.querySelector('.field-container');

    expect(container).to.contain('button[data-value=opt1]');

    const optionBtn = el.shadowRoot.querySelector(
      `.selected-option button[data-value=opt1]`,
    );
    optionBtn.click();
    await nextFrame();

    const input = el.shadowRoot.querySelector('input');
    const optionsList = el.shadowRoot.querySelector('.option-list');
    input.focus();

    await nextFrame();

    expect(optionsList).to.contain('button[value=opt3]');
    expect(optionsList).to.contain('button[value=opt1]');
    expect(optionsList).not.to.contain('button[value=opt2]');
  });

  it('disables inputs', async () => {
    const el = await fixture(
      html`<dt-multi-select
        disabled
        value="${JSON.stringify(['opt1', 'opt2'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select>`,
    );

    const input = el.shadowRoot.querySelector('input');
    expect(input).to.have.attribute('disabled');

    const inputGroup = el.shadowRoot.querySelector('.input-group');
    expect(inputGroup).to.have.class('disabled');

    const selectedOption = el.shadowRoot.querySelector('.selected-option');
    expect(selectedOption)
      .to.have.descendant('button')
      .with.attribute('disabled');
  });

  it('Check private field', async () => {
    const el = await fixture(
      html`<dt-multi-select label="Label Name" private></dt-multi-select>`,
    );
    const label = el.shadowRoot.querySelector('dt-label');

    expect(label.hasAttribute('private')).to.be.true;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-multi-select
        id="name"
        name="Name"
        label="Label Name"
        .options=${options}
        .value=${['opt1']}
      ></dt-multi-select>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
