import {
  QueryParameter,
  combineURLs,
  getEntryWebAccessUrl,
} from './url-utils';

describe('urlUtils', () => {

  it('combineURLs("a","b") return "a/b"', () => {
    expect(combineURLs('a', 'b')).toEqual('a/b');
  });

  it('combineURLs("a/","b") return "a/b"', () => {
    expect(combineURLs('a/', 'b')).toEqual('a/b');
  });

  it('combineURLs("a","/b") return "a/b"', () => {
    expect(combineURLs('a', '/b')).toEqual('a/b');
  });

  it('combineURLs("a/","/b") return "a/b"', () => {
    expect(combineURLs('a/', '/b')).toEqual('a/b');
  });

  it('combineURLs("a/","b", []) return "a/b"', () => {
    const queryParams: QueryParameter[] = [];
    expect(combineURLs('a/', 'b', queryParams)).toEqual('a/b');
  });

  it('combineURLs("a/","b", [...]) return "a/b?querystring"', () => {
    const queryParams: QueryParameter[] = [
      ['string', 'string1'],
      ['bool', true],
      ['number', 1],
      ['text', 'Are you sure?'],
    ];
    expect(combineURLs('a/', 'b', queryParams)).toEqual(
      'a/b?string=string1&bool=true&number=1&text=Are%20you%20sure%3F'
    );
  });

  it('getEntryWebAccessUrl with container false', () => {
    const entryWebAccessUrl = getEntryWebAccessUrl('testNodeId', 'testRepoId', 'https://testWAUrl.com/laserfiche', false);
    expect(entryWebAccessUrl).toEqual('https://testWAUrl.com/laserfiche/DocView.aspx?repo=testRepoId&docid=testNodeId');
  });

  it('getEntryWebAccessUrl with container true', () => {
    const entryWebAccessUrl = getEntryWebAccessUrl('testNodeId', 'testRepoId', 'https://testWAUrl.com/laserfiche', true);
    expect(entryWebAccessUrl).toEqual('https://testWAUrl.com/laserfiche/Browse.aspx?repo=testRepoId#?id=testNodeId');

  });

  it('getEntryWebAccessUrl with invalid inputs', () => {
    const entryWebAccessUrl = getEntryWebAccessUrl('', 'testRepoId', '', true);
    expect(entryWebAccessUrl).toBeUndefined();
  });
});
