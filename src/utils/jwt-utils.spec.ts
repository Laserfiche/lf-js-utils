import * as JwtUtils from './jwt-utils.js';

describe('JwtUtils', () => {

  it('getAccountIdFromLfJWT returns the account id', () => {
    // Arrange
    const jwt: JwtUtils.JWT = {
      header: { "typ": "JWT" },
      payload: { "csid": "123456789" },
      signature: "_signature"
    };
    const expectedAccountId = '123456789';

    // Act
    const accountId = JwtUtils.getAccountIdFromLfJWT(jwt);

    // Assert
    expect(accountId).toEqual(expectedAccountId);
  });

  it('getTrusteeIdFromLfJWT returns the trustee id', () => {
    // Arrange
    const jwt: JwtUtils.JWT = {
      header: { "typ": "JWT" },
      payload: { "trid": "1008" },
      signature: "_signature"
    };
    const expectedTrusteeId = '1008';

    // Act
    const trid = JwtUtils.getTrusteeIdFromLfJWT(jwt);

    // Assert
    expect(trid).toEqual(expectedTrusteeId);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints for clouddev environment', () => {
    // Arrange
    const accountId = '123456789';
    const devEnvironmentSubDomain = 'a.clouddev';
    const expectedEndpoints: JwtUtils.LfEndpoints = {
      webClientUrl: 'https://app.a.clouddev.laserfiche.com/laserfiche',
      wsignoutUrl: 'https://accounts.a.clouddev.laserfiche.com/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.a.clouddev.laserfiche.com/repository/'
    };

    // Act
    const endpoints = JwtUtils.getLfEndpoints(accountId, devEnvironmentSubDomain);

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints for production environment', () => {
    // Arrange
    const accountId = '123456789';
    const expectedEndpoints: JwtUtils.LfEndpoints = {
      webClientUrl: 'https://app.laserfiche.com/laserfiche',
      wsignoutUrl: 'https://accounts.laserfiche.com/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.laserfiche.com/repository/'
    };

    // Act
    const endpoints = JwtUtils.getLfEndpoints(accountId);

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints for cloudtest environment', () => {
    // Arrange
    const accountId = '123456789';
    const devEnvironmentSubDomain = 'cloudtest';
    const expectedEndpoints: JwtUtils.LfEndpoints = {
      webClientUrl: 'https://app.cloudtest.laserfiche.com/laserfiche',
      wsignoutUrl: 'https://accounts.cloudtest.laserfiche.com/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.cloudtest.laserfiche.com/repository/'
    };

    // Act
    const endpoints = JwtUtils.getLfEndpoints(accountId, devEnvironmentSubDomain);

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints for CA accounts', () => {
    // Arrange
    const accountId = '1123456789';
    const devEnvironmentSubDomain = 'cloudtest';
    const expectedEndpoints: JwtUtils.LfEndpoints = {
      webClientUrl: 'https://app.cloudtest.laserfiche.ca/laserfiche',
      wsignoutUrl: 'https://accounts.cloudtest.laserfiche.ca/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.cloudtest.laserfiche.ca/repository/'
    };

    // Act
    const endpoints = JwtUtils.getLfEndpoints(accountId, devEnvironmentSubDomain);

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });

  it('getLfEndpoints returns the region-specific Laserfiche Cloud endpoints for EU accounts', () => {
    // Arrange
    const accountId = '2123456789';
    const expectedEndpoints: JwtUtils.LfEndpoints = {
      webClientUrl: 'https://app.eu.laserfiche.com/laserfiche',
      wsignoutUrl: 'https://accounts.eu.laserfiche.com/WebSTS/?wa=wsignout1.0',
      repositoryApiBaseUrl: 'https://api.eu.laserfiche.com/repository/'
    };

    // Act
    const endpoints = JwtUtils.getLfEndpoints(accountId);

    // Assert
    expect(endpoints).toEqual(expectedEndpoints);
  });

  it('base64toString decodes a based64-encoded string', () => {
    // Arrange
    const base64String = 'dGVzdA=='; // base64-encoding of 'test'
    const expectedDecodedString = 'test';

    // Act
    const decodedString = JwtUtils.base64toString(base64String);

    // Assert
    expect(decodedString).toEqual(expectedDecodedString);
  });

  it('parseAccessToken parses a base64-encoded jwt', () => {
    // Arrange
    const jwtString = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9l
    IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`; // copy from https://jwt.io/
    const expectedJWT: JwtUtils.JWT = {
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
    };

    // Act
    const jwt = JwtUtils.parseAccessToken(jwtString);

    // Assert
    expect(jwt).toEqual(expectedJWT);

  });

  it('getLfRegionalDomainFromAccountId should return production domain if no devEnvironment subDomain is provided', () => {
    // Arrange
    const accountId = '123456789';
    const expectedRegionalDomain = 'laserfiche.com';

    // Act
    const regionalDomain = JwtUtils.getLfRegionalDomainFromAccountId(accountId);

    // Assert
    expect(regionalDomain).toEqual(expectedRegionalDomain);
  });

  it('getLfRegionalDomainFromAccountId should return CA clouddev regional domain', () => {
    // Arrange
    const accountId = '1123456789';
    const devEnvironmentSubDomain = 'a.clouddev';
    const expectedRegionalDomain = 'a.clouddev.laserfiche.ca';

    // Act
    const regionalDomain = JwtUtils.getLfRegionalDomainFromAccountId(accountId, devEnvironmentSubDomain);

    // Assert
    expect(regionalDomain).toEqual(expectedRegionalDomain);
  });

  it('getLfRegionalDomainFromAccountId should return EU cloudtest regional domain', () => {
    // Arrange
    const accountId = '2123456789';
    const devEnvironmentSubDomain = 'cloudtest';
    const expectedRegionalDomain = 'cloudtest.eu.laserfiche.com';

    // Act
    const regionalDomain = JwtUtils.getLfRegionalDomainFromAccountId(accountId, devEnvironmentSubDomain);

    // Assert
    expect(regionalDomain).toEqual(expectedRegionalDomain);
  });

  it('getLfDevEnvironmentSubDomain should return clouddev subDomain', () => {
    // Arrange
    const urlHostName = 'a.clouddev.laserfiche.ca';
    const expectedDevEnvironmentSubDomain = 'a.clouddev';

    // Act
    const devEnvironmentSubDomain = JwtUtils.getLfDevEnvironmentSubDomain(urlHostName);

    // Act
    expect(devEnvironmentSubDomain).toEqual(expectedDevEnvironmentSubDomain);
  });

  it('getLfDevEnvironmentSubDomain should return cloudtest subDomain', () => {
    // Arrange
    const urlHostName = 'a.cloudtest.laserfiche.ca';
    const expectedDevEnvironmentSubDomain = 'cloudtest';

    // Act
    const devEnvironmentSubDomain = JwtUtils.getLfDevEnvironmentSubDomain(urlHostName);

    // Act
    expect(devEnvironmentSubDomain).toEqual(expectedDevEnvironmentSubDomain);
  });

  it('getLfDevEnvironmentSubDomain should return production subDomain', () => {
    // Arrange
    const urlHostName = 'laserfiche.ca';
    const expectedDevEnvironmentSubDomain = '';

    // Act
    const devEnvironmentSubDomain = JwtUtils.getLfDevEnvironmentSubDomain(urlHostName);

    // Act
    expect(devEnvironmentSubDomain).toEqual(expectedDevEnvironmentSubDomain);
  });


});
