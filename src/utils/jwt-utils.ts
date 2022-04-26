import { base64toString } from './string-utils.js';

/**
 * Laserfiche Cloud endpoints
 */
export interface LfEndpoints {
  webClientUrl: string;
  wsignoutUrl: string;
  repositoryApiBaseUrl: string;
}

/**
 * Decoded JWT
 */
export interface JWT {
  header: object;
  payload: object;
  signature: string;
}

/**
 * Returns Laserfiche account id (customer id) from Laserfiche jwt claims
 * @param lfJwt
 * @returns
 * @example
 * ```typescript
 * const jwt : AccessTokenUtils.JWT = {
 *  header: { 'typ': 'JWT'},
 *  payload: {'csid' : '123456789'},
 *  signature: '_signature'
 * }
 * getAccountIdFromLfJWT(jwt); // '123456789';
 * ```
 */
export function getAccountIdFromLfJWT(lfJwt: JWT): string {
  return lfJwt.payload['csid'];
}

/**
 * Returns Laserfiche trustee id (user id) from Laserfiche jwt claims
 * @param lfJwt
 * @returns
 * @example
 * ```typescript
 * const jwt : AccessTokenUtils.JWT = {
 *  header: { 'typ': 'JWT'},
 *  payload: {'trid' : '1008'},
 *  signature: '_signature'
 * }
 * getTrusteeIdFromLfJWT(jwt); // '1008';
 * ```
 */
export function getTrusteeIdFromLfJWT(lfJwt: JWT): string {
  return lfJwt.payload['trid'];
}

/**
 * Returns region-specific Laserfiche Cloud endpoints
 * @param accountId
 * @param devEnvironmentSubDomain optional dev environment subDomain, such as 'a.clouddev', or 'cloudtest'
 * @returns
 * @example
 * ```typescript
 * getLfEndpoints('123456789', 'a.clouddev');
 *  // => {
 *  //      webClientUrl: 'https://app.a.clouddev.laserfiche.com/laserfiche',
 *  //      wsignoutUrl: 'https://accounts.a.clouddev.laserfiche.com/WebSTS/?wa=wsignout1.0',
 *  //      repositoryApiBaseUrl: 'https://api.a.clouddev.laserfiche.com/repository/'
 *  //     }
 *
 *  getLfEndpoints('123456789');
 *  // => {
 *  //      webClientUrl: 'https://app.laserfiche.com/laserfiche',
 *  //      wsignoutUrl: 'https://accounts.laserfiche.com/WebSTS/?wa=wsignout1.0',
 *  //      repositoryApiBaseUrl: 'https://api.laserfiche.com/repository/'
 *  //     }
 * ```
 */
export function getLfEndpoints(accountId: string, devEnvironmentSubDomain?: string): LfEndpoints {
  const regionSpecificHostName = getLfRegionalDomainFromAccountId(accountId, devEnvironmentSubDomain);
  return {
    webClientUrl: `https://app.${regionSpecificHostName}/laserfiche`,
    repositoryApiBaseUrl: `https://api.${regionSpecificHostName}/repository/`,
    wsignoutUrl: `https://accounts.${regionSpecificHostName}/WebSTS/?wa=wsignout1.0`,
  };
}

/**
 * Parses a base64-encoded jwt
 * @param jwt
 * @returns
 * @example
 * ```typescript
 * const jwtString = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
 * parseAccessToken(jstString);
 *  // => {
 *            header:
 *            {
 *              'alg': 'HS256',
 *              'typ': 'JWT'
 *             },
 *            payload:
 *            {
 *              'sub': '1234567890',
 *              'name': 'John Doe',
 *              'iat': 1516239022
 *            },
 *            signature: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
 *          }
 * ```
 */
export function parseAccessToken(jwt: string): JWT {
  const ary = jwt.split('.');
  const header = JSON.parse(base64toString(ary[0]));
  const payload = JSON.parse(base64toString(ary[1]));
  const signature = ary[2];
  return {
    header,
    payload,
    signature,
  };
}

/**
 * Returns the Laserfiche regional cloud domains given an account id
 * @param accountId
 * @param devEnvironmentSubDomain optional dev environment subDomain, such as 'a.clouddev', or 'cloudtest'
 * @returns
 * @example
 * ```typescript
 * getLfRegionalDomainFromAccountId('1123456789'); // 'laserfiche.ca'
 * getLfRegionalDomainFromAccountId('1123456789', 'a.clouddev'); // 'a.clouddev.laserfiche.ca'
 * getLfRegionalDomainFromAccountId('123456789', 'a.clouddev'); // 'a.clouddev.laserfiche.com'
 * getLfRegionalDomainFromAccountId('2123456789', 'cloudtest'); // 'cloudtest.eu.laserfiche.com'
 * ```
 */
export function getLfRegionalDomainFromAccountId(accountId: string, devEnvironmentSubDomain?: string): string {
  const environment: string = devEnvironmentSubDomain ? devEnvironmentSubDomain + '.' : '';
  // this will make more sense once OAuth is not region specific
  // right now this is same as hostname passed in
  if (accountId.length === 9) {
    return `${environment}laserfiche.com`;
  } else if (accountId.length === 10 && accountId.slice(0, 1) === '1') {
    return `${environment}laserfiche.ca`;
  } else if (accountId.length === 10 && accountId.slice(0, 1) === '2') {
    return `${environment}eu.laserfiche.com`;
  } else {
    throw new Error('Cannot determine account region, length ' + accountId.length);
  }
}

/**
 * Returns the Laserfiche Cloud dev environment subDomain associated with the provided host name
 * @param urlHostName
 * @returns
 * @example
 * ```typescript
 * getLfDevEnvironmentSubDomain('a.clouddev.laserfiche.ca'); // 'a.clouddev'
 * getLfDevEnvironmentSubDomain('cloudtest.laserfiche.com'); // 'cloudtest'
 * getLfDevEnvironmentSubDomain('laserfiche.com'); // ''
 * ```
 */
export function getLfDevEnvironmentSubDomain(urlHostName: string): string {
  if (urlHostName.includes('clouddev')) {
    return 'a.clouddev';
  } else if (urlHostName.includes('cloudtest')) {
    return 'cloudtest';
  } else {
    return '';
  }
}
