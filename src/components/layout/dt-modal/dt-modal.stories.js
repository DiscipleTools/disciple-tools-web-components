import { html } from 'lit';
import {
  themes,
  themeCss,
  argTypes,
  contexts,
} from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';

import './dt-modal.js';

export default {
  title: 'Components/Layout/Modal',
  component: 'dt-modal',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    context: {
      control: 'select',
      options: ['none', ...contexts],
      defaultValue: 'default',
    },
    isHelp: {
      control: 'boolean',
      defaultValue: false,
    },
    isOpen: {
      control: 'boolean',
      defaultValue: false,
    },
    hideHeader: {
      control: 'boolean',
      defaultValue: false,
    },

    ...argTypes,
  },
};

const Template = args => {
  const {
    slot = html`<h2>
        Mauris Cursus<span
          style="font-size: 10px; padding-inline-start: 1em"
        ></span>
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <ul>
        <li><strong>feugiat vivamus at</strong></li>
        <li><strong>quis enim lobortis</strong></li>
        <li><strong>tincidunt arcu</strong></li>
        <li><strong>rhoncus mattis</strong></li>
      </ul>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Etiam non quam lacus
        suspendisse faucibus interdum. Nunc lobortis mattis aliquam faucibus. Mi
        quis hendrerit dolor magna eget est lorem. Venenatis tellus in metus
        vulputate eu scelerisque. Sed faucibus turpis in eu mi bibendum neque
        egestas. Id aliquet lectus proin nibh nisl. Nunc eget lorem dolor sed
        viverra ipsum nunc. Non odio euismod lacinia at quis risus. Nibh sit
        amet commodo nulla facilisi nullam. Nibh ipsum consequat nisl vel. Nisl
        nisi scelerisque eu ultrices vitae auctor. Consectetur adipiscing elit
        ut aliquam. Penatibus et magnis dis parturient montes. Lobortis mattis
        aliquam faucibus purus in. Habitant morbi tristique senectus et netus.
        Id porta nibh venenatis cras sed felis. Dui nunc mattis enim ut tellus
        elementum sagittis vitae et. Dignissim diam quis enim lobortis
        scelerisque. Venenatis tellus in metus vulputate eu. Metus dictum at
        tempor commodo ullamcorper a. Tincidunt vitae semper quis lectus. Id
        venenatis a condimentum vitae sapien pellentesque habitant morbi.
        Consectetur lorem donec massa sapien faucibus et molestie ac. Iaculis at
        erat pellentesque adipiscing commodo elit at. Amet tellus cras
        adipiscing enim eu. Id volutpat lacus laoreet non curabitur gravida arcu
        ac tortor. Ac ut consequat semper viverra nam libero. Condimentum
        lacinia quis vel eros donec ac odio. Commodo odio aenean sed adipiscing
        diam donec adipiscing tristique risus. Hac habitasse platea dictumst
        quisque sagittis. Lectus proin nibh nisl condimentum id venenatis a
        condimentum vitae. Sagittis id consectetur purus ut faucibus pulvinar
        elementum integer enim. Imperdiet dui accumsan sit amet nulla. Viverra
        maecenas accumsan lacus vel. Sed odio morbi quis commodo odio aenean sed
        adipiscing. Scelerisque purus semper eget duis. Urna cursus eget nunc
        scelerisque viverra mauris. Et tortor consequat id porta nibh. Id eu
        nisl nunc mi ipsum. Et malesuada fames ac turpis egestas. Nisl vel
        pretium lectus quam id leo in. Tempus egestas sed sed risus pretium quam
        vulputate dignissim suspendisse. Pharetra diam sit amet nisl suscipit
        adipiscing. Fermentum et sollicitudin ac orci phasellus egestas. Lectus
        urna duis convallis convallis tellus id. Amet purus gravida quis blandit
        turpis cursus in hac habitasse. Venenatis tellus in metus vulputate eu
        scelerisque. Posuere morbi leo urna molestie at elementum eu facilisis
        sed. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Sit
        amet porttitor eget dolor morbi non arcu risus quis. Est sit amet
        facilisis magna etiam tempor. Id diam vel quam elementum pulvinar. Hac
        habitasse platea dictumst quisque sagittis purus sit amet. Sodales ut
        etiam sit amet nisl purus in. Pretium aenean pharetra magna ac. Iaculis
        nunc sed augue lacus viverra vitae congue eu consequat. Lacus viverra
        vitae congue eu. Nisi est sit amet facilisis magna. Nunc lobortis mattis
        aliquam faucibus purus. Enim facilisis gravida neque convallis a.
        Suspendisse ultrices gravida dictum fusce ut placerat. Condimentum id
        venenatis a condimentum vitae sapien pellentesque habitant. Venenatis
        urna cursus eget nunc scelerisque. Euismod nisi porta lorem mollis
        aliquam ut. In hac habitasse platea dictumst quisque sagittis purus sit
        amet. Sagittis id consectetur purus ut faucibus pulvinar elementum
        integer. Ut porttitor leo a diam sollicitudin tempor id eu. Enim neque
        volutpat ac tincidunt vitae semper quis. Ultrices eros in cursus turpis.
      </p>`,
  } = args;
  return html`
    <style>
      ${themeCss(args)} ul {
        margin-left: 1.25rem;
        padding: 0;
        line-height: 1.6;
        list-style-type: disc;
        list-style-position: outside;
        margin-bottom: 1rem;
      }
      li {
        font-size: inherit;
      }
      a {
        color: #3f729b;
        cursor: pointer;
        line-height: inherit;
        text-decoration: none;
      }
    </style>
    <dt-modal
      title="${args.title}"
      context="${args.context}"
      ?isHelp="${args.isHelp}"
      ?isopen="${args.isOpen}"
      ?hideHeader="${args.hideHeader}"
      buttonclass="${JSON.stringify(args.buttonClass)}"
      buttonstyle="${JSON.stringify(args.buttonStyle)}"
      buttonLabel="${args.buttonLabel?args.buttonLabel:'Open Modal'}"
      imageSrc="${args.imageSrc?args.imageSrc:''}"
      imageStyle="${JSON.stringify(args.imageStyle)}"
    >
      <span slot="content"> ${slot} </span>
    </dt-modal>
  `;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
  context: 'default',
  isHelp: false,
};

export const HelpModal = Template.bind({});
HelpModal.args = {
  title: 'Help Modal Title',
  context: 'default',
  isHelp: true,
};

export const HiddenHeaderModal = Template.bind({});
HiddenHeaderModal.args = {
  title: 'Hidden Header Modal Title',
  context: 'default',
  isHelp: true,
  isOpen: true,
  hideHeader: true,
};

export const OpenedModal = Template.bind({});
OpenedModal.args = {
  title: 'Open on Load Modal',
  context: 'default',
  isHelp: true,
  isOpen: true,
};

export const CustomButtonStyle = Template.bind({});
CustomButtonStyle.args = {
  buttonClass: {
    alert: true,
  },
  buttonStyle: {
    padding: '40px',
  },
};

export const DuplicateDetected = Template.bind({});
DuplicateDetected.args = {
  title: 'Duplicate Detected',
  class: 'duplicates-detected',
  buttonClass: {"duplicates-detected-button":true},
  buttonLabel: 'Duplicate Detected',
  buttonStyle: {"background-color":"transparent","border":"1px","color":"#3f729b","border-style":"solid","font-weight":"600","border-color":"#3f729b","display":""},
  imageStyle: {"filter":"hue-rotate(0deg)"},
  imageSrc: "/assets/triangle-exclamation-solid.svg",
  isHelp: false,
  isOpen: false,
  slot: html`<p>
      A duplicate record has been detected. Please review the data and try
      again.
    </p>`,
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];

LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  title: 'عربي',
  slot: html`<p>
      و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل الحصول على
      ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر بالسعادة
      التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم عنه
      بعض المتعة ؟
    </p>
    <ul>
      <li>
        ها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر
        بأنه لمن.
      </li>
      <li>نتيجة لظروف ما قد تكمن السعاده فيما نتحمله م</li>
      <li>الألم الذي ربما تنجم عنه بعض ا.</li>
    </ul> `,
  context: 'default',
  isHelp: true,
  isOpen: true,
};
