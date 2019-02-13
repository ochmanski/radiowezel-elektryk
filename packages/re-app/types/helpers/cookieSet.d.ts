import { CookieAttributes } from 'js-cookie';
import { Icookie } from '@types';

export type cookieSetTypedef = ((
  name: Icookie['name'] | string,
  value: Icookie['value'],
  options?: Icookie['options'],
) => void);
