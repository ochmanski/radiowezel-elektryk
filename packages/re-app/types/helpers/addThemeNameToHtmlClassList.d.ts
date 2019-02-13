export interface IaddThemeNameToHtmlClassList {
  /**
   * Aktualna nazwa motywu
   */
  currentThemeName: string;
}

export type addThemeNameToHtmlClassListTypedef = (
  currentThemeName: IaddThemeNameToHtmlClassList['currentThemeName'],
) => void;
