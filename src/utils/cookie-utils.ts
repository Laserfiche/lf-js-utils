export interface LfLanguageCookie {
  c?: string;
  uic?: string;
}

const LANGUAGE_COOKIE_PREFIX = 'Language=';
const C_COOKIE_PREFIX = 'c=';
const UIC_COOKIE_PREFIX = 'uic=';

/**
 * Function to get UI Culture (uic) and Regional Settings (c) from `Language` cookie, if exists in expected format.
 * If multiple valid language cookies, it will return the last instance.
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
    const trimmedCookieValue = kv?.trim();
    if (trimmedCookieValue.startsWith(LANGUAGE_COOKIE_PREFIX)) {
      const value: string | undefined = trimmedCookieValue.replace(LANGUAGE_COOKIE_PREFIX, '');
      const parsedCult = parseLanguageCookie(value);
      if (parsedCult) {
        cult = parsedCult;
      }
    }
  });
  return cult ?? undefined;
}

/**
 * @internal
 */
function parseLanguageCookie(value: string): LfLanguageCookie | undefined {
  let langCode: string | undefined;
  let uiCode: string | undefined;
  const cultures = value?.split('|');
  cultures.forEach((code) => {
    if (code.startsWith(C_COOKIE_PREFIX)) {
      langCode = code.replace(C_COOKIE_PREFIX, '');
    } else if (code.startsWith(UIC_COOKIE_PREFIX)) {
      uiCode = code.replace(UIC_COOKIE_PREFIX, '');
    }
  });
  if (langCode || uiCode) {
    return {
      c: langCode,
      uic: uiCode,
    };
  }
  return undefined;
}
