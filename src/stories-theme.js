export const argTypes = {
  primaryColor: { control: 'color' },
  borderColor: { control: 'color' },
  textColorMultiSelect: { control: 'color' },
  borderColorMultiSelectTag: { control: 'color' },
  backgroundColorMultiSelectTag: { control: 'color' },
  backgroundMultiSelectOptionHover: { control: 'text' },
};

export const themes = {
  default: {
    name: 'Default',
    args: {
      primaryColor: '#3f729b',
      borderColor: '#cacaca',
      textColorMultiSelect: '#555',
      borderColorMultiSelectTag: '#c2e0ff',
      backgroundColorMultiSelectTag: '#ecf5fc',
      backgroundMultiSelectOptionHover: '#f5f5f5',
    },
  },
};

function getArg(theme, argName) {
  return theme[argName] || themes.default.args[argName];
}
export function themeCss(args) {
  return `
  html {
    font-family: Helvetica, Arial, sans-serif;
    --primary-color: ${getArg(args, 'primaryColor')};
    --dt-component-border-color: ${getArg(args, 'borderColor')};
    --dt-multi-select-text-color: ${getArg(args, 'textColorMultiSelect')};
    --dt-multi-select-tag-border-color: ${getArg(
      args,
      'borderColorMultiSelectTag'
    )};
    --dt-multi-select-tag-bkrd-color: ${getArg(
      args,
      'backgroundColorMultiSelectTag'
    )};
    --dt-multi-select-option-hover-bkrd: ${getArg(
      args,
      'backgroundMultiSelectOptionHover'
    )};
  }
  `;
}
