import { formatString } from './string-utils';

describe('string-utils', () => {
  it('formatString should not replace variables if there are no variables or params', () => {
    // Arrange
    const stringWithNoParams: string = 'Hi there';
    const params = undefined;

    // Act
    const formattedString: string = formatString(stringWithNoParams, params);

    // Assert
    expect(formattedString).toEqual(stringWithNoParams);
  });

  it('formatString should throw if there are no variables to replace', () => {
    // Arrange
    const stringWithNoParams: string = 'Hi there';
    const params = ['One', 'Two'];
    const error = 'Expected 0 arguments. Actual arguments: 2';

    expect(() => {
      formatString(stringWithNoParams, params);
    }).toThrow(error);
  });

  it('formatString should format string with 1 variable', () => {
    // Arrange
    const stringWith1Param: string = 'Hi there {0}';
    const params = ['Patrick'];

    // Act
    const formattedString: string = formatString(stringWith1Param, params);

    // Assert
    const expectedFormattedString: string = 'Hi there Patrick';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should format string with {} with text inside instead of number', () => {
    // Arrange
    const stringWith1Param: string = 'Hi there {test}';

    // Act
    const formattedString: string = formatString(stringWith1Param);

    // Assert
    const expectedFormattedString: string = 'Hi there {test}';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should format string with 3 variables', () => {
    // Arrange
    const stringWith3Params: string = 'Hi there {0} {2} {1}';
    const params = ['Patrick', 'Spongebob', 'Sandy'];

    // Act
    const formattedString: string = formatString(stringWith3Params, params);

    // Assert
    const expectedFormattedString: string = 'Hi there Patrick Sandy Spongebob';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should throw error if there are too many params', () => {
    // Arrange
    const stringWith2Params: string = 'Hi there {0} {1}';
    const params = ['Patrick', 'Spongebob', 'Sandy'];
    const error = 'Expected 2 arguments. Actual arguments: 3';

    expect(() => {
      formatString(stringWith2Params, params);
    }).toThrow(error);
  });

  it('formatString should throw error if there are too few params', () => {
    // Arrange
    const stringWith3Params: string = 'Hi there {0} {2} {1}';
    const params = ['Patrick', 'Spongebob'];
    const error = 'Expected 3 arguments. Actual arguments: 2';

    expect(() => {
      formatString(stringWith3Params, params);
    }).toThrow(error);
  });

  it('formatString should work for strings with 10+ variables', () => {
    // Arrange
    const stringWith10PlusParams: string = 'Hi there {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11}';
    const params = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];

    // Act
    const formattedString: string = formatString(stringWith10PlusParams, params);

    // Assert
    const expectedFormattedString: string = 'Hi there zero one two three four five six seven eight nine ten eleven';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should work for strings with variables that appear twice', () => {
    // Arrange
    const stringWithRepeatedParams: string = 'Hi there {0} {1} {0}';
    const params = ['zero', 'one'];

    // Act
    const formattedString: string = formatString(stringWithRepeatedParams, params);

    // Assert
    const expectedFormattedString: string = 'Hi there zero one zero';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should work for strings with variables that appear twice and have multiple brackets', () => {
    // Arrange
    const stringWithRepeatedParams: string = 'Hi there {{{0} {1} {0}}}';
    const params = ['zero', 'one'];

    // Act
    const formattedString: string = formatString(stringWithRepeatedParams, params);

    // Assert
    const expectedFormattedString: string = 'Hi there {{zero one zero}}';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should not replace variables that are not all numbers', () => {
    // Arrange
    const stringWithRepeatedParams: string = 'Hi there {{{0} {1} {0test}}}';
    const params = ['zero', 'one'];

    // Act
    const formattedString: string = formatString(stringWithRepeatedParams, params);

    // Assert
    const expectedFormattedString: string = 'Hi there {{zero one {0test}}}';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should throw error if variables are repeated, and there are too many params', () => {
    // Arrange
    const stringWithRepeatedParams: string = 'Hi there {0} {1} {0}';
    const params = ['zero', 'one', 'zero'];
    const error = 'Expected 2 arguments. Actual arguments: 3';

    expect(() => {
      formatString(stringWithRepeatedParams, params);
    }).toThrow(error);
  });
});
