// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

export default {
  projects: [
    {
      displayName: 'dom',
      preset: 'ts-jest',
      moduleDirectories: ['node_modules', '/src'],
      moduleFileExtensions: ['ts', 'js'],
      reporters: ['default', 'jest-junit'],
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.ts$',
      testEnvironment: 'jsdom',
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.test.json'
        },
      },
      moduleNameMapper: {
        "^./(.*).js$": "./$1",
      }
    },
    {
      displayName: 'node',
      preset: 'ts-jest',
      moduleDirectories: ['node_modules', '/src'],
      moduleFileExtensions: ['ts', 'js'],
      reporters: ['default', 'jest-junit'],
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.ts$',
      testEnvironment: 'node',
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.test.json'
        },
      },
      moduleNameMapper: {
        "^./(.*).js$": "./$1",
      },
    }
  ]
};