		
export default {
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
  };