
import { ReactFacebookLoginInfo } from 'react-facebook-login';

/**
 * Odpowiedź z react-facebook-login
 * @param response odpowiedź
 * @returns void
 */
export type facebookResponse = (
  response: ReactFacebookLoginInfo,
) => void;
