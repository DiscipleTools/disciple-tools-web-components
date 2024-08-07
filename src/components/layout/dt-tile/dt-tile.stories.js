import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import './dt-tile.js';
import { LocaleDecorator } from '../../../stories-utils.js';

import '../../form/dt-label/dt-label.js';
import '../../form/dt-text/dt-text.js';

export default {
  title: 'Components/Layout/Tile',
  component: 'dt-tile',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    ...argTypes,
  },
};

const Template = args => html`
  <style>
    ${themeCss(args)}
  </style>
  <dt-tile
    title="${args.title}"
    ?expands="${args.expands}"
    ?collapsed="${args.collapsed}"
  >
    <div>
      <dt-label>Field 1</dt-label>
      <dt-text value="Lorem Ipsum"></dt-text>
    </div>
    <div>
      <dt-label>Field 2</dt-label>
      <dt-text value="Lorem Ipsum"></dt-text>
    </div>
    <div>
      <dt-label>Field 3</dt-label>
      <dt-text value="Lorem Ipsum"></dt-text>
    </div>
    <div>
      <dt-label>Field 4</dt-label>
      <dt-text value="Lorem Ipsum"></dt-text>
    </div>
    <div>
      <dt-label>Field 5</dt-label>
      <dt-text value="Lorem Ipsum"></dt-text>
    </div>
  </dt-tile>
`;

const templateArabic = args => html`
  <style>
    ${themeCss(args)}
  </style>
  <dt-tile
    title="${args.title}"
    ?expands="${args.expands}"
    ?collapsed="${args.collapsed}"
  >
    <div>
      <dt-label>مجال ١</dt-label>
      <dt-text value="إدخال النص"></dt-text>
    </div>
    <div>
      <dt-label>مجال ٢</dt-label>
      <dt-text value="إدخال النص"></dt-text>
    </div>
    <div>
      <dt-label>مجال ٣</dt-label>
      <dt-text value="إدخال النص"></dt-text>
    </div>
    <div>
      <dt-label>مجال ٤</dt-label>
      <dt-text value="إدخال النص"></dt-text>
    </div>
    <div>
      <dt-label>مجال ٥</dt-label>
      <dt-text value="إدخال النص"></dt-text>
    </div>
  </dt-tile>
`;

export const Basic = Template.bind({});
Basic.args = {
  title: 'My Tile',
};

export const Expands = Template.bind({});
Expands.args = {
  title: 'My Tile',
  expands: true,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  title: 'My Tile',
  expands: true,
  collapsed: true,
};

export const LocalizeRTL = templateArabic.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  title: 'عربي',
  lang: 'ar',
  dir: 'rtl',
  expands: true,
  collapsed: false,
};
