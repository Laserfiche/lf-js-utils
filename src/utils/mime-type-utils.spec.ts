// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

import { getMIMETypeFromExtension } from './mime-type-utils.js';

describe('MimeTypeUtils', () => {
  it('should get mime type for extension without period', () => {
    const extension = 'docx';
    const mimeType = getMIMETypeFromExtension(extension);

    const expected = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    expect(mimeType).toEqual(expected);
  });

  it('should get mime type for extension with period', () => {
    const extension = '.eml';
    const mimeType = getMIMETypeFromExtension(extension);

    const expected = 'message/rfc822';
    expect(mimeType).toEqual(expected);
  });

  it('should get mime type for case insensitive extension', () => {
    const extension = 'PPTx';
    const mimeType = getMIMETypeFromExtension(extension);

    const expected = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    expect(mimeType).toEqual(expected);
  });

  it('should return undefined mime type for undefined extension', () => {
    const mimeType = getMIMETypeFromExtension(undefined);
    expect(mimeType).toEqual('application/unknown');
  });

  it('should return undefined mime type for unsupported extension', () => {
    const extension = 'this is unsupported';
    const mimeType = getMIMETypeFromExtension(extension);

    expect(mimeType).toEqual('application/unknown');
  });
});
