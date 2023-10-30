// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

import { getLfLanguageCookie, LfLanguageCookie } from './cookie-utils.js';

describe('CookieUtils', () => {
  it('getLfLanguageCookie should return parsed cookie if in correct format', async () => {
    const cookiesFromBrowser = 'test=hi; Language=c=es-419|uic=en-US';

    const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

    expect(parsedLfCookie).toEqual({ uic: 'en-US', c: 'es-419' });
  });

  it('getLfLanguageCookie should return undefined if cookie does not exist', async () => {
    const cookiesFromBrowser = 'test=hi;moretest=cookie';

    const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

    expect(parsedLfCookie).toBeUndefined();
  });

  it('getLfLanguageCookie should return first valid cookie if first language cookie is not valid', async () => {
    const cookiesFromBrowser = 'Language=cookie; test=hi;Language=c=es-419|uic=en-US; no=yes;';

    const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

    expect(parsedLfCookie).toEqual({ uic: 'en-US', c: 'es-419' });
  });

  it('getLfLanguageCookie should return first valid cookie', async () => {
    const cookiesFromBrowser = 'test=hi;Language=c=es-419|uic=en-US; no=yes; Language=c=en-US|uic=en-US';

    const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

    expect(parsedLfCookie).toEqual({ uic: 'en-US', c: 'es-419' });
  });

  it('getLfLanguageCookie should return only uic if that is all that exists', async () => {
    const cookiesFromBrowser = 'test=hi;Language=uic=en-US;moretest=cookie';

    const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

    expect(parsedLfCookie).toEqual({ uic: 'en-US', c: undefined });
  });
});
