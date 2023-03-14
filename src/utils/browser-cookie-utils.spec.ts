import { getLfLanguageCookie, LfLanguageCookie } from "./browser-cookie-utils";

describe('BrowserCookieUtils', () => {

    it('getLfLanguageCookie should return parsed cookie if in correct format', async () => {
        const cookiesFromBrowser = 'test=hi;Language=c=es-419|uic=en-US';

        const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

        expect(parsedLfCookie).toEqual({uic: 'en-US', c: 'es-419'});
    });

    it('getLfLanguageCookie should return undefined if cookie does not exist', async () => {
        const cookiesFromBrowser = 'test=hi;moretest=cookie';

        const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

        expect(parsedLfCookie).toBeUndefined();
    });

    it('getLfLanguageCookie should return only uic if that is all that exists', async () => {
        const cookiesFromBrowser = 'test=hi;Language=uic=en-US;moretest=cookie';

        const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

        expect(parsedLfCookie).toEqual({uic: 'en-US', c: undefined});
    });
});

