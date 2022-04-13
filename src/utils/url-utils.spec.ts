import {
  QueryParameter,
  combineURLs,
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

  it('combineURLs("/a","/b") return "/a/b"', () => {
    expect(combineURLs('/a', '/b')).toEqual('/a/b');
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
});
