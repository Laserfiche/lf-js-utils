import * as Base64Utils from './base64-utils';

describe('Base64Utils', () => {
  it('convertBase64ToUint8Array should convert blank base64 string to Uint8Array', () => {
    const base64: string = '';
    const uint8Array = Base64Utils.convertBase64ToUint8Array(base64);

    const expected: Uint8Array = new Uint8Array([]);
    expect(uint8Array).toEqual(expected);
  });

  it('convertBase64ToUint8Array should convert base64 string to Uint8Array', () => {
    const nonBase64: string = 'abcd';

    const base64: string = Base64Utils.convertStringToBase64(nonBase64);
    const uint8Array = Base64Utils.convertBase64ToUint8Array(base64);

    const expectedBase64: string = 'YWJjZA==';
    const expectedUint8Array: Uint8Array = new Uint8Array([97, 98, 99, 100]);
    expect(base64).toEqual(expectedBase64);
    expect(uint8Array).toEqual(expectedUint8Array);
  });

  it('convertUint8ArrayToString should convert blank Uint8Array to string', () => {
    const uint8Array: Uint8Array = new Uint8Array([]);
    const base64 = Base64Utils.convertUint8ArrayToString(uint8Array);

    const expected: string = '';
    expect(base64).toEqual(expected);
  });

  it('convertUint8ArrayToString should convert Uint8Array to string', () => {
    const uint8Array: Uint8Array = new Uint8Array([97, 98, 99, 100]);
    const base64 = Base64Utils.convertUint8ArrayToString(uint8Array);

    const expected: string = 'abcd';
    expect(base64).toEqual(expected);
  });
});
