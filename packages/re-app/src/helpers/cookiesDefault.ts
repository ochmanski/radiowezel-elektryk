import { Icookies } from '@types';
import { sessionMaxAgeInDays } from '@helpers';

/**
 * Domyślne wartości ciasteczek
 * @see Icookies
 */
const cookiesDefault: Icookies = [
  {
    name: 'user',
    value: '{}',
    options: {
      expires: sessionMaxAgeInDays,
    },
  },

  {
    name: 'themeName',
    value: 'light',
  },

  {
    name: 'counterHidden',
    value: 'false',
  },

  {
    name: 'subpageLabelHidden',
    value: 'false',
  },
];

export { cookiesDefault };
