import { html } from 'lit';
import { fixture, expect, oneEvent, aTimeout } from '@open-wc/testing';
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
]
async function wait(ms) {
  return new Promise(r => {
    setTimeout(r, ms);
  });
}

async function clickOption(el, id) {
  const input = el.shadowRoot.querySelector('input');
  const optionBtn = el.shadowRoot.querySelector(
    `.option-list button[value=${id}]`
  );

  input.focus();

  optionBtn.click();
}

describe('dt-tags', () => {
  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-tags placeholder="Custom Placeholder"></dt-tags>`
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.placeholder).to.equal('Custom Placeholder');
  });

  it('sets options', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`
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
      ></dt-tags>`
    );
    const container = el.shadowRoot.querySelector('.field-container');

    expect(container).to.contain('button[data-value=opt1]');
    expect(container).to.contain('button[data-value=opt2]');
    expect(container).not.to.contain('button[data-value=opt3]');
  });

  it('displays selection as option id if label available', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify(['opt1'])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`
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
      ></dt-tags>`
    );

    const container = el.shadowRoot.querySelector('.field-container');
    expect(container).to.contain('button[data-value=opt1]');

    const selectedValue = el.shadowRoot.querySelector('.selected-option a');
    expect(selectedValue.innerHTML).to.contain('Option 1');
  });

  it.skip('opens option list on input focus', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`
    );
    const input = el.shadowRoot.querySelector('input');
    const optionList = el.shadowRoot.querySelector('.option-list');

    expect(optionList).not.to.be.displayed;

    input.focus();
    await aTimeout(50); // wait for UI update

    expect(optionList).to.be.displayed;
  });

  it('shows label in option list', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(optionsWithLabel)}" .open="${true}"></dt-tags>`
    );
    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.be.displayed;

    const option = el.shadowRoot.querySelector('.option-list button[value=opt1]');
    expect(option.innerHTML).to.contain('Option 1');
  });

  it('shows id in option list if label does not exist', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}" .open="${true}"></dt-tags>`
    );
    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.be.displayed;

    const option = el.shadowRoot.querySelector('.option-list button[value=opt1]');
    expect(option.innerHTML).to.contain('opt1');
  });

  it('selects option via mouse', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`
    );
    const input = el.shadowRoot.querySelector('input');
    const optionBtn = el.shadowRoot.querySelector(
      '.option-list button[value=opt1]'
    );

    input.focus();

    optionBtn.click();
    await aTimeout(100);

    const container = el.shadowRoot.querySelector('.field-container');
    expect(container).to.contain('button[data-value=opt1]');
  });

  it('selects option via keyboard', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    await sendKeys({
      press: 'ArrowDown',
    });
    await sendKeys({
      press: 'Enter',
    });

    const container = el.shadowRoot.querySelector('.field-container');
    expect(container).to.contain('button[data-value=opt1]');
  });

  it('updates value attribute', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`
    );

    await clickOption(el, 'opt1');

    expect(el).to.have.attr('value', JSON.stringify([options[0].id]));
  });

  it('marks removed options with `delete`', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify([options[0].id, options[1].id])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`
    );
    const container = el.shadowRoot.querySelector('.field-container');

    expect(container).to.contain('button[data-value=opt1]');

    const optionBtn = el.shadowRoot.querySelector(
      `.selected-option button[data-value=opt1]`
    );
    optionBtn.click();
    await aTimeout(100);

    expect(el.value).to.deep.include('opt2');
    expect(el.value).to.deep.include('-opt1');
  });

  it('adds previously removed value', async () => {
    const el = await fixture(
      html`<dt-tags
        value="${JSON.stringify([`-${options[0].id}`])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`
    );
    const input = el.shadowRoot.querySelector('input');
    const optionBtn = el.shadowRoot.querySelector(
      '.option-list button[value=opt1]'
    );

    input.focus();

    optionBtn.click();
    await aTimeout(100);

    expect(el.value).to.deep.include('opt1');
    expect(el.value).to.not.deep.include('-opt1');
  });

  it('triggers change event - item added', async () => {
    const el = await fixture(
      html`<dt-tags
        name="custom-name"
        value="${JSON.stringify([options[1].id])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`
    );

    setTimeout(() => clickOption(el, 'opt1'));

    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.oldValue).to.eql([options[1].id]);
    expect(detail.newValue).to.eql([options[1].id, options[0].id]);
  });

  it('triggers change event - item removed', async () => {
    const el = await fixture(
      html`<dt-tags
        name="custom-name"
        value="${JSON.stringify([options[0].id])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`
    );

    setTimeout(() => {
      const optionBtn = el.shadowRoot.querySelector(
        `.selected-option button[data-value=opt1]`
      );
      optionBtn.click();
    });

    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.oldValue).to.eql([options[0].id]);
    expect(detail.newValue).to.eql([`-${options[0].id}`]);
  });

  it('filters options on text input', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}" .open="${true}"></dt-tags>`
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
      html`<dt-tags options="${JSON.stringify(options)}"></dt-tags>`
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
    const el = await fixture(
      html`<dt-tags
        name="custom-name"
        value="${JSON.stringify([options[1].id])}"
        .open="${true}"
      ></dt-tags>`
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    setTimeout(() => sendKeys({ type: 'o' }));

    const { detail } = await oneEvent(el, 'dt:get-data');

    expect(detail.field).to.equal('custom-name');
    expect(detail.query).to.equal('o');
    expect(detail.onSuccess).to.exist;

    await detail.onSuccess([options[0]]);

    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.contain('button[value=opt1]');
    expect(optionList).not.to.contain('button[value=opt2]');
    expect(optionList).not.to.contain('button[value=opt3]');
  });

  it('loads options from event if no options provided (string list)', async () => {
    const el = await fixture(
      html`<dt-tags
        name="custom-name"
        value="${JSON.stringify([options[1].id])}"
        .open="${true}"
      ></dt-tags>`
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    setTimeout(() => sendKeys({ type: 'o' }));

    const { detail } = await oneEvent(el, 'dt:get-data');

    expect(detail.field).to.equal('custom-name');
    expect(detail.query).to.equal('o');
    expect(detail.onSuccess).to.exist;

    await detail.onSuccess([options[0].id]);

    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.contain('button[value=opt1]');
    expect(optionList).not.to.contain('button[value=opt2]');
    expect(optionList).not.to.contain('button[value=opt3]');
  });

  it('allows adding new option', async () => {
    const el = await fixture(
      html`<dt-tags options="${JSON.stringify(options)}" .open="${true}" allowAdd></dt-tags>`
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
    expect(el.value).to.eql(['new']);
  });

  it('disables inputs', async () => {
    const el = await fixture(
      html`<dt-tags
        disabled
        value="${JSON.stringify(['opt1', 'opt2'])}"
        options="${JSON.stringify(options)}"
      ></dt-tags>`
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
      html`<dt-tags options="${JSON.stringify(options)}" allowAdd></dt-tags>`
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();
    await sendKeys({ type: 'new' });
    await wait(100);
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    const selectedOption = el.shadowRoot.querySelector('.selected-option');
    expect(selectedOption).to.have.descendant('a').with.text('new');
  });
});
