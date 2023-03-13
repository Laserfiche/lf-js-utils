import { getLfLanguageCookie, LfLanguageCookie } from "./browser-cookie-utils";

describe('BrowserCookieUtils', () => {
    it('getLfLanguageCookie should return if condition is met within time limit', async () => {
        const cookiesFromBrowser = 'test=hi;Language=c=en-US|uic=en-US;moretest=cookie';

        const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

        expect(parsedLfCookie).toEqual({uic: 'en-US', c: 'en-US'})
    });

    it('getLfLanguageCookie should return if condition is met within time limit', async () => {
        const cookiesFromBrowser = 'test=hi;Language=c=es-419|uic=en-US';

        const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

        expect(parsedLfCookie).toEqual({uic: 'en-US', c: 'es-419'})
    });

    it('getLfLanguageCookie should return if condition is met within time limit', async () => {
        const cookiesFromBrowser = 'test=hi;moretest=cookie';

        const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

        expect(parsedLfCookie).toBeUndefined();
    });

    it('getLfLanguageCookie should return if condition is met within time limit', async () => {
        const cookiesFromBrowser = 'test=hi;Language=uic=en-US;moretest=cookie';

        const parsedLfCookie: LfLanguageCookie | undefined = getLfLanguageCookie(cookiesFromBrowser);

        expect(parsedLfCookie).toBeUndefined();
    });
});

