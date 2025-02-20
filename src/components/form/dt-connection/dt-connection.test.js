import { html } from 'lit';
import { fixture, expect, oneEvent, aTimeout } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-connection.js';

const options = [
  {
    id: '1',
    label: 'Option 1',
  },
  {
    id: '2',
    label: 'Second Option',
    user: true,
  },
  {
    id: '3',
    label: 'Option Three',
  },
];
async function wait(ms) {
  return new Promise(r => {
    setTimeout(r, ms);
  });
}

async function clickOption(el, id) {
  const input = el.shadowRoot.querySelector('input');
  const optionBtn = el.shadowRoot.querySelector(
    `.option-list button[value="${id}"]`
  );

  input.focus();

  optionBtn.click();
}

describe('dt-connection', () => {
  it('sets placeholder', async () => {
    const el = await fixture(
      html`<dt-connection placeholder="Custom Placeholder"></dt-connection>`
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.placeholder).to.equal('Custom Placeholder');
  });

  it('sets options', async () => {
    const el = await fixture(
      html`<dt-connection options="${JSON.stringify(options)}"></dt-connection>`
    );
    const optionList = el.shadowRoot.querySelector('.option-list');

    expect(optionList.children).to.have.lengthOf(3);
    expect(optionList).to.contain('button[value="1"]');
    expect(optionList).to.contain('button[value="2"]');
    expect(optionList).to.contain('button[value="3"]');

    expect(optionList)
      .to.have.descendant('button[value="1"]')
      .with.contain.trimmed.text('Option 1');
    expect(optionList)
      .to.have.descendant('button[value="2"]')
      .and.contain('svg');

    expect(optionList).not.to.be.displayed;
  });

  it('sets selection from attribute', async () => {
    const el = await fixture(
      html`<dt-connection
        value="${JSON.stringify([options[0], options[1]])}"
        options="${JSON.stringify(options)}"
      ></dt-connection>`
    );
    const container = el.shadowRoot.querySelector('.field-container');

    expect(container).to.contain('button[data-value="1"]');
    expect(container).to.contain('button[data-value="2"]');
    expect(container).not.to.contain('button[data-value="3"]');
  });

  it.skip('opens option list on input focus', async () => {
    const el = await fixture(
      html`<dt-connection options="${JSON.stringify(options)}"></dt-connection>`
    );
    const input = el.shadowRoot.querySelector('input');
    const optionList = el.shadowRoot.querySelector('.option-list');

    expect(optionList).not.to.be.displayed;

    input.focus();
    await aTimeout(500); // wait for UI update

    expect(optionList).to.be.displayed;
  });

  it('selects option via mouse', async () => {
    const el = await fixture(
      html`<dt-connection options="${JSON.stringify(options)}"></dt-connection>`
    );
    const input = el.shadowRoot.querySelector('input');
    const optionBtn = el.shadowRoot.querySelector(
      '.option-list button[value="1"]'
    );

    input.focus();

    optionBtn.click();
    await wait(100);

    const container = el.shadowRoot.querySelector('.field-container');
    expect(container).to.contain('button[data-value="1"]');
  });

  it('selects option via keyboard', async () => {
    const el = await fixture(
      html`<dt-connection options="${JSON.stringify(options)}"></dt-connection>`
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
    expect(container).to.contain('button[data-value="1"]');
  });

  it('updates value attribute', async () => {
    const el = await fixture(
      html`<dt-connection options="${JSON.stringify(options)}"></dt-connection>`
    );

    await clickOption(el, '1');

    expect(el).to.have.attr('value', JSON.stringify([options[0]]));
  });

  it('marks removed options with `delete`', async () => {
    const el = await fixture(
      html`<dt-connection
        value="${JSON.stringify([options[0], options[2]])}"
        options="${JSON.stringify(options)}"
      ></dt-connection>`
    );

    const optionBtn = el.shadowRoot.querySelector(
      `.selected-option button[data-value="1"]`
    );
    optionBtn.click();
    await wait(100);

    expect(el.value).to.deep.include({ id: '3', label: options[2].label });
    expect(el.value).to.deep.include({
      id: '1',
      label: options[0].label,
      delete: true,
    });
  });

  it('adds previously removed value', async () => {
    const el = await fixture(
      html`<dt-connection
        value="${JSON.stringify([
          { id: options[0].id, label: 'old', delete: true },
        ])}"
        options="${JSON.stringify(options)}"
      ></dt-connection>`
    );
    const input = el.shadowRoot.querySelector('input');
    const optionBtn = el.shadowRoot.querySelector(
      '.option-list button[value="1"]'
    );

    input.focus();

    optionBtn.click();
    await wait(100);

    expect(el.value).to.deep.include({ id: '1', label: 'old' });
    expect(el.value).to.not.deep.include({
      id: '1',
      label: 'old',
      delete: true,
    });
  });

  it('triggers change event - item added', async () => {
    const el = await fixture(
      html`<dt-connection
        name="custom-name"
        value="${JSON.stringify([options[1]])}"
        options="${JSON.stringify(options)}"
      ></dt-connection>`
    );

    setTimeout(() => clickOption(el, '1'), 100);

    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.oldValue).to.eql([options[1]]);
    expect(detail.newValue).to.eql([options[1], options[0]]);
  });

  it('triggers change event - item removed', async () => {
    const el = await fixture(
      html`<dt-connection
        name="custom-name"
        value="${JSON.stringify([options[0]])}"
        options="${JSON.stringify(options)}"
      ></dt-connection>`
    );

    setTimeout(() => {
      const optionBtn = el.shadowRoot.querySelector(
        `.selected-option button[data-value="1"]`
      );
      optionBtn.click();
    }, 100);

    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.oldValue).to.eql([options[0]]);
    expect(detail.newValue).to.eql([
      {
        ...options[0],
        delete: true,
      },
    ]);
  });

  it('filters options on text input', async () => {
    const el = await fixture(
      html`<dt-connection options="${JSON.stringify(options)}"></dt-connection>`
    );
    const input = el.shadowRoot.querySelector('input');
    const optionsList = el.shadowRoot.querySelector('.option-list');
    input.focus();

    await sendKeys({
      type: 'Sec',
    });

    expect(optionsList).to.be.displayed;
    expect(optionsList).to.contain('button[value="2"]');
    expect(optionsList).not.to.contain('button[value="1"]');
    expect(optionsList).not.to.contain('button[value="3"]');
  });

  it('filters options on option selection', async () => {
    const el = await fixture(
      html`<dt-connection options="${JSON.stringify(options)}"></dt-connection>`
    );
    const input = el.shadowRoot.querySelector('input');
    const optionsList = el.shadowRoot.querySelector('.option-list');
    input.focus();
    await clickOption(el, '1');

    expect(optionsList).not.to.contain('button[value="1"]');
    expect(optionsList).to.contain('button[value="2"]');
    expect(optionsList).to.contain('button[value="3"]');
  });

  it('loads options from event if no options provided', async () => {
    const el = await fixture(
      html`<dt-connection
        name="custom-name"
        value="${JSON.stringify([options[1]])}"
        .open="${true}"
      ></dt-connection>`
    );
    const input = el.shadowRoot.querySelector('input');
    input.focus();

    setTimeout(() => sendKeys({ type: 'o' }), 100);

    const { detail } = await oneEvent(el, 'dt:get-data');

    expect(detail.field).to.equal('custom-name');
    expect(detail.query).to.equal('o');
    expect(detail.onSuccess).to.exist;

    await detail.onSuccess([options[0]]);

    const optionList = el.shadowRoot.querySelector('.option-list');
    expect(optionList).to.contain('button[value="1"]');
    expect(optionList).not.to.contain('button[value="2"]');
    expect(optionList).not.to.contain('button[value="3"]');
  });

  it('allows adding new option', async () => {
    const el = await fixture(
      html`<dt-connection options="${JSON.stringify(options)}" allowAdd></dt-connection>`
    );
    el.shadowRoot.querySelector('input').focus();

    await sendKeys({
      type: 'new',
    });

    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    expect(el.value).not.to.be.empty;
    expect(el.value).to.eql([
      {
        id: 'new',
        label: 'new',
        isNew: true,
      },
    ]);
  });

  it('disables inputs', async () => {
    const el = await fixture(
      html`<dt-connection
        disabled
        value="${JSON.stringify([options[1]])}"
        options="${JSON.stringify(options)}"
      ></dt-connection>`
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
      html`<dt-connection options="${JSON.stringify(options)}" allowAdd></dt-connection>`
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
