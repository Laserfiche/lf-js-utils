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
 
 export function getEntryWebAccessUrl(nodeId: string, repoId: string, waUrl: string, isContainer: boolean): string | undefined {
   if (nodeId?.length === 0 || repoId?.length === 0 || waUrl?.length === 0) {
     return undefined;
   }
   let newUrl: string = '';
   if (isContainer) {
     const queryParams: QueryParameter[] = [
       ['repo', repoId]
     ];
     newUrl = combineURLs(waUrl ?? '', 'Browse.aspx', queryParams);
     newUrl += `#?id=${encodeURIComponent(nodeId)}`;
   }
   else {
     const queryParams: QueryParameter[] = [
       ['repo', repoId],
       ['docid', nodeId]
     ];
     newUrl = combineURLs(waUrl ?? '', 'DocView.aspx', queryParams);
   }
   return newUrl;
 }
 