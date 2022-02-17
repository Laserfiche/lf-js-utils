export function getBaseName(path: string): string {
  if (path.endsWith('\\') && path.length > 0) {
    const length = path.length - 1;
    path = path.substring(0, length);
  }
  const start = path.lastIndexOf('\\') + 1;
  return path.substring(start);
}

export function sanitizeFileName(fileName: string): string {
  fileName = fileName.replace(/\\/g, '_');
  fileName = fileName?.trim();
  if (!fileName || fileName!.length <= 0) {
    fileName = 'File Name';
  }
  return fileName;
}

export function removeFileExtension(fileName: string) {
  if (fileName.includes('.')) {
    const lastDot = fileName.lastIndexOf('.');
    const onlyName = fileName.slice(0, lastDot);
    return onlyName;
  }
  else {
    return fileName;
  }
}

export function getFileExtension(fileName: string): string | undefined {
  if (fileName.includes('.')) {
    return fileName.split('.').pop();
  }
  else {
    return undefined;
  }
}

export function combinePaths(path1: string, path2: string): string {
  let combinedPath: string;
  if (path1.endsWith('\\') && path2[0] === '\\') {
    combinedPath = path1 + path2.slice(1);
  }
  else if (path1.endsWith('\\') || path2[0] === '\\') {
    combinedPath = path1 + path2;
  }
  else {
    combinedPath = path1 + '\\' + path2;
  }
  return createDisplayPath(combinedPath);
}

/**
 * @param extension 
 * @returns file extension with a dot
 */
export function getCleanedExtension(extension: string | undefined): string | undefined {
  if (extension) {
    return extension.charAt(0) === '.' ? extension : ('.'.concat(extension))
  }
  else {
    return undefined;
  }
}

export function getListOfFolderNames(path: string): string[] {
  const pathWithAllBackslashes: string = createDisplayPath(path);
  const splitPath: string[] = pathWithAllBackslashes.split('\\');
  const nonEmptyFolderNames = splitPath.filter(folderName => folderName !== '');
  return nonEmptyFolderNames;
}

export function createDisplayPath(path: string): string {
  let newPath: string = path;
  if (!newPath.startsWith('\\')) {
    newPath = '\\'.concat(newPath);
  }
  if (!newPath.endsWith('\\')) {
    newPath = newPath.concat('\\');
  }
  return newPath;
}

export function replaceImporterUserToken(stringWithPossibleTokens: string, username: string | undefined): string {
  if (username) {
    const importerUserToken: RegExp = /%\(ImporterUser\)/ig;
    const stringWithReplacedTokens = stringWithPossibleTokens.replace(importerUserToken, username);
    return stringWithReplacedTokens;
  }
  return stringWithPossibleTokens;
}

export function containsImporterUserToken(stringWithPossibleTokens: string): boolean {
  const importerUserToken: RegExp = /%\(ImporterUser\)/ig;
  const tokenExists: boolean = stringWithPossibleTokens.match(importerUserToken) !== null;
  return tokenExists;
}
