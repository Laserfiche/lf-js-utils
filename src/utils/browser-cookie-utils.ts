export interface LfLanguageCookie {
  c: string;
  uic: string;
}

export function getLfLanguageCookie(browserCookies: string): LfLanguageCookie | undefined {
  // TODO should we let them pass in an optional sessionKey to check the LangSess
  const cookiesKeyValue = browserCookies.split(';');
  let cult: LfLanguageCookie | undefined;
  cookiesKeyValue?.forEach((kv) => {
    // " Language=c=en-US|uic=es-419"
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
      console.log('lllll', langCode, uiCode);
      if (langCode && uiCode) {
        cult = {
          c: langCode,
          uic: uiCode,
        };
        console.log('cult', cult);
      }
    }
  });
  return cult ?? undefined;
}
