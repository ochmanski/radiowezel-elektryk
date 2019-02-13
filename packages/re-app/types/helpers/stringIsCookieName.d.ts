export interface IstringIsCookieName {
  cookieNameCandidate: string;
}

export type stringIsCookieNameReturnType = boolean;

export type stringIsCookieNameTypedef = (
  cookieNameCandidate: IstringIsCookieName['cookieNameCandidate'],
) => stringIsCookieNameReturnType;
