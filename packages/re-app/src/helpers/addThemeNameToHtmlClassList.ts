import {
  IaddThemeNameToHtmlClassList,
  addThemeNameToHtmlClassListTypedef,
} from '@types';

import { themes } from '@themes';

/**
 * Dodaj aktualną nazwę motywu jako klasę do HTML Element
 * @param currentThemeName nazwa motywu
 */
const addThemeNameToHtmlClassList: addThemeNameToHtmlClassListTypedef = (
  currentThemeName: IaddThemeNameToHtmlClassList['currentThemeName'],
): void => {
  const themeNames: string[] = Object.keys(themes);

  themeNames.forEach((themeName: string) => {
    document.documentElement.classList.remove(themeName);
  });

  document.documentElement.classList.add(currentThemeName);
};

export { addThemeNameToHtmlClassList };
