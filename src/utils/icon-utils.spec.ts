// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

import { getDocumentIconIdFromExtension, getDocumentIconUrlFromIconId } from './icon-utils.js';

describe('IconUtils', () => {
    it('should return Icon url given an Icon id', () => {
        // Arrange
        const expectedResultByInput = {
            '': 'https://lfxstatic.com/npm/@laserfiche/lf-resource-library@4/resources/icons/document-icons.svg#',
            'a': 'https://lfxstatic.com/npm/@laserfiche/lf-resource-library@4/resources/icons/document-icons.svg#a',
            undefined: 'https://lfxstatic.com/npm/@laserfiche/lf-resource-library@4/resources/icons/document-icons.svg#undefined'
        };
        // Act, Assert
        // eslint-disable-next-line guard-for-in
        for (const input in expectedResultByInput) {
            const expectedResult = expectedResultByInput[input];
            expect(getDocumentIconUrlFromIconId(input)).toEqual(expectedResult);
        }
    });

    it('should get document icon from extension', () => {
        // Arrange
        const expectedResultByInput = {
            '': 'document-20',
            'css': 'edoc-code-20',
            'mov': 'edoc-movie-20',
            'bmp': 'image-20',
            'config': 'edoc-config-20',
            'docx': 'edoc-wordprocessing-20',
            'qfx': 'edoc-qfx-20',
            'pdf': 'edoc-pdf-20',
            'accdb': 'edoc-database-20',
            'pptx': 'edoc-presentation-20',
            'reg': 'edoc-registry-20',
            'txt': 'edoc-text-20',
            'mp3': 'edoc-audio-20',
            'wfx': 'edoc-wfx-20',
            'xls': 'edoc-spreadsheet-20',
            'zip': 'edoc-zip-20',
            'msg': 'email-20',
            'lnk': 'link-20',
            'lfb': 'edoc-briefcase-20',
            'abc': 'edoc-generic-20'
        };

        // Act, Assert
        // eslint-disable-next-line guard-for-in
        for (const input in expectedResultByInput) {
            const expectedResult = expectedResultByInput[input];
            expect(getDocumentIconIdFromExtension(input)).toEqual(expectedResult);
        }
        expect(getDocumentIconIdFromExtension(undefined)).toEqual('document-20');
    });
});
