import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-multiselect-button-group.js';

const customButtons =  [
  {
    "Button 1": {
        "label": "Button 1",
        "description": "",
        "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    },
    "Button 2": {
        "label": "Button 2",
        "description": "",
        "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    },
    "Button 3": {
        "label": "Button 3",
        "description": "",
        "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    },
    "Button 4": {
        "label": "Button 4",
        "description": "",
        "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    }
  }
];

async function wait(ms) {
  return new Promise(r => {
    setTimeout(r, ms);
  });
}

describe('dt-multi-select', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<dt-multiselect-buttons-group
        buttons="${JSON.stringify(customButtons)}"
      ></dt-multiselect-buttons-group>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });

  it('sets buttons', async () => {
    const el = await fixture(
      html`<dt-multiselect-buttons-group
        buttons="${JSON.stringify(customButtons)}"
      ></dt-multiselect-buttons-group>`
    );
    const buttons = el.shadowRoot.querySelectorAll('dt-button');

    expect(buttons).to.have.lengthOf(4);
    expect(el.shadowRoot.querySelector('dt-button#Button\\ 1')).to.exist;
    expect(el.shadowRoot.querySelector('dt-button#Button\\ 2')).to.exist;
    expect(el.shadowRoot.querySelector('dt-button#Button\\ 3')).to.exist;
    expect(el.shadowRoot.querySelector('dt-button#Button\\ 4')).to.exist;
  });

  it('selects option via mouse', async () => {
    console.log('selects option via mouse')
    const el = await fixture(
      html`<dt-multiselect-buttons-group
        buttons="${JSON.stringify(customButtons)}"
      ></dt-multiselect-buttons-group>`
    );
    const input = el.shadowRoot.querySelector('dt-button#Button\\ 1');
    input.focus();
    await wait(50); // wait for UI update

    input.click();
    await wait(100);
    expect(input).to.match('[context=success]');
  });

  // it('selects option via keyboard', async () => {
  //   console.log('selects option via keyboard');
  //   const el = await fixture(
  //     html`<dt-multiselect-buttons-group
  //       buttons="${JSON.stringify(customButtons)}"
  //     ></dt-multiselect-buttons-group>`
  //   );
  //   const input = el.shadowRoot.querySelector('dt-button#Button\\ 1');
  //   console.log('input is');
  //   console.log(input);
  //   input.focus();
  //   await wait(50); // wait for UI update

  //   await sendKeys({ press: 'Tab' }); // Move focus to the next button
  //   await sendKeys({ press: 'Enter' }); // Select the focused button

  //   await wait(100);
  //   console.log('input is');
  //   console.log(input);

  //   expect(input).to.match('[context=success]');
  //   expect(el.shadowRoot.querySelector('dt-button#Button\\ 2')).to.match('[context=success]');
  // });

  it('updates value attribute', async () => {
    const el = await fixture(
      html`<dt-multiselect-buttons-group
        buttons="${JSON.stringify(customButtons)}"
      ></dt-multiselect-buttons-group>`
    );

    const input = el.shadowRoot.querySelector('dt-button#Button\\ 1');

    input.focus();
    await wait(50); // wait for UI update

    input.click();
    await wait(100);

    expect(el).to.have.attr('value', JSON.stringify(['Button 1']));
  });
});
