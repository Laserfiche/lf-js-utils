/**
 * Returns the url to an svg icon from https://lfxstatic.com/Site/laserfiche-ui-components/3.0/lf_addin_icons.svg.
 * @param iconId 
 * @returns the url
 */
 export function getDocumentIconUrlFromIconId(iconId: string): string {
    return `https://lfxstatic.com/Site/laserfiche-ui-components/3.0/lf_addin_icons.svg#${iconId}`; // TODO: get from lf-resource-library
}

/**
 * Returns the icon id given a file extension from https://lfxstatic.com/Site/laserfiche-ui-components/3.0/lf_addin_icons.svg.
 * @param ext 
 * @returns icon id
 */
export function getDocumentIconIdFromExtension(ext: string | undefined): string {
    const suffix: string = '-20';
    switch (ext) {
        case undefined:
        case '':
            console.log('hereer')
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
            console.log(ext)
            return 'edoc-generic' + suffix;
    }
}
