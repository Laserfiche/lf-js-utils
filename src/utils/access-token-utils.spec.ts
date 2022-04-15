import * as AccessTokenUtils from './access-token-utils.js';

describe('AccessTokenUtils', () => {

    it('getAccountIdFromLfJWT returns the account id', () => {
        // Arrange
        const jwt : AccessTokenUtils.JWT = {
            header: { "typ": "JWT"},
            payload: {"csid" : "123456789"},
            signature: "_signature"
        }
        const expectedAccountId = '123456789';

        // Act
        const accountId = AccessTokenUtils.getAccountIdFromLfJWT(jwt);

        // Assert
        expect(accountId).toEqual(expectedAccountId);
    });

    it('getTrusteeIdFromLfJWT returns the trustee id', () => {
        // Arrange
        const jwt : AccessTokenUtils.JWT = {
            header: { "typ": "JWT"},
            payload: {"trid" : "1008"},
            signature: "_signature"
        }
        const expectedTrusteeId = '1008';

        // Act
        const trid = AccessTokenUtils.getTrusteeIdFromLfJWT(jwt);

        // Assert
        expect(trid).toEqual(expectedTrusteeId);
    });

    it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints', () => {
        // Arrange
        const accountId = '123456789';
        const devEnvironmentSubDomain = 'a.clouddev';
        const expectedEndpoints : AccessTokenUtils.LfEndpoints= {
            webClientUrl: 'https://app.a.clouddev.laserfiche.com/laserfiche',
            wsignoutUrl: 'https://accounts.a.clouddev.laserfiche.com/WebSTS/?wa=wsignout1.0',
            repositoryApiBaseUrl: 'https://api.a.clouddev.laserfiche.com/repository/'
        }

        // Act
        const endpoints = AccessTokenUtils.getLfEndpoints(accountId, devEnvironmentSubDomain);

        // Assert
        expect(endpoints).toEqual(expectedEndpoints);
    });

    it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints', () => {
        // Arrange
        const accountId = '123456789';
        const expectedEndpoints : AccessTokenUtils.LfEndpoints= {
            webClientUrl: 'https://app.laserfiche.com/laserfiche',
            wsignoutUrl: 'https://accounts.laserfiche.com/WebSTS/?wa=wsignout1.0',
            repositoryApiBaseUrl: 'https://api.laserfiche.com/repository/'
        }

        // Act
        const endpoints = AccessTokenUtils.getLfEndpoints(accountId);

        // Assert
        expect(endpoints).toEqual(expectedEndpoints);
    });

    it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints', () => {
        // Arrange
        const accountId = '123456789';
        const devEnvironmentSubDomain = 'cloudtest';
        const expectedEndpoints : AccessTokenUtils.LfEndpoints= {
            webClientUrl: 'https://app.cloudtest.laserfiche.com/laserfiche',
            wsignoutUrl: 'https://accounts.cloudtest.laserfiche.com/WebSTS/?wa=wsignout1.0',
            repositoryApiBaseUrl: 'https://api.cloudtest.laserfiche.com/repository/'
        }

        // Act
        const endpoints = AccessTokenUtils.getLfEndpoints(accountId, devEnvironmentSubDomain);

        // Assert
        expect(endpoints).toEqual(expectedEndpoints);
    });

    it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints', () => {
        // Arrange
        const accountId = '1123456789';
        const devEnvironmentSubDomain = 'cloudtest';
        const expectedEndpoints : AccessTokenUtils.LfEndpoints= {
            webClientUrl: 'https://app.cloudtest.laserfiche.ca/laserfiche',
            wsignoutUrl: 'https://accounts.cloudtest.laserfiche.ca/WebSTS/?wa=wsignout1.0',
            repositoryApiBaseUrl: 'https://api.cloudtest.laserfiche.ca/repository/'
        }

        // Act
        const endpoints = AccessTokenUtils.getLfEndpoints(accountId, devEnvironmentSubDomain);

        // Assert
        expect(endpoints).toEqual(expectedEndpoints);
    });

    it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints', () => {
        // Arrange
        const accountId = '2123456789';
        const expectedEndpoints : AccessTokenUtils.LfEndpoints= {
            webClientUrl: 'https://app.eu.laserfiche.com/laserfiche',
            wsignoutUrl: 'https://accounts.eu.laserfiche.com/WebSTS/?wa=wsignout1.0',
            repositoryApiBaseUrl: 'https://api.eu.laserfiche.com/repository/'
        }

        // Act
        const endpoints = AccessTokenUtils.getLfEndpoints(accountId);

        // Assert
        expect(endpoints).toEqual(expectedEndpoints);
    });

    it('base64toString decodes a based64-encoded string', () => {
        // Arrange
        const base64String = 'dGVzdA==';
        const expectedDecodedString = 'test';

        // Act
        const decodedString = AccessTokenUtils.base64toString(base64String);

        // Assert
        expect(decodedString).toEqual(expectedDecodedString);
    });
    
    it('parseAccessToken parses a base64-encoded jwt', () => {
        // Arrange
        const jwtString = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const expectedJWT : AccessTokenUtils.JWT = {
            header: 
            {
                "alg": "HS256",
                "typ": "JWT"
            },
            payload:
            {
                "sub": "1234567890",
                "name": "John Doe",
                "iat": 1516239022
              },
            signature: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        }

        // Act
        const jwt = AccessTokenUtils.parseAccessToken(jwtString);

        // Assert
        expect(jwt).toEqual(expectedJWT);

    });

    it('getLfRegionalDomainFromAccountId should return US regional domain', () => {
        // Arrange
        const accountId = '123456789';
        const expectedRegionalDomain = 'laserfiche.com';

        // Act
        const regionalDomain = AccessTokenUtils.getLfRegionalDomainFromAccountId(accountId);

        // Assert
        expect(regionalDomain).toEqual(expectedRegionalDomain);
    });

    it('getLfRegionalDomainFromAccountId should return CA clouddev regional domain', () => {
        // Arrange
        const accountId = '1123456789';
        const devEnvironmentSubDomain = 'a.clouddev';
        const expectedRegionalDomain = 'a.clouddev.laserfiche.ca';

        // Act
        const regionalDomain = AccessTokenUtils.getLfRegionalDomainFromAccountId(accountId, devEnvironmentSubDomain);

        // Assert
        expect(regionalDomain).toEqual(expectedRegionalDomain);
    });

    it('getLfRegionalDomainFromAccountId should return EU cloudtest regional domain', () => {
        // Arrange
        const accountId = '2123456789';
        const devEnvironmentSubDomain = 'cloudtest';
        const expectedRegionalDomain = 'cloudtest.eu.laserfiche.com';

        // Act
        const regionalDomain = AccessTokenUtils.getLfRegionalDomainFromAccountId(accountId, devEnvironmentSubDomain);

        // Assert
        expect(regionalDomain).toEqual(expectedRegionalDomain);
    });

    it('getLfDevEnvironmentSubDomain should return clouddev subDomain', () => {
        // Arrange
        const urlHostName = 'a.clouddev.laserfiche.ca';
        const expecteDevEnvironmentSubDomain = 'a.clouddev';

        // Act
        const devEnvironmentSubDomain = AccessTokenUtils.getLfDevEnvironmentSubDomain(urlHostName);

        // Act
        expect(devEnvironmentSubDomain).toEqual(expecteDevEnvironmentSubDomain);
    });

    it('getLfDevEnvironmentSubDomain should return clouddev subDomain', () => {
        // Arrange
        const urlHostName = 'laserfiche.ca';
        const expecteDevEnvironmentSubDomain = '';

        // Act
        const devEnvironmentSubDomain = AccessTokenUtils.getLfDevEnvironmentSubDomain(urlHostName);

        // Act
        expect(devEnvironmentSubDomain).toEqual(expecteDevEnvironmentSubDomain);
    })


})