import { html } from 'lit';
// import { action } from '@storybook/addon-actions';

export const LocaleDecorator = (story, context) =>
  html`<div
    lang="${context?.args?.lang || 'en'}"
    dir="${context?.args?.dir || 'ltr'}"
  >
    ${story()}
  </div>`;

export function onAutoSave(event) {
  if (event?.target) {
    event.target.setAttribute('loading', true);
    console.log(
      `Value changed from ${JSON.stringify(
        event.detail.oldValue,
      )} to ${JSON.stringify(event.detail.newValue)}`,
    );
    setTimeout(() => {
      event.target.removeAttribute('loading');
      event.target.setAttribute('saved', true);
    }, 1000);
  }
}

export function onSubmit(event) {
  if (event) {
    event.preventDefault();
  }
  const form = event.target;

  /** Get all of the form data */
  const formData = new FormData(form);
  const data = {
    form: {},
    el: {},
  };
  formData.forEach((value, key) => (data.form[key] = value));
  Array.from(form.elements).forEach(el => {
    if (el.localName.startsWith('dt-')) {
      data.el[el.name] = el.value;
    }
  });
  action('on-submit')(data);
}
export function clearForm(event) {
  if (event) {
    event.preventDefault();
  }
  const form = event.target;
  Array.from(form.elements).forEach(el => {
    if (el.localName.startsWith('dt-')) {
      el.reset();
    }
  });
}
export const FormDecorator = story =>
  html`<form
    method="post"
    @submit="${e => onSubmit(e)}"
    @reset="${e => clearForm(e)}"
    style="background-color: var(--surface-0);"
  >
    ${story()}

    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>`;
