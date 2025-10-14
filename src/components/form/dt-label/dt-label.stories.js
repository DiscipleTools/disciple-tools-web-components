import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-label.js';

export default {
  title: 'Components/Form/Label',
  component: 'dt-label',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    ...argTypes,
  },
  render: args => {
    const {
      label = 'Field Name',
      icon,
      iconAltText,
      privateLabel,
      slotContent,
    } = args;
    return html`
      <dt-label
        ?private="${args.private}"
        privateLabel="${privateLabel}"
        icon="${icon}"
        iconAltText="${iconAltText}"
      >
        ${label} ${slotContent}
      </dt-label>
    `;
  },
};

export const Basic = {
  args: {
    label: 'My Field Label',
  },
};

export const TextOverflow = {
  args: {
    label: 'My <Field> Label that is "long" & \'longer\' and longerer and longererer and longerererer',
  },
  globals: {
    viewport: 'mobile1',
  },
};

export const UrlIcon = {
  args: {
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
  }
};

export const ImgLabel = {
  args: {
    label: 'My Field Label',
    slotContent: html`<img
    slot="icon-start"
    src="https://placeholder.pics/svg/100/000000-C3C3C3/FFFFFF/icon"
    alt="icon"
  />`,
  }
};

export const SvgLabel = {
  args: {
    label: 'My Field Label',
    // prettier-ignore
    slotContent: html`<svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><linearGradient id="lg"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#c3c3c3"/></linearGradient><rect x="2" y="2" width="96" height="96" style="fill:url(#lg);stroke:#ffffff;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="monospace, sans-serif" fill="#ffffff">icon</text></svg>`,
  }
};

export const Private = {
  args: {
    label: 'My Field Label',
    private: true,
  }
};

export const PrivateCustomTooltip = {
  args: {
    label: 'My Field Label',
    private: true,
    privateLabel: 'Add other language content here',
  }
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    private: true,
  }
};
