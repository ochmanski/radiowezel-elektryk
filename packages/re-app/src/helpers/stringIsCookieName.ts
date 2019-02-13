import { cookiesDefault } from '@helpers';

import {
  Icookie,
  IstringIsCookieName,
  stringIsCookieNameTypedef,
  stringIsCookieNameReturnType,
} from '@types';

/**
 * Czy dany string jest nazwą ciasteczka
 * @param cookieNameCandidate String
 */
const stringIsCookieName: stringIsCookieNameTypedef = (
  cookieNameCandidate: IstringIsCookieName['cookieNameCandidate'],
): stringIsCookieNameReturnType => {
  const cookie: Icookie | undefined = (
    cookiesDefault.filter((c: Icookie) => c.name === cookieNameCandidate)[0]
  );

  // Podany string jest nazwą ciasteczka
  const stringExistAsCookieName: boolean = typeof cookie !== 'undefined';

  return stringExistAsCookieName;
};

export { stringIsCookieName };
