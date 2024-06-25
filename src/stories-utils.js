import { html } from 'lit';

export const LocaleDecorator = (story, context) =>
  html`<div
    lang="${context?.args?.lang || 'en'}"
    dir="${context?.args?.dir || 'ltr'}"
  >
    ${story()}
  </div>`;

export const FormDecorator = story => html`<form method="post" onsubmit="onFormSubmit(event)" style="background-color: var(--surface-0);">
    ${story()}

    <button type="submit">Submit</button>

    <pre><output></output></pre>
  </form>
  <script>
    function onFormSubmit(event) {
      if (event) {
        event.preventDefault();
      }

      const output = document.querySelector('output');

      const form = event.target;

      /** Get all of the form data */
      const formData = new FormData(form);
      const data = {
        form: {},
        el: {},
      };
      formData.forEach((value, key) => (data.form[key] = value));
      Array.from(form.elements).forEach((el) => {
        if (el.localName.startsWith('dt-')) {
          data.el[el.name] = el.value;
        }
      });
      output.innerHTML = JSON.stringify(data, null, 2);
    }
  </script> `;
