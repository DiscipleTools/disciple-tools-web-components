import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import {
  argTypes,
  buttonContexts,
} from '../../../stories-theme.js';
import { onSubmit } from '../../../stories-utils.js';
import './dt-button.js';

export default {
  title: 'Components/Form/Button',
  component: 'dt-button',
  argTypes: {
    context: {
      control: 'select',
      options: ['primary', ...buttonContexts],
      defaultValue: 'primary',
    },
    ...argTypes,
  },
  args: {
    onClick: action('on-click'),
  },
  render: args => {
    const { slot = 'Button' } = args;
    return html`
    <dt-button
      context="${ifDefined(args.context)}"
      type="${ifDefined(args.type)}"
      ?outline="${args.outline}"
      ?round="${args.round}"
      ?disabled="${args.disabled}"
      title="${ifDefined(args.title)}"
      @click=${args.onClick}
    >${slot}</dt-button>
  `;
  },
};

export const Default = {
  name: 'Context: default',
  args: {
  }
};
export const ContextPrimary = {
  name: 'Context: primary',
  args: {
    context: 'primary',
  }
};
export const ContextLink = {
  name: 'Context: link',
  args: {
    context: 'link',
  }
};
export const ContextAlert = {
  name: 'Context: alert',
  args: {
    context: 'alert',
  }
};
export const ContextCaution = {
  name: 'Context: caution',
  args: {
    context: 'caution',
  }
};
export const ContextSuccess = {
  name: 'Context: success',
  args: {
    context: 'success',
  }
};
export const ContextInactive = {
  name: 'Context: inactive',
  args: {
    context: 'inactive',
  }
};
export const ContextDisabled = {
  name: 'Context: disabled',
  args: {
    context: 'disabled',
  }
};

export const Disabled = {
  args: {
    context: 'primary',
    disabled: true,
  }
};

export const OutlineDefault = {
  args: {
    outline: true,
    context: 'primary',
  }
};
export const OutlineLink = {
  args: {
    outline: true,
    context: 'link',
  }
};
export const OutlineAlert = {
  args: {
    outline: true,
    context: 'alert',
  }
};
export const OutlineCaution = {
  args: {
    outline: true,
    context: 'caution',
  }
};
export const OutlineSuccess = {
  args: {
    outline: true,
    context: 'success',
  }
};
export const OutlineInactive = {
  args: {
    outline: true,
    context: 'inactive',
  }
};
export const OutlineDisabled = {
  args: {
    outline: true,
    context: 'disabled',
  }
};

export const RoundPrimary = {
  args: {
    round: true,
    context: 'primary',
  }
};

export const FormSubmit = {
  render: (args) => {
    const { slot = 'Button' } = args;
    return html`
      <form method="post" @submit="${(e) => onSubmit(e)}">
        <div><input type="text" name="name" value="John Doe"/></div>

        <dt-button
          context="${ifDefined(args.context)}"
          type="${ifDefined(args.type)}"
          ?outline="${args.outline}"
          ?round="${args.round}"
          title="${ifDefined(args.title)}"
          @click=${args.onClick}
        >${slot}
        </dt-button>
      </form>
    `;
  },
  args: {
    context: 'primary',
    type: 'submit',
  }
};
