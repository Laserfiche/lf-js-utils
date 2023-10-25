// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

import {
  createDisplayPath,
  getLastPathSegment,
  getFileExtension,
  getListOfFolderNames,
  removeFileExtension,
  sanitizeFileName,
  combinePaths,
  getCleanedExtension
} from './path-utils.js';

describe('path-utils', () => {
  it('get base name', () => {
    // Arrange
    const expectedResultByInput = {
      '\\': '',
      '\\hello\\world': 'world',
      '\\hello\\world\\': 'world',
      '\\hello\\world\\\\': '',
      '': '',
      'hello': 'hello'
    };

    // Act, Assert
    // eslint-disable-next-line guard-for-in
    for (const input in expectedResultByInput) {
      const expectedResult = expectedResultByInput[input];
      expect(getLastPathSegment(input)).toEqual(expectedResult);
    }
  });

  it('sanitizedFileName does not remove valid characters', () => {
    const sanitizedFileName: string = sanitizeFileName('dummy:File>Name');
    expect(sanitizedFileName).toBe('dummy:File>Name');
  });

  it('sanitizedFileName defaults to File Name if file name is empty', () => {
    const sanitizedFileName = sanitizeFileName('');
    expect(sanitizedFileName).toBe('File Name');
  });

  it('sanitizedFileName defaults to File Name if file name is whitespace', () => {
    const sanitizedFileName = sanitizeFileName('  ');
    expect(sanitizedFileName).toBe('File Name');
  });

  it('sanitizedFileName defaults to all underscores if file name is all back slashes', () => {
    const sanitizedFileName = sanitizeFileName('\\\\\\');
    expect(sanitizedFileName).toBe('___');
  });

  it('sanitizedFileName trims whitespace', () => {
    const sanitizedFileName = sanitizeFileName(' | \\ trimBetweenSpecial \\ | ');
    expect(sanitizedFileName).toBe('| _ trimBetweenSpecial _ |');
  });

  it('sanitizedFileName removes back slashes but keeps forward slashes', () => {
    const sanitizedFileName = sanitizeFileName('fake/folder/name\\');
    expect(sanitizedFileName).toBe('fake/folder/name_');
  });

  it('sanitizedFileName preserves spaces between words', () => {
    const sanitizedFileName = sanitizeFileName('preserve spaces between');
    expect(sanitizedFileName).toBe('preserve spaces between');
  });

  it('removeFileExtension ', () => {
    const fileNameWithExtension = 'test.ext';
    const fileName = removeFileExtension(fileNameWithExtension);
    expect(fileName).toEqual('test');
  });

  it('removeFileExtension ', () => {
    const fileNameWithExtension = 'test.doc.ext';
    const fileName = removeFileExtension(fileNameWithExtension);
    expect(fileName).toEqual('test.doc');
  });

  it('removeFileExtension ', () => {
    const fileNameWithExtension = 'test';
    const fileName = removeFileExtension(fileNameWithExtension);
    expect(fileName).toEqual('test');
  });

  it('getFileExtension', () => {
    const fileNameWithExtension = 'test.ext';
    const extension = getFileExtension(fileNameWithExtension);
    expect(extension).toEqual('ext');
  });

  it('getFileExtension', () => {
    const fileNameWithExtension = 'test.doc.ext';
    const extension = getFileExtension(fileNameWithExtension);
    expect(extension).toEqual('ext');
  });

  it('getFileExtension', () => {
    const fileNameWithExtension = 'test';
    const extension = getFileExtension(fileNameWithExtension);
    expect(extension).toBeUndefined();
  });

  it('createDisplayPath should add backslash to beginning and end', () => {
    // Arrange
    const rootPath1 = '\\';
    const rootPath2 = '';
    const singleFolder1 = 'Hello';
    const singleFolder2 = '\\Hello';
    const singleFolder3 = 'Hello\\';
    const singleFolder4 = '\\Hello\\';
    const doubleFolder1 = 'Hello\\This is a child folder';
    const doubleFolder2 = '\\Hello\\This is a child folder';
    const doubleFolder3 = 'Hello\\This is a child folder\\';
    const doubleFolder4 = '\\Hello\\This is a child folder\\';

    // Act
    const rootPath1DisplayPath: string = createDisplayPath(rootPath1);
    const rootPath2DisplayPath: string = createDisplayPath(rootPath2);
    const singleFolder1DisplayPath: string = createDisplayPath(singleFolder1);
    const singleFolder2DisplayPath: string = createDisplayPath(singleFolder2);
    const singleFolder3DisplayPath: string = createDisplayPath(singleFolder3);
    const singleFolder4DisplayPath: string = createDisplayPath(singleFolder4);
    const doubleFolder1DisplayPath: string = createDisplayPath(doubleFolder1);
    const doubleFolder2DisplayPath: string = createDisplayPath(doubleFolder2);
    const doubleFolder3DisplayPath: string = createDisplayPath(doubleFolder3);
    const doubleFolder4DisplayPath: string = createDisplayPath(doubleFolder4);

    // Assert
    const expectedRootPath = '\\';
    const expectedSingleFolderPath = '\\Hello\\';
    const expectedDoubleFolderPath = '\\Hello\\This is a child folder\\';
    expect(rootPath1DisplayPath).toEqual(expectedRootPath);
    expect(rootPath2DisplayPath).toEqual(expectedRootPath);
    expect(singleFolder1DisplayPath).toEqual(expectedSingleFolderPath);
    expect(singleFolder2DisplayPath).toEqual(expectedSingleFolderPath);
    expect(singleFolder3DisplayPath).toEqual(expectedSingleFolderPath);
    expect(singleFolder4DisplayPath).toEqual(expectedSingleFolderPath);
    expect(doubleFolder1DisplayPath).toEqual(expectedDoubleFolderPath);
    expect(doubleFolder2DisplayPath).toEqual(expectedDoubleFolderPath);
    expect(doubleFolder3DisplayPath).toEqual(expectedDoubleFolderPath);
    expect(doubleFolder4DisplayPath).toEqual(expectedDoubleFolderPath);
  });

  it('getListOfFolderNames should return list of folder names starting from root', () => {
    // Arrange
    const rootPath1 = '\\';
    const rootPath2 = '';
    const singleFolder1 = 'Hello';
    const singleFolder2 = '\\Hello';
    const singleFolder3 = 'Hello\\';
    const singleFolder4 = '\\Hello\\';
    const doubleFolder1 = 'Hello\\This is a child folder';
    const doubleFolder2 = '\\Hello\\This is a child folder';
    const doubleFolder3 = 'Hello\\This is a child folder\\';
    const doubleFolder4 = '\\Hello\\This is a child folder\\';

    // Act
    const rootPath1FolderNames: string[] = getListOfFolderNames(rootPath1);
    const rootPath2FolderNames: string[] = getListOfFolderNames(rootPath2);
    const singleFolder1FolderNames: string[] = getListOfFolderNames(singleFolder1);
    const singleFolder2FolderNames: string[] = getListOfFolderNames(singleFolder2);
    const singleFolder3FolderNames: string[] = getListOfFolderNames(singleFolder3);
    const singleFolder4FolderNames: string[] = getListOfFolderNames(singleFolder4);
    const doubleFolder1FolderNames: string[] = getListOfFolderNames(doubleFolder1);
    const doubleFolder2FolderNames: string[] = getListOfFolderNames(doubleFolder2);
    const doubleFolder3FolderNames: string[] = getListOfFolderNames(doubleFolder3);
    const doubleFolder4FolderNames: string[] = getListOfFolderNames(doubleFolder4);

    // Assert
    const expectedRootNames = [];
    const expectedSingleFolderNames = ['Hello'];
    const expectedDoubleFolderNames = ['Hello', 'This is a child folder'];
    expect(rootPath1FolderNames).toEqual(expectedRootNames);
    expect(rootPath2FolderNames).toEqual(expectedRootNames);
    expect(singleFolder1FolderNames).toEqual(expectedSingleFolderNames);
    expect(singleFolder2FolderNames).toEqual(expectedSingleFolderNames);
    expect(singleFolder3FolderNames).toEqual(expectedSingleFolderNames);
    expect(singleFolder4FolderNames).toEqual(expectedSingleFolderNames);
    expect(doubleFolder1FolderNames).toEqual(expectedDoubleFolderNames);
    expect(doubleFolder2FolderNames).toEqual(expectedDoubleFolderNames);
    expect(doubleFolder3FolderNames).toEqual(expectedDoubleFolderNames);
    expect(doubleFolder4FolderNames).toEqual(expectedDoubleFolderNames);
  });

  it('combinePaths should create combined display path', () => {
    // Arrange
    const pathEndSlash = 'end with slash\\';
    const pathStartSlash = '\\start with slash';
    const pathStartEndSlash = '\\full path test\\';
    const pathNoSlash = 'test path';
    const pathMiddleSlash = 'test\\path';
    // Act

    // Assert
    expect(combinePaths(pathEndSlash, pathStartSlash)).toEqual('\\end with slash\\start with slash\\');
    expect(combinePaths(pathStartSlash, pathStartSlash)).toEqual('\\start with slash\\start with slash\\');
    expect(combinePaths(pathStartEndSlash, pathStartEndSlash)).toEqual('\\full path test\\full path test\\');
    expect(combinePaths(pathNoSlash, pathMiddleSlash)).toEqual('\\test path\\test\\path\\');
    expect(combinePaths(pathStartEndSlash, pathMiddleSlash)).toEqual('\\full path test\\test\\path\\');

  });

  it('should prepend . if not exist in getCleanedExtension', () => {
    // Arrange
    const expectedResultByInput = {
      '': undefined,
      'a': '.a',
      '.a': '.a',
      '.a ': '.a ',
      '.a.b': '.a.b'
    };

    // Act, Assert
    // eslint-disable-next-line guard-for-in
    for (const input in expectedResultByInput) {
      const expectedResult = expectedResultByInput[input];
      expect(getCleanedExtension(input)).toEqual(expectedResult);
    }
  });
});
