import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-label.js';

export default {
  title: 'Form/dt-label',
  component: 'dt-label',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    ...argTypes,
  },
};

const Template = args => {
  const {
    label = 'Field Name',
    icon,
    iconAltText,
    privateLabel,
    slotContent,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-label
      ?private="${args.private}"
      privateLabel="${privateLabel}"
      icon="${icon}"
      iconAltText="${iconAltText}"
    >
      ${label} ${slotContent}
    </dt-label>
  `;
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'My Field Label',
};

export const UrlIcon = Template.bind({});
UrlIcon.args = {
  icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
};

export const ImgLabel = Template.bind({});
ImgLabel.args = {
  label: 'My Field Label',
  slotContent: html`<img
    slot="icon-start"
    src="https://placeholder.pics/svg/100/000000-C3C3C3/FFFFFF/icon"
    alt="icon"
  />`,
};

export const SvgLabel = Template.bind({});
SvgLabel.args = {
  label: 'My Field Label',
  // prettier-ignore
  slotContent: html`<svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><linearGradient id="lg"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#c3c3c3"/></linearGradient><rect x="2" y="2" width="96" height="96" style="fill:url(#lg);stroke:#ffffff;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="monospace, sans-serif" fill="#ffffff">icon</text></svg>`,
};

export const Private = Template.bind({});
Private.args = {
  label: 'My Field Label',
  private: true,
};

export const PrivateCustomTooltip = Template.bind({});
PrivateCustomTooltip.args = {
  label: 'My Field Label',
  private: true,
  privateLabel: 'Add other language content here',
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'اسم الإدخال',
  private: true,
};
