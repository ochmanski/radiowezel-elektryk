import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';

import { theme as dark } from './dark';
import { theme as light } from './light';

export const themes: object = {
  dark, light,
};

export const getTheme: (themeName: string) => Theme = (
    themeName: string,
  ): Theme => (
  createMuiTheme({ ...themes[themeName] })
);
