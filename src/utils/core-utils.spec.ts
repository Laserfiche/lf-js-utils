// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

import { validateDefined, waitForConditionAsync } from './core-utils.js';

describe('CoreUtils', () => {
    it('waitForConditionAsync should return if condition is met within time limit', async () => {
        let value = 5;
        const expected = 10;
        setTimeout(() => {
            value = 10;
        }, 500);
        await waitForConditionAsync(
            () => value === expected,
            () => { throw Error('Timeout');}
        );
        expect(value).toEqual(expected);
    });

    it('waitForConditionAsync should call timeout function if condition not met', async () => {
        let value = 5;
        const expected = 10;
        setTimeout(() => {
            value = 8;
        }, 500);
      try {
          await waitForConditionAsync(
            () => value === expected,
            () => { throw Error('Timeout');},
            1000
        );
      }
      catch(e) {
        const msg = (<Error>e).message;
        expect(msg.includes('Timeout')).toBeTruthy();
      }
    });

    it('validateDefined should return default if value is undefined', async () => {
        const testDefined = validateDefined(undefined, 'stringParam', 'defaultString');
        expect(testDefined).toEqual('defaultString');
    });

    it('validateDefined should throw if both value and default are undefined', async () => {
        expect(() => validateDefined(undefined, 'stringParam', undefined)).toThrowError('stringParam undefined');
    });

    it('validateDefined should return value if value is defined', async () => {
        const testDefined = validateDefined('validString', 'stringParam', 'defaultString');
        expect(testDefined).toEqual('validString');
    });

    it('validateDefined should return value if value is defined and default is undefined', async () => {
        const testDefined = validateDefined('validString', 'stringParam', undefined);
        expect(testDefined).toEqual('validString');
    });
});

