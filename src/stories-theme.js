export const argTypes = {
  primaryColor: { control: 'color' },
  primaryColorLight0: { control: 'color' },
  primaryColorLight1: { control: 'color' },
  gray0: { control: 'color' },
  gray1: { control: 'color' },
  black: { control: 'color' },

  textColor: { control: 'color' },
  textColorInverse: { control: 'color' },

  surface0: { control: 'color' },
  surface1: { control: 'color' },
  surface2: { control: 'color' },

  borderColor: { control: 'color' },

  shadow0: { control: 'text' },
  shadow1: { control: 'text' },

  alertColor: { control: 'color' },
  cautionColor: { control: 'color' },
  successColor: { control: 'color' },
  inactiveColor: { control: 'color' },
  disabledColor: { control: 'color' },

  fontFamily: { control: 'text' },

  formBorderColor: { control: 'color' },
  formBackgroundColor: { control: 'color' },
  formDisabledBackgroundColor: { control: 'color' },
  formTextColor: { control: 'color' },
  formTextColorInverse: { control: 'color' },

  checkmarkWidth: { control: 'text' },
  checkmarkColor: { control: 'color' },

  connectionIconFill: { control: 'color' },

  multiSelectTextColor: { control: 'color' },
  multiSelectBackgroundColor: { control: 'color' },
  multiSelectTagBorderColor: { control: 'color' },
  multiSelectTagBackgroundColor: { control: 'color' },
  multiSelectOptionHoverBackground: { control: 'color' },

  singleSelectTextColor: { control: 'color' },
  singleSelectTextColorInverse: { control: 'color' },

  dttextColor: { control: 'color' },
  dttextColorInverse: { control: 'color' },
  textBackgroundColor: { control: 'color' },
  textBorderColor: { control: 'color' },
  textDisabledBackgroundColor: { control: 'color' },

  textareaBorderColor: { control: 'color' },
  textareaBackgroundColor: { control: 'color' },
  textareaDisabledBackgroundColor: { control: 'color' },
  textareaTextColor: { control: 'color' },
  textareaTextcolorInverse: { control: 'color' },

  labelFontSize: { control: 'text' },
  labelFontWeight: { control: 'text' },
  labelTooltipColor: { control: 'color' },
  labelTooltipBackground: { control: 'color' },

  spinnerColor1: { control: 'color' },
  spinnerColor2: { control: 'color' },

  tileFontFamily: { control: 'color' },
  tileFontSize: { control: 'text' },
  tileFontWeight: { control: 'text' },
  tileBackground: { control: 'color' },
  tileBorderColor: { control: 'color' },
  tileShadow: { control: 'color' },
  tileHeaderColor: { control: 'color' },
};

export const themes = {
  default: {
    name: 'Default',
    args: {
      primaryColor: '#3f729b',
      primaryColorLight0: '#ecf5fc',
      primaryColorLight1: '#c2e0ff',

      gray0: '#666',
      gray1: '#919191',
      black: '#0a0a0a',

      textColor: '#0a0a0a',
      textColorInverse: '#fefefe',

      surface0: '#e2e2e2',
      surface1: '#fefefe',
      surface2: '#f5f5f5',

      borderColor: '#cecece',

      shadow0: '0 2px 4px rgb(0 0 0 / 25%)',
      shadow1: '0 4px 4px rgb(0 0 0 / 25%)',

      alertColor: '#cc4b37',
      cautionColor: '#f2c962',
      successColor: '#4caf50',
      inactiveColor: '#808080',
      disabledColor: '#e6e6e6',

      fontFamily: 'Helvetica, Arial, sans-serif',

      formBorderColor: 'var(--border-color)',
      formBackgroundColor: 'var(--surface-1)',
      formDisabledBackgroundColor: 'var(--disabled-color)',
      formTextColor: 'var(--textcolor)',
      formTextColorInverse: 'var(--textcolor-inverse)',

      checkmarkWidth: '3px',
      checkmarkColor: 'var(--success-color)',

      connectionIconFill: 'var(--primary-color)',

      multiSelectTextColor: 'var(--textcolor)',
      multiSelectBackgroundColor: 'var(--surface-1)',
      multiSelectTagBorderColor: 'var(--primary-color-light-1)',
      multiSelectTagBackgroundColor: 'var(--primary-color-light-0)',
      multiSelectOptionHoverBackground: 'var(--surface-2)',

      singleSelectTextColor: 'var(--dt-form-textcolor)',
      singleSelectTextColorInverse: 'var(--dt-form-textcolor-inverse)',

      dttextColor: 'var(--dt-form-textcolor)',
      dttextColorInverse: 'var(--dt-form-textcolor-inverse)',
      textBackgroundColor: 'var(--dt-form-background-color)',
      textBorderColor: 'var(--dt-form-border-color)',
      textDisabledBackgroundColor: 'var(--dt-form-disabled-background-color)',

      textareaBorderColor: 'var(--dt-form-border-color)',
      textareaBackgroundColor: 'var(--dt-form-background-color)',
      textareaDisabledBackgroundColor: 'var(--dt-form-disabled-background-color)',
      textareaTextColor: 'var(--dt-form-textcolor)',
      textareaTextcolorInverse: 'var(--dt-form-textcolor-inverse)',

      labelFontSize: '14px',
      labelFontWeight: '700',
      labelTooltipColor: 'var(--gray-0)',
      labelTooltipBackground: 'var(--surface-2)',

      spinnerColor1: 'var(--gray-1)',
      spinnerColor2: 'var(--black)',

      tileFontFamily: 'var(--font-family)',
      tileFontSize: '14px;',
      tileFontWeight: '700',
      tileBackground: 'var(--surface-1)',
      tileBorderColor: 'var(--border-color)',
      tileShadow: 'var(--shadow-0)',
      tileHeaderColor: 'var(--primary-color)',


    },
  },
};

function getArg(theme, argName) {
  return theme[argName] || themes.default.args[argName];
}
export function themeCss(args) {
  return `
  html {
    --primary-color: ${getArg(args, 'primaryColor')};
    --primary-color-light-1: ${getArg(args, 'primaryColorLight1')};
    --primary-color-light-0: ${getArg(args, 'primaryColorLight0')};
    --gray-0: ${getArg(args, 'gray0')};
    --gray-1: ${getArg(args, 'gray1')};
    --black: ${getArg(args, 'black')};

    --text-color: ${getArg(args, 'textColor')};
    --text-color-inverse: $getArg(args, 'textColorInverse');

    --surface-0: ${getArg(args, 'surface0')};
    --surface-1: ${getArg(args, 'surface1')};
    --surface-2: ${getArg(args, 'surface2')};

    --border-color: ${getArg(args, 'borderColor')};

    --shadow-0: ${getArg(args, 'shadow0')};
    --shadow-1: ${getArg(args, 'shadow1')};


    --alert-color: ${getArg(args, 'alertColor')};
    --caution-color: ${getArg(args, 'cautionColor')};
    --success-color: ${getArg(args, 'successColor')};
    --inactive-color: ${getArg(args, 'inactiveColor')};
    --disabled-color: ${getArg(args, 'disabledColor')};

    --font-family: ${getArg(args, 'fontFamily')};

    --dt-form-border-color: ${getArg(args, 'formBorderColor')};
    --dt-form-background-color: ${getArg(args, 'formBackgroundColor')};
    --dt-form-disabled-background-color: ${getArg(args, 'formDisabledBackgroundColor')};
    --dt-form-text-color: ${getArg(args, 'formTextColor')};
    --dt-form-text-color-inverse: ${getArg(args, 'formTextColorInverse')};
    --dt-form-text-border-color: ${getArg(args, 'formBorderColor')};

    --dt-checkmark-width: ${getArg(args, 'checkmarkWidth')};
    --dt-checkmark-color: ${getArg(args, 'checkmarkColor')};

    --dt-connection-icon-fill: ${getArg(args, 'connectionIconFill')};
    --dt-multi-select-text-color: ${getArg(args, 'multiSelectTextColor')};
    --dt-multi-select-background-color: ${getArg(args, 'multiSelectBackgroundColor')};
    --dt-multi-select-tag-border-color: ${getArg(args, 'multiSelectTagBorderColor')};
    --dt-multi-select-tag-background-color: ${getArg(args, 'multiSelectTagBackgroundColor')};
    --dt-multi-select-option-hover-background: ${getArg(args, 'multiSelectOptionHoverBackground')};

    --dt-single-select-text-color: ${getArg(args, 'singleSelectTextColor')};
    --dt-single-select-text-color-inverse: ${getArg(args, 'singleSelectTextColorInverse')};

    --dt-text-color: ${getArg(args, 'dttextColor')};
    --dt-text-color-inverse: ${getArg(args, 'dttextColorInverse')};
    --dt-text-background-color: ${getArg(args, 'textBackgroundColor')};
    --dt-text-border-color: ${getArg(args, 'textBorderColor')};
    --dt-text-disabled-background-color: ${getArg(args, 'textDisabledBackgroundColor')};
    --dt-textarea-border-color: ${getArg(args, 'textareaBorderColor')};
    --dt-textarea-background-color: ${getArg(args, 'textareaBackgroundColor')};
    --dt-textarea-disabled-background-color: ${getArg(args, 'textareaDisabledBackgroundColor')};
    --dt-textarea-text-color: ${getArg(args, 'textareaTextColor')};
    --dt-textarea-text-color-inverse: ${getArg(args, 'textareaTextcolorInverse')};
    --dt-label-font-size: ${getArg(args, 'labelFontSize')};
    --dt-label-font-weight: ${getArg(args, 'labelFontWeight')};
    --dt-label-tooltip-color: ${getArg(args, 'labelTooltipColor')};
    --dt-label-tooltip-background: ${getArg(args, 'labelTooltipBackground')};
    --dt-spinner-color-1: ${getArg(args, 'spinnerColor1')};
    --dt-spinner-color-2: ${getArg(args, 'spinnerColor2')};
    --dt-tile-font-family: ${getArg(args, 'tileFontFamily')};
    --dt-tile-font-size: ${getArg(args, 'tileFontSize')};
    --dt-tile-font-weight: ${getArg(args, 'tileFontWeight')};
    --dt-tile-background: ${getArg(args, 'tileBackground')};
    --dt-tile-border-color: ${getArg(args, 'tileBorderColor')};
    --dt-tile-shadow: ${getArg(args, 'tileShadow')};
    --dt-tile-header-color: ${getArg(args, 'tileHeaderColor')};
  }
  `;
}
