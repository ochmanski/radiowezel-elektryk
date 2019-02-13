import Slide from '@material-ui/core/Slide';
import {
  snackbarOptions as _snackbarOptions,
} from '@types';

/**
 * Wszystkie opcje
 */
const snackbarOptions: _snackbarOptions = {

  default: {
    variant: 'success',
    maxSnacks: 10,
    TransitionComponent: Slide,
    className: 'snackWrapper',
    TransitionProps: {
      // @ts-ignore - notistack ma nieprawidłowe typowanie
      direction: 'up',
    },
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
  },

};

export { snackbarOptions };
