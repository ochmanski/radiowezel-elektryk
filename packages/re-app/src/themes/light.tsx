import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const theme: ThemeOptions = {
  palette: {
    type: 'light',

    primary: {
      main: '#00adb9',
    },

    secondary: {
      main: '#27b137',
    },

    background: {
      default: '#e0e0e0',
      paper: '#fff',
    },
  },

  typography: {
    useNextVariants: true,
    fontFamily: '"Work Sans", sans-serif',
  },
};
