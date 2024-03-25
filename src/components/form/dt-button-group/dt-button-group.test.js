import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import './dt-button-group.js';

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
async function wait(ms) {
  return new Promise(r => {
    setTimeout(r, ms);
  });
}

async function clickOption(el, id) {
  const optionBtn = el.shadowRoot.querySelector(
    `.button[value=${id}]`
  );

  await wait(50); // wait for UI update

  optionBtn.click();
  await wait(100);
}

describe('dt-button-group', () => {

  it('sets options', async () => {
    const el = await fixture(
      html`<dt-button-group
        options="${JSON.stringify(options)}"
      ></dt-button-group>`
    );
    const optionList = el.shadowRoot.querySelector('.button-group');

    expect(optionList.children).to.have.lengthOf(3);
    expect(optionList).to.contain('button[value=opt1]');
    expect(optionList).to.contain('button[value=opt2]');
    expect(optionList).to.contain('button[value=opt3]');

    expect(optionList).to.be.displayed;
  });
});
