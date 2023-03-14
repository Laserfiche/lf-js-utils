export interface LfLanguageCookie {
  c?: string;
  uic?: string;
}

/**
 * Function to get UI Culture (uic) and Regional Settings (c) from `Language` cookie, if exists in expected format
 * @param browserCookies cookies from browser. Cookies separated by `;`
 * @returns LfLanguageCookie, parsed from input
 * @example
 * ```typescript
 * getLfLanguageCookie('test=hi;Language=c=en-US|uic=en-US;moretest=cookie'); // '{uic: 'en-US', c: 'en-US'}'
 * getLfLanguageCookie('test=hi;Language=c=en-US;moretest=cookie'); // {uic: undefined, c: 'en-US'}
 * getLfLanguageCookie('test=hi;moretest=cookie'); //  undefined
 * ```
 */
export function getLfLanguageCookie(browserCookies: string): LfLanguageCookie | undefined {
  const cookiesKeyValue = browserCookies.split(';');
  let cult: LfLanguageCookie | undefined;
  cookiesKeyValue?.forEach((kv) => {
    let uiCode: string | undefined;
    let langCode: string | undefined;
    const trimmedCookieValue = kv?.trim();
    if (trimmedCookieValue.startsWith('Language=')) {
      const value: string | undefined = trimmedCookieValue.replace('Language=', '');
      const cultures = value?.split('|');
      cultures.forEach((code) => {
        if (code.startsWith('c=')) {
          langCode = code.replace('c=', '');
        } else if (code.startsWith('uic=')) {
          uiCode = code.replace('uic=', '');
        }
      });
      if (langCode || uiCode) {
        cult = {
          c: langCode,
          uic: uiCode,
        };
      }
    }
  });
  // TODO this will return last instance of Language header, is it possible to have multiple?
  return cult ?? undefined;
}
