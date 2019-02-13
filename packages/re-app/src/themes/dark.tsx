import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const theme: ThemeOptions = {
  palette: {
    type: 'dark',

    primary: {
      main: '#00effe',
    },

    secondary: {
      main: '#39ff4f',
    },

    background: {
      default: '#353535',
      paper: '#000',
    },
  },

  typography: {
    useNextVariants: true,
    fontFamily: '"Work Sans", sans-serif',
  },
};
