import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-multi-select-button-group.js';

const options =  [
    {
      'id': 'button1',
      'label': 'Button 1',
      'icon': 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
    },
    {
      'id': 'button2',
      'label': 'Button 2',
      'icon': 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
    },
    {
      'id': 'button3',
      'label': 'Button 3',
      'icon': 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
    },
    {
      'id': 'button4',
      'label': 'Button 4',
      'icon': 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
    }
];

async function wait(ms) {
  return new Promise(r => {
    setTimeout(r, ms);
  });
}

describe('dt-multi-select-button-group', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        buttons="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });

  it('sets options', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    const buttons = el.shadowRoot.querySelectorAll('dt-button');

    expect(buttons).to.have.lengthOf(4);
    expect(el.shadowRoot.querySelector('dt-button[value=button1]')).to.exist;
    expect(el.shadowRoot.querySelector('dt-button[value=button2]')).to.exist;
    expect(el.shadowRoot.querySelector('dt-button[value=button3]')).to.exist;
    expect(el.shadowRoot.querySelector('dt-button[value=button4]')).to.exist;
  });

  it('sets selection from attribute', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        value="${JSON.stringify(['button1', 'button2'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    const container = el.shadowRoot.querySelector('.button-group');

    expect(el.shadowRoot.querySelector('dt-button[value=button1]')).to.have.attribute('context', 'success');
    expect(el.shadowRoot.querySelector('dt-button[value=button2]')).to.have.attribute('context', 'success');
    expect(el.shadowRoot.querySelector('dt-button[value=button3]')).to.have.attribute('context', 'inactive');
    expect(el.shadowRoot.querySelector('dt-button[value=button4]')).to.have.attribute('context', 'inactive');
  });

  it('selects option via mouse', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    const button1 = el.shadowRoot.querySelector('dt-button[value=button1]');
    button1.focus();
    button1.click();
    await wait(100);
    expect(button1).to.have.attribute('context', 'success');
    expect(el.value).to.eql(['button1']);
  });

  it('selects option via keyboard: spacebar', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    const input = el.shadowRoot.querySelector('dt-button[value=button1]');
    input.focus();
    await wait(50); // wait for UI update

    await sendKeys({ press: 'Tab' }); // Move focus to the next button
    await sendKeys({ press: 'Space' }); // Select the focused button

    await wait(100);

    expect(input).to.have.attribute('context','success');
    expect(el.shadowRoot.querySelector('dt-button[value=button2]'))
      .to.have.attribute('context', 'inactive');

    expect(el.value).to.eql(['button1']);
  });

  it('selects option via keyboard: enter', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    const input = el.shadowRoot.querySelector('dt-button[value=button1]');
    input.focus();
    await wait(50); // wait for UI update

    await sendKeys({ press: 'Tab' }); // Move focus to the next button
    await sendKeys({ press: 'Enter' }); // Select the focused button

    await wait(100);

    expect(input).to.have.attribute('context','success');
    expect(el.shadowRoot.querySelector('dt-button[value=button2]'))
      .to.have.attribute('context', 'inactive');

    expect(el.value).to.eql(['button1']);
  });

  it('updates value attribute', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    const button1 = el.shadowRoot.querySelector('dt-button[value=button1]');
    button1.focus();
    button1.click();
    await wait(100);
    expect(el).to.have.attr('value', JSON.stringify(['button1']));
  });

  it('prefixes removed options with hyphen', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        value="${JSON.stringify(['button1','button2'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    const button1 = el.shadowRoot.querySelector('dt-button[value=button1]');
    button1.focus();
    button1.click();
    await wait(100);

    expect(el.value).to.contain('button2');
    expect(el.value).to.contain('-button1');
  });

  it('adds previously removed value', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        value="${JSON.stringify(['-button1'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    const button1 = el.shadowRoot.querySelector('dt-button[value=button1]');
    button1.focus();
    button1.click();
    await wait(100);

    expect(el.value).to.contain('button1');
    expect(el.value).to.not.contain('-button1');
  });

  it('triggers change event - item added', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        name="custom-name"
        value="${JSON.stringify(['button2'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    setTimeout(() => {
      const button1 = el.shadowRoot.querySelector('dt-button[value=button1]');
      button1.focus();
      button1.click();
    });
    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.oldValue).to.eql(['button2']);
    expect(detail.newValue).to.eql(['button2', 'button1']);
  });

  it('triggers change event - item removed', async () => {
    const el = await fixture(
      html`<dt-multi-select-button-group
        name="custom-name"
        value="${JSON.stringify(['button1'])}"
        options="${JSON.stringify(options)}"
      ></dt-multi-select-button-group>`
    );
    setTimeout(() => {
      const button1 = el.shadowRoot.querySelector('dt-button[value=button1]');
      button1.focus();
      button1.click();
    });
    const { detail } = await oneEvent(el, 'change');

    expect(detail.field).to.equal('custom-name');
    expect(detail.oldValue).to.eql(['button1']);
    expect(detail.newValue).to.eql(['-button1']);
  });
});
