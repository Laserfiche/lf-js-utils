// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

/**
 * Returns the url to an svg icon from https://lfxstatic.com/npm/@laserfiche/lf-resource-library@4/resources/icons/document-icons.svg.
 * @param iconId e.g. edoc-code-20
 * @returns the url
 * @example
 * ```typescript
 * getDocumentIconUrlFromIconId('edoc-code-20'); // 'https://lfxstatic.com/npm/@laserfiche/lf-resource-library@4/resources/icons/document-icons.svg#edoc-code-20'
 * ```
 */
 export function getDocumentIconUrlFromIconId(iconId: string): string {
    return `https://lfxstatic.com/npm/@laserfiche/lf-resource-library@4/resources/icons/document-icons.svg#${iconId}`;
}

/**
 * Returns the icon id given a file extension from https://lfxstatic.com/@laserfiche/lf-resource-library@4/resources/icons/document-icons.svg.
 * @param ext
 * @returns icon id
 * @example
 * ```typescript
 * getDocumentIconIdFromExtension('html'); // 'edoc-code-20'
 * ```
 */
export function getDocumentIconIdFromExtension(ext: string | undefined): string {
    const suffix: string = '-20';
    switch (ext) {
        case undefined:
        case '':
            return 'document' + suffix;
        case 'ascx':
        case 'aspx':
        case 'cs':
        case 'css':
        case 'htm':
        case 'html':
        case 'js':
        case 'jsproj':
        case 'vbs':
        case 'xml':
            return 'edoc-code' + suffix;
        case 'avi':
        case 'mov':
        case 'mpeg':
        case 'rm':
        case 'wmv':
        case 'mp4':
        case 'webm':
        case 'ogv':
        case 'ogg':
            return 'edoc-movie' + suffix;
        case 'bmp':
        case 'gif':
        case 'jpeg':
        case 'jpg':
        case 'png':
        case 'tif':
        case 'tiff':
            return 'image' + suffix;
        case 'config':
            return 'edoc-config' + suffix;
        case 'doc':
        case 'docx':
        case 'dot':
            return 'edoc-wordprocessing' + suffix;
        case 'mdb':
        case 'accdb':
            return 'edoc-database' + suffix;
        case 'pdf':
            return 'edoc-pdf' + suffix;
        case 'ppt':
        case 'pptx':
            return 'edoc-presentation' + suffix;
        case 'qfx':
            return 'edoc-qfx' + suffix;
        case 'reg':
            return 'edoc-registry' + suffix;
        case 'rtf':
        case 'txt':
            return 'edoc-text' + suffix;
        case 'wav':
        case 'mp2':
        case 'mp3':
        case 'opus':
        case 'oga':
            return 'edoc-audio' + suffix;
        case 'wfx':
            return 'edoc-wfx' + suffix;
        case 'csv':
        case 'xls':
        case 'xlsm':
        case 'xlsx':
            return 'edoc-spreadsheet' + suffix;
        case 'zip':
        case 'gz':
        case 'rar':
        case '7z':
            return 'edoc-zip' + suffix;
        case 'msg':
        case 'eml':
            return 'email' + suffix;
        case 'lnk':
            return 'link' + suffix;
        case 'lfb':
            return 'edoc-briefcase' + suffix;
        default:
            return 'edoc-generic' + suffix;
    }
}
