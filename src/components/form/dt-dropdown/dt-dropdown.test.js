/* eslint-disable no-promise-executor-return */
import { fixture, html, expect } from '@open-wc/testing';

import './dt-dropdown.js';


const options = [
  { label: 'Option 1', icon: '/assets/circle-square-triangle.svg?v=2', isModal: true },
  { label: 'Option 2', icon: '/assets/arrow-user.svg', isModal: true },
  { label: 'Option 3', icon: '/assets/trash.svg', isModal: false, href: 'https://www.google.com' },
];

describe('dt-dropdown', () => {

  it('set label', async () => {
    const label = 'Custom Label';


    const dtDropdown = await fixture(html`
      <dt-dropdown
        label=${label} >
      </dt-dropdown>
    `);
    const button = dtDropdown.shadowRoot.querySelector('button');
    const buttonText = button.textContent.trim(); // Trim leading and trailing whitespace
    expect(buttonText).to.equal(`${label} \u25BC`);
  });


  it('check options in list', async () => {
    const selectedOptionLabel = 'Custom Label';

    const dtDropdown = await fixture(html`
      <dt-dropdown
      selectedOptionLabel=${selectedOptionLabel}
      .options=${options}>
      </dt-dropdown>
      `);

    const dropdownList = dtDropdown.shadowRoot.querySelector('ul.dt-dropdown-list');
    expect(dropdownList.querySelectorAll('li')).to.have.lengthOf(options.length);
  })

  it('check modal opening on button click', async () => {
    const dtDropdown = await fixture(html`
      <dt-dropdown
      selectedOptionLabel='Custom label'
      .options=${options}>
      </dt-dropdown>
      `)

      const button = dtDropdown.shadowRoot.querySelector('button');
  button.click();
  await dtDropdown.updateComplete;

  const modalElement = dtDropdown.shadowRoot.querySelector('.dt-dropdown-list li button.dt-modal')
  expect(modalElement).to.exist;


  })

  it('check list display on button hover', async()=>{

    const dtDropdown = await fixture(html`
      <dt-dropdown
      selectedOptionLabel='Custom label'
      .options=${options} >
      </dt-dropdown>
      `)

      const button = dtDropdown.shadowRoot.querySelector('button');
      const list = dtDropdown.shadowRoot.querySelector('ul.dt-dropdown-list');

      button.dispatchEvent(new MouseEvent('mouseover')); // Simulate mouseover event on the button
      await new Promise(resolve => setTimeout(resolve, 10)); // Wait for the event to trigger the display change

      expect(list.style.display).to.be.equal('block');  // Expect the list to be displayed after hover

      button.dispatchEvent(new MouseEvent('mouseleave')); // Simulate mouseleave event on the button
      await new Promise(resolve => setTimeout(resolve, 10));  // Wait for the event to trigger the display change

      expect(list.style.display).to.be.equal('none'); // Expect the list to be hidden after leaving the button

  })

  it('render options based on is modal property', async() => {
    const dtDropdown =await fixture(html`
      <dt-dropdown
      selectedOptionLabel='Custom label'
      .options=${options}>
      </dt-dropdown>
      `)

      const listItems = Array.from(dtDropdown.shadowRoot.querySelectorAll('ul.dt-dropdown-list li'));

      listItems.forEach((item,index) => {
        const option = options[index];

        if(option.isModal) {
          expect(item.querySelector('button.dt-modal')).to.exist; // Check if dt-modal component exists
        }else{
          expect(item.querySelector('button')).to.exist; // Check if button exists for non-modal options
        }
      })
  })


 });
