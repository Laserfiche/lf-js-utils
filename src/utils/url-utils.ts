// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

/**
 * Query string parameter (name, unencoded value)
 */
 export type QueryParameter = [string, string | number | boolean];

 /**
  * Creates a URL by concatenating baseURL, relativeURL, queryStringParams
  *
  * @param baseURL Base URL
  * @param relativeURL Relative URL to append
  * @param queryStringParams  Query string parameters
  * @example
  * ```typescript
  * combineURLs('a/', 'b'); // 'a/b'
  * combineURLs('a/', '/b'); // 'a/b'
  * combineURLs('/a', 'b'); // '/a/b'
  * const queryParams: QueryParameter[] = [
      ['string', 'string1'],
      ['bool', true],
      ['number', 1],
      ['text', 'Are you sure?'],
    ];
    combineURLs('a/', 'b', queryParams); // 'a/b?string=string1&bool=true&number=1&text=Are%20you%20sure%3F'
  * ```
  */
 export function combineURLs(baseURL: string, relativeURL: string, queryStringParams?: QueryParameter[]): string {
   const end = baseURL[baseURL.length - 1];
   const begin = relativeURL[0];
   let url: string;
 
   if ((end !== '/' && begin === '/') || (end === '/' && begin !== '/')) {
     url = baseURL + relativeURL;
   } else if (begin === '/') {
     url = baseURL + relativeURL.substr(1);
   } else {
     url = baseURL + '/' + relativeURL;
   }
 
   if (queryStringParams && queryStringParams.length > 0) {
     const queryString: string =
       '?' + queryStringParams.map((param) => param[0] + '=' + encodeURIComponent(param[1])).join('&');
     url = url + queryString;
   }
   return url;
 }
 
 
