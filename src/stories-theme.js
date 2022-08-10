export const themes = {
  default: {
    name: 'light',
    args: {
      colorScheme: 'light',
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
      formTextColor: 'var(--text-color)',
      formTextColorInverse: 'var(--text-color-inverse)',

      checkmarkWidth: '3px',
      checkmarkColor: 'var(--success-color)',

      connectionIconFill: 'var(--primary-color)',

      multiSelectTextColor: 'var(--text-color)',
      multiSelectBackgroundColor: 'var(--surface-1)',
      multiSelectTagBorderColor: 'var(--primary-color-light-1)',
      multiSelectTagBackgroundColor: 'var(--primary-color-light-0)',
      multiSelectOptionHoverBackground: 'var(--surface-2)',

      singleSelectTextColor: 'var(--dt-form-text-color)',
      singleSelectTextColorInverse: 'var(--dt-form-text-color-inverse)',

      dttextColor: 'var(--dt-form-text-color)',
      dttextColorInverse: 'var(--dt-form-text-color-inverse)',
      textBackgroundColor: 'var(--dt-form-background-color)',
      textBorderColor: 'var(--dt-form-border-color)',
      textDisabledBackgroundColor: 'var(--dt-form-disabled-background-color)',

      textareaBorderColor: 'var(--dt-form-border-color)',
      textareaBackgroundColor: 'var(--dt-form-background-color)',
      textareaDisabledBackgroundColor: 'var(--dt-form-disabled-background-color)',
      textareaTextColor: 'var(--dt-form-text-color)',
      textareaTextcolorInverse: 'var(--dt-form-text-color-inverse)',

      labelFontSize: '14px',
      labelFontWeight: '700',
      labelTextColor: 'var(--dt-form-text-color)',
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

      background: 'var(--surface-0)',

    },
  },
  dark: {
    name: 'dark',
    args: {
      colorScheme: 'dark',
      primaryColor: 'hsla(207, 87%, 40%, 1)',
      primaryColorLight0: 'hsla(207, 87%, 46%, 1)',
      primaryColorLight1: 'hsla(207, 97%, 36%, 1)',

      gray0: '#666',
      gray1: '#919191',
      black: '#0a0a0a',

      textColor: '#fefefe',
      textColorInverse: '#999',

      surface0: '#212529',
      surface1: '#343a40',
      surface2: '#495057',
      surface3:'#868e96',

      borderColor: '#868e96v',

      shadow0: '0 2px 4px rgb(0 0 0 / 25%)',

      shadow1: '0 4px 4px rgb(0 0 0 / 25%)',

      alertColor: '#cc4b37',
      cautionColor: '#f2c962',
      successColor: '#4caf50',
      inactiveColor: '#808080',
      disabledColor: '#343a40',

      fontFamily: 'Helvetica, Arial, sans-serif',

      formBorderColor: 'var(--border-color)',
      formBackgroundColor: 'var(--surface-3)',
      formDisabledBackgroundColor: 'var(--disabled-color)',
      formTextColor: 'var(--text-color)',
      formTextColorInverse: 'var(--text-color-inverse)',

      checkmarkWidth: '3px',
      checkmarkColor: 'var(--success-color)',

      connectionIconFill: 'var(--primary-color)',

      multiSelectTextColor: 'var(--text-color)',
      multiSelectBackgroundColor: 'var(--surface-3)',
      multiSelectTagBorderColor: 'var(--primary-color-light-1)',
      multiSelectTagBackgroundColor: 'var(--primary-color-light-0)',
      multiSelectOptionHoverBackground: 'var(--surface-2)',

      singleSelectTextColor: 'var(--dt-form-text-color)',
      singleSelectTextColorInverse: 'var(--dt-form-text-color-inverse)',

      dttextColor: 'var(--dt-form-text-color)',
      dttextColorInverse: 'var(--dt-form-text-color-inverse)',
      textBackgroundColor: 'var(--dt-form-background-color)',
      textBorderColor: 'var(--dt-form-border-color)',
      textDisabledBackgroundColor: 'var(--dt-form-disabled-background-color)',

      textareaBorderColor: 'var(--dt-form-border-color)',
      textareaBackgroundColor: 'var(--dt-form-background-color)',
      textareaDisabledBackgroundColor: 'var(--dt-form-disabled-background-color)',
      textareaTextColor: 'var(--dt-form-text-color)',
      textareaTextcolorInverse: 'var(--dt-form-text-color-inverse)',

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

      background: 'var(--surface-0)',
    },
  },
  dim: {
    name: 'dim',
    args: {
      colorScheme: 'dark',
      primaryColor: 'hsla(207, 87%, 40%, 1)',
      primaryColorLight0: 'hsla(207, 87%, 46%, 1)',
      primaryColorLight1: 'hsla(207, 97%, 36%, 1)',

      gray0: '#666',
      gray1: '#919191',
      black: '#0a0a0a',

      textColor: '#fefefe',
      textColorInverse: '#999',

      surface0: 'hsla(207, 9%, 31%, 1)',
      surface1: 'hsla(207, 7%, 56%, 1)',
      surface2: 'hsla(207, 7%, 60%, 1)',
      surface3:'hsla(207, 4%, 70%, 1)',

      borderColor: '#868e96v',

      shadow0: '0 2px 4px rgb(0 0 0 / 25%)',

      shadow1: '0 4px 4px rgb(0 0 0 / 25%)',

      alertColor: '#cc4b37',
      cautionColor: '#f2c962',
      successColor: '#4caf50',
      inactiveColor: '#808080',
      disabledColor: '#343a40',

      fontFamily: 'Helvetica, Arial, sans-serif',

      formBorderColor: 'var(--border-color)',
      formBackgroundColor: 'var(--surface-3)',
      formDisabledBackgroundColor: 'var(--disabled-color)',
      formTextColor: 'var(--text-color)',
      formTextColorInverse: 'var(--text-color-inverse)',

      checkmarkWidth: '3px',
      checkmarkColor: 'var(--success-color)',

      connectionIconFill: 'var(--primary-color)',

      multiSelectTextColor: 'var(--text-color)',
      multiSelectBackgroundColor: 'var(--surface-3)',
      multiSelectTagBorderColor: 'var(--primary-color-light-1)',
      multiSelectTagBackgroundColor: 'var(--primary-color-light-0)',
      multiSelectOptionHoverBackground: 'var(--surface-2)',

      singleSelectTextColor: 'var(--dt-form-text-color)',
      singleSelectTextColorInverse: 'var(--dt-form-text-color-inverse)',

      dttextColor: 'var(--dt-form-text-color)',
      dttextColorInverse: 'var(--dt-form-text-color-inverse)',
      textBackgroundColor: 'var(--dt-form-background-color)',
      textBorderColor: 'var(--dt-form-border-color)',
      textDisabledBackgroundColor: 'var(--dt-form-disabled-background-color)',

      textareaBorderColor: 'var(--dt-form-border-color)',
      textareaBackgroundColor: 'var(--dt-form-background-color)',
      textareaDisabledBackgroundColor: 'var(--dt-form-disabled-background-color)',
      textareaTextColor: 'var(--dt-form-text-color)',
      textareaTextcolorInverse: 'var(--dt-form-text-color-inverse)',

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

      background: 'var(--surface-0)',
    },
  },
};

export const argTypes = {
  theme: { control: 'select', options: Object.keys(themes), defaultValue: ['default'] },
  RTL: { control: 'boolean', defaultValue: false },
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

function getArg(theme, argName) {
  if (theme.theme) {
    return themes[theme.theme].args[argName]
  }
  theme.theme = 'default';
  return themes.default.args[argName];
}

export function themeCss(theme) {
  return `
  html {
    --primary-color: ${theme.primaryColor ? theme.primaryColor : getArg(theme, 'primaryColor')};
    --primary-color-light-1: ${theme.primaryColorLight1 ? theme.primaryColorLight1 : getArg(theme, 'primaryColorLight1')};
    --primary-color-light-0: ${theme.primaryColorLight0 ? theme.primaryColorLight0 : getArg(theme, 'primaryColorLight0')};
    --gray-0: ${theme.gray0 ? theme.gray0 : getArg(theme, 'gray0')};
    --gray-1: ${theme.gray1 ? theme.gray1 : getArg(theme, 'gray1')};
    --black: ${theme.black ? theme.black : getArg(theme, 'black')};

    --text-color: ${theme.textColor ? theme.textColor : getArg(theme, 'textColor')};
    --text-color-inverse: ${theme.textColorInverse ? theme.textColorInverse : getArg(theme, 'textColorInverse')};

    --surface-0: ${theme.surface0 ? theme.surface0 : getArg(theme, 'surface0')};
    --surface-1: ${theme.surface1 ? theme.surface1 : getArg(theme, 'surface1')};
    --surface-2: ${theme.surface2 ? theme.surface2 : getArg(theme, 'surface2')};
    --surface-3: ${theme.surface3 ? theme.surface3 : getArg(theme, 'surface3')};

    --border-color: ${theme.borderColor ? theme.borderColor : getArg(theme, 'borderColor')};

    --shadow-0: ${theme.shadow0 ? theme.shadow0 : getArg(theme, 'shadow0')};
    --shadow-1: ${theme.shadow1 ? theme.shadow1 : getArg(theme, 'shadow1')};


    --alert-color: ${theme.alertColor ? theme.alertColor : getArg(theme, 'alertColor')};
    --caution-color: ${theme.cautionColor ? theme.cautionColor : getArg(theme, 'cautionColor')};
    --success-color: ${theme.successColor ? theme.successColor : getArg(theme, 'successColor')};
    --inactive-color: ${theme.inactiveColor ? theme.inactiveColor : getArg(theme, 'inactiveColor')};
    --disabled-color: ${theme.disabledColor ? theme.disabledColor : getArg(theme, 'disabledColor')};

    --font-family: ${theme.fontFamily ? theme.fontFamily : getArg(theme, 'fontFamily')};

    --dt-form-border-color: ${theme.formBorderColor ? theme.formBorderColor : getArg(theme, 'formBorderColor')};
    --dt-form-background-color: ${theme.formBackgroundColor ? theme.formBackgroundColor : getArg(theme, 'formBackgroundColor')};
    --dt-form-disabled-background-color: ${theme.formDisabledBackgroundColor ? theme.formDisabledBackgroundColor : getArg(theme, 'formDisabledBackgroundColor')};
    --dt-form-text-color: ${theme.formTextColor ? theme.formTextColor : getArg(theme, 'formTextColor')};
    --dt-form-text-color-inverse: ${theme.formTextColorInverse ? theme.formTextColorInverse : getArg(theme, 'formTextColorInverse')};
    --dt-form-text-border-color: ${theme.formBorderColor ? theme.formBorderColor : getArg(theme, 'formBorderColor')};

    --dt-checkmark-width: ${theme.checkmarkWidth ? theme.checkmarkWidth : getArg(theme, 'checkmarkWidth')};
    --dt-checkmark-color: ${theme.checkmarkColor ? theme.checkmarkColor : getArg(theme, 'checkmarkColor')};

    --dt-connection-icon-fill: ${theme.connectionIconFill ? theme.connectionIconFill : getArg(theme, 'connectionIconFill')};
    --dt-multi-select-text-color: ${theme.multiSelectTextColor ? theme.multiSelectTextColor : getArg(theme, 'multiSelectTextColor')};
    --dt-multi-select-background-color: ${theme.multiSelectBackgroundColor ? theme.multiSelectBackgroundColor : getArg(theme, 'multiSelectBackgroundColor')};
    --dt-multi-select-tag-border-color: ${theme.multiSelectTagBorderColor ? theme.multiSelectTagBorderColor : getArg(theme, 'multiSelectTagBorderColor')};
    --dt-multi-select-tag-background-color: ${theme.multiSelectTagBackgroundColor ? theme.multiSelectTagBackgroundColor : getArg(theme, 'multiSelectTagBackgroundColor')};
    --dt-multi-select-option-hover-background: ${theme.multiSelectOptionHoverBackground ? theme.multiSelectOptionHoverBackground : getArg(theme, 'multiSelectOptionHoverBackground')};

    --dt-single-select-text-color: ${theme.singleSelectTextColor ? theme.singleSelectTextColor : getArg(theme, 'singleSelectTextColor')};
    --dt-single-select-text-color-inverse: ${theme.singleSelectTextColorInverse ? theme.singleSelectTextColorInverse : getArg(theme, 'singleSelectTextColorInverse')};

    --dt-text-color: ${theme.dttextColor ? theme.dttextColor : getArg(theme, 'dttextColor')};
    --dt-text-color-inverse: ${theme.dttextColorInverse ? theme.dttextColorInverse : getArg(theme, 'dttextColorInverse')};
    --dt-text-background-color: ${theme.textBackgroundColor ? theme.textBackgroundColor : getArg(theme, 'textBackgroundColor')};
    --dt-text-border-color: ${theme.textBorderColor ? theme.textBorderColor : getArg(theme, 'textBorderColor')};
    --dt-text-disabled-background-color: ${theme.textDisabledBackgroundColor ? theme.textDisabledBackgroundColor : getArg(theme, 'textDisabledBackgroundColor')};
    --dt-textarea-border-color: ${theme.textareaBorderColor ? theme.textareaBorderColor : getArg(theme, 'textareaBorderColor')};
    --dt-textarea-background-color: ${theme.textareaBackgroundColor ? theme.textareaBackgroundColor : getArg(theme, 'textareaBackgroundColor')};
    --dt-textarea-disabled-background-color: ${theme.textareaDisabledBackgroundColor ? theme.textareaDisabledBackgroundColor : getArg(theme, 'textareaDisabledBackgroundColor')};
    --dt-textarea-text-color: ${theme.textareaTextColor ? theme.textareaTextColor : getArg(theme, 'textareaTextColor')};
    --dt-textarea-text-color-inverse: ${theme.textareaTextcolorInverse ? theme.textareaTextcolorInverse : getArg(theme, 'textareaTextcolorInverse')};
    --dt-label-font-size: ${theme.labelFontSize ? theme.labelFontSize : getArg(theme, 'labelFontSize')};
    --dt-label-font-weight: ${theme.labelFontWeight ? theme.labelFontWeight : getArg(theme, 'labelFontWeight')};
    --dt-label-color: ${theme.labelTextColor ? theme.labelTextColor : getArg(theme, 'labelTextColor')};
    --dt-label-tooltip-color: ${theme.labelTooltipColor ? theme.labelTooltipColor : getArg(theme, 'labelTooltipColor')};
    --dt-label-tooltip-background: ${theme.labelTooltipBackground ? theme.labelTooltipBackground : getArg(theme, 'labelTooltipBackground')};
    --dt-spinner-color-1: ${theme.spinnerColor1 ? theme.spinnerColor1 : getArg(theme, 'spinnerColor1')};
    --dt-spinner-color-2: ${theme.spinnerColor2 ? theme.spinnerColor2 : getArg(theme, 'spinnerColor2')};
    --dt-tile-font-family: ${theme.tileFontFamily ? theme.tileFontFamily : getArg(theme, 'tileFontFamily')};
    --dt-tile-font-size: ${theme.tileFontSize ? theme.tileFontSize : getArg(theme, 'tileFontSize')};
    --dt-tile-font-weight: ${theme.tileFontWeight ? theme.tileFontWeight : getArg(theme, 'tileFontWeight')};
    --dt-tile-background-color: ${theme.tileBackground ? theme.tileBackground : getArg(theme, 'tileBackground')};
    --dt-tile-border-color: ${theme.tileBorderColor ? theme.tileBorderColor : getArg(theme, 'tileBorderColor')};
    --dt-tile-shadow: ${theme.tileShadow ? theme.tileShadow : getArg(theme, 'tileShadow')};
    --dt-tile-header-color: ${theme.tileHeaderColor ? theme.tileHeaderColor : getArg(theme, 'tileHeaderColor')};
    background: ${theme.surface0 ? theme.surface0 : getArg(theme, 'surface0')};
    color-scheme: ${theme.colorScheme ? theme.colorScheme : getArg(theme, 'colorScheme')};

    ${theme.RTL ? 'direction: rtl;' : 'direction: ltr;'}
  }
  `;
}
