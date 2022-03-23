/**
 * Returns the last past segment for a '\' delimited string
 * @param path to a folder or a file
 * @returns the last segment
 */
export function getLastPathSegment(path: string): string {
  if (path.endsWith('\\') && path.length > 0) {
    const length = path.length - 1;
    path = path.substring(0, length);
  }
  const start = path.lastIndexOf('\\') + 1;
  return path.substring(start);
}

/**
 * Replaces '\' with '_' or 'File Name' if empty
 * @param fileName 
 * @returns sanitized file name supported by laserfiche repository
 */
export function sanitizeFileName(fileName: string): string {
  fileName = fileName.replace(/\\/g, '_');
  fileName = fileName?.trim();
  if (!fileName || fileName!.length <= 0) {
    fileName = 'File Name';
  }
  return fileName;
}

/**
 * Removes the file extension if exists
 * @param fileName 
 * @returns file name without extension
 */
export function removeFileExtension(fileName: string): string {
  if (fileName.includes('.')) {
    const lastDot = fileName.lastIndexOf('.');
    const onlyName = fileName.slice(0, lastDot);
    return onlyName;
  }
  else {
    return fileName;
  }
}

/**
 * Returns the file extension of a file, or undefined
 * @param fileName 
 * @returns the file extension, or undefined
 */
export function getFileExtension(fileName: string): string | undefined {
  if (fileName.includes('.')) {
    return fileName.split('.').pop();
  }
  else {
    return undefined;
  }
}

/**
 * Concatenates two paths, using '\' character
 * @param path1 
 * @param path2 
 * @returns the concatenated file path
 */
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
 * Prepends a dot to file extension if dot doesn't exist
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

/**
 * Returns the path segments as an array
 * @param path 
 * @returns the path segments
 */
export function getListOfFolderNames(path: string): string[] {
  const pathWithAllBackslashes: string = createDisplayPath(path);
  const splitPath: string[] = pathWithAllBackslashes.split('\\');
  const nonEmptyFolderNames = splitPath.filter(folderName => folderName !== '');
  return nonEmptyFolderNames;
}

/**
 * Ensures the path starts and ends with '\'
 * @param path 
 * @returns path with '\'
 */
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
