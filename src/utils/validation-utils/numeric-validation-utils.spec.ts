// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.


import { numeric_testables, evaluateNumericValidationExpression } from './numeric-validation-utils.js';

describe('NumericValidationUtils', () => {
  it('should validate a valid 4-digit number', () => {
    // Arrange
    const value1: string = '1000';
    const value2: string = '9999';
    const value3: string = '1536';
    const numericConstraint: string = '>=1000 &  <=9999';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(value1, numericConstraint);
    const validate2: boolean = evaluateNumericValidationExpression(value2, numericConstraint);
    const validate3: boolean = evaluateNumericValidationExpression(value3, numericConstraint);

    // Assert
    expect(validate1).toBeTruthy();
    expect(validate2).toBeTruthy();
    expect(validate3).toBeTruthy();
  });

  it('should validate an invalid 4-digit number', () => {
    // Arrange
    const threeDigit: string = '100';
    const fiveDigit: string = '99999';
    const numericConstraint: string = '>=1000 &  <=9999';

    // Act
    const validateThreeDigit: boolean = evaluateNumericValidationExpression(threeDigit, numericConstraint);
    const validateFiveDigit: boolean = evaluateNumericValidationExpression(fiveDigit, numericConstraint);

    // Assert
    expect(validateThreeDigit).toBeFalsy();
    expect(validateFiveDigit).toBeFalsy();
  });

  it('should generateNumericValidationExpression for constraint: 4-digit number', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '>=1000 &  <=9999';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '12345>=1000&&12345<=9999';
    expect(expression).toEqual(expected);
  });

  it('should validate a valid positive number', () => {
    // Arrange
    const value1: string = '0';
    const value2: string = '9999';
    const numericConstraint: string = '>=0';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(value1, numericConstraint);
    const validate2: boolean = evaluateNumericValidationExpression(value2, numericConstraint);

    // Assert
    expect(validate1).toBeTruthy();
    expect(validate2).toBeTruthy();
  });

  it('should validate an invalid positive number', () => {
    // Arrange
    const negative: string = '-100';
    const numericConstraint: string = '>=0';

    // Act
    const validateNegative: boolean = evaluateNumericValidationExpression(negative, numericConstraint);

    // Assert
    expect(validateNegative).toBeFalsy();
  });

  it('should generateNumericValidationExpression for constraint: positive number', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '>=0';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '12345>=0';
    expect(expression).toEqual(expected);
  });

  it('should validate a valid number greater than 4', () => {
    // Arrange
    const value1: string = '5';
    const value2: string = '9999';
    const numericConstraint: string = '>4';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(value1, numericConstraint);
    const validate2: boolean = evaluateNumericValidationExpression(value2, numericConstraint);

    // Assert
    expect(validate1).toBeTruthy();
    expect(validate2).toBeTruthy();
  });

  it('should validate an invalid number greater than 4', () => {
    // Arrange
    const negative: string = '-100';
    const lessThan: string = '2';
    const exactlyFour: string = '4';
    const numericConstraint: string = '>4';

    // Act
    const validateNegative: boolean = evaluateNumericValidationExpression(negative, numericConstraint);
    const validateLessThan: boolean = evaluateNumericValidationExpression(lessThan, numericConstraint);
    const validateExactlyFour: boolean = evaluateNumericValidationExpression(exactlyFour, numericConstraint);

    // Assert
    expect(validateNegative).toBeFalsy();
    expect(validateLessThan).toBeFalsy();
    expect(validateExactlyFour).toBeFalsy();
  });

  it('should generateNumericValidationExpression for constraint: greater than 4', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '>4';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '12345>4';
    expect(expression).toEqual(expected);
  });

  it('should validate a valid number less than or equal to 2.5', () => {
    // Arrange
    const value1: string = '-2';
    const value2: string = '0.35';
    const value3: string = '1';
    const value4: string = '2.5';
    const numericConstraint: string = '<=2.5';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(value1, numericConstraint);
    const validate2: boolean = evaluateNumericValidationExpression(value2, numericConstraint);
    const validate3: boolean = evaluateNumericValidationExpression(value3, numericConstraint);
    const validate4: boolean = evaluateNumericValidationExpression(value4, numericConstraint);

    // Assert
    expect(validate1).toBeTruthy();
    expect(validate2).toBeTruthy();
    expect(validate3).toBeTruthy();
    expect(validate4).toBeTruthy();
  });

  it('should validate an invalid number less than or equal to 2.5', () => {
    // Arrange
    const barelyAbove: string = '2.51';
    const above: string = '100';
    const numericConstraint: string = '<=2.5';

    // Act
    const validateBarelyAbove: boolean = evaluateNumericValidationExpression(barelyAbove, numericConstraint);
    const validateAbove: boolean = evaluateNumericValidationExpression(above, numericConstraint);

    // Assert
    expect(validateBarelyAbove).toBeFalsy();
    expect(validateAbove).toBeFalsy();
  });

  it('should generateNumericValidationExpression for constraint: less than or equal to 2.5', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '<=2.5';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '12345<=2.5';
    expect(expression).toEqual(expected);
  });

  it('should validate a valid number NOT greater than 999', () => {
    // Arrange
    const value1: string = '5';
    const value2: string = '999';
    const value3: string = '-999';
    const numericConstraint: string = '!>999';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(value1, numericConstraint);
    const validate2: boolean = evaluateNumericValidationExpression(value2, numericConstraint);
    const validate3: boolean = evaluateNumericValidationExpression(value3, numericConstraint);

    // Assert
    expect(validate1).toBeTruthy();
    expect(validate2).toBeTruthy();
    expect(validate3).toBeTruthy();
  });

  it('should validate an invalid number NOT greater than 999', () => {
    // Arrange
    const greater: string = '1000';
    const numericConstraint: string = '!>999';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(greater, numericConstraint);

    // Assert
    expect(validate1).toBeFalsy();
  });

  it('should generateNumericValidationExpression for constraint: NOT greater than 999', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '!>999';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '12345<=999';
    expect(expression).toEqual(expected);
  });

  it('should validate a number that has way too many ! (odd)', () => {
    // Arrange
    const greater: string = '1000';
    const numericConstraint: string = '!!!>999';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(greater, numericConstraint);

    // Assert
    expect(validate1).toBeFalsy();
  });

  it('should generateNumericValidationExpression for constraint: way too many ! (odd)', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '!!!>999';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '12345<=999';
    expect(expression).toEqual(expected);
  });

  it('should validate a number that has way too many ! (even)', () => {
    // Arrange
    const greater: string = '1000';
    const numericConstraint: string = '!!>999';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(greater, numericConstraint);

    // Assert
    expect(validate1).toBeTruthy();
  });

  it('should generateNumericValidationExpression for constraint: way too many ! (even)', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '!!>999';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '12345>999';
    expect(expression).toEqual(expected);
  });

  it('should validate a valid number between 1 and 10, not including 1 and 10', () => {
    // Arrange
    const value1: string = '2';
    const value2: string = '9';
    const numericConstraint: string = '1 < & < 10';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(value1, numericConstraint);
    const validate2: boolean = evaluateNumericValidationExpression(value2, numericConstraint);

    // Assert
    expect(validate1).toBeTruthy();
    expect(validate2).toBeTruthy();
  });

  it('should validate an invalid number between 1 and 10, not including 1 and 10', () => {
    // Arrange
    const one: string = '1';
    const ten: string = '10';
    const above: string = '11';
    const below: string = '0';
    const numericConstraint: string = '1 < & < 10';

    // Act
    const validateOne: boolean = evaluateNumericValidationExpression(one, numericConstraint);
    const validateTen: boolean = evaluateNumericValidationExpression(ten, numericConstraint);
    const validateAbove: boolean = evaluateNumericValidationExpression(above, numericConstraint);
    const validateBelow: boolean = evaluateNumericValidationExpression(below, numericConstraint);

    // Assert
    expect(validateOne).toBeFalsy();
    expect(validateTen).toBeFalsy();
    expect(validateAbove).toBeFalsy();
    expect(validateBelow).toBeFalsy();
  });

  it('should generateNumericValidationExpression for constraint: between 1 and 10, not including 1 and 10', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '1 < & < 10';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '1<12345&&12345<10';
    expect(expression).toEqual(expected);
  });

  it('should validate a valid number between 100 and 200 or between 500 and 900, including 100, 200, 500 and 900', () => {
    // Arrange
    const value1: string = '100';
    const value2: string = '105';
    const value3: string = '200';
    const value4: string = '500';
    const value5: string = '600';
    const value6: string = '900';
    const numericConstraint: string = '(>=100 & <=200) | (>=500 & <=900)';

    // Act
    const validate1: boolean = evaluateNumericValidationExpression(value1, numericConstraint);
    const validate2: boolean = evaluateNumericValidationExpression(value2, numericConstraint);
    const validate3: boolean = evaluateNumericValidationExpression(value3, numericConstraint);
    const validate4: boolean = evaluateNumericValidationExpression(value4, numericConstraint);
    const validate5: boolean = evaluateNumericValidationExpression(value5, numericConstraint);
    const validate6: boolean = evaluateNumericValidationExpression(value6, numericConstraint);

    // Assert
    expect(validate1).toBeTruthy();
    expect(validate2).toBeTruthy();
    expect(validate3).toBeTruthy();
    expect(validate4).toBeTruthy();
    expect(validate5).toBeTruthy();
    expect(validate6).toBeTruthy();
  });

  it('should validate an invalid number between 100 and 200 or between 500 and 900, including 100, 200, 500 and 900', () => {
    // Arrange
    const negative: string = '-99';
    const zero: string = '0';
    const below: string = '99';
    const between: string = '205';
    const above: string = '901';
    const numericConstraint: string = '(>=100 & <=200) | (>=500 & <=900)';

    // Act
    const validateNegative: boolean = evaluateNumericValidationExpression(negative, numericConstraint);
    const validateZero: boolean = evaluateNumericValidationExpression(zero, numericConstraint);
    const validateBelow: boolean = evaluateNumericValidationExpression(below, numericConstraint);
    const validateBetween: boolean = evaluateNumericValidationExpression(between, numericConstraint);
    const validateAbove: boolean = evaluateNumericValidationExpression(above, numericConstraint);

    // Assert
    expect(validateNegative).toBeFalsy();
    expect(validateZero).toBeFalsy();
    expect(validateBelow).toBeFalsy();
    expect(validateBetween).toBeFalsy();
    expect(validateAbove).toBeFalsy();
  });

  it('should generateNumericValidationExpression for constraint: between 100 and 200 or between 500 and 900, including 100, 200, 500 and 900', () => {
    // Arrange
    const value1: string = '12345';
    const numericConstraint: string = '(>=100 & <=200) | (>=500 & <=900)';

    // Act
    const expression: string = numeric_testables.generateNumericValidationExpression(value1, numericConstraint);

    // Assert
    const expected: string = '(12345>=100&&12345<=200)||(12345>=500&&12345<=900)';
    expect(expression).toEqual(expected);
  });

  it('should tokenizeLfConstraint for >4', () => {
    // Arrange
    const constraint: string = '>4';

    // Act
    const tokenized = numeric_testables.tokenizeLfConstraint(constraint);

    // Assert
    const expected = [
      { type: numeric_testables.LFTokenType.COMPARER, value: '>', startIndex: 0 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '4', startIndex: 1 }
    ];
    expect(tokenized).toEqual(expected);
  });

  it('should tokenizeLfConstraint for !>999', () => {
    // Arrange
    const constraint: string = '!>999';

    // Act
    const tokenized = numeric_testables.tokenizeLfConstraint(constraint);

    // Assert
    const expected = [
      { type: numeric_testables.LFTokenType.NOT, value: '!', startIndex: 0 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '>', startIndex: 1 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 2 }
    ];
    expect(tokenized).toEqual(expected);
  });

  it('should tokenizeLfConstraint for 1 < & < 10', () => {
    // Arrange
    const constraint: string = '1 < & < 10';

    // Act
    const tokenized = numeric_testables.tokenizeLfConstraint(constraint);

    // Assert
    const expected = [
      { type: numeric_testables.LFTokenType.NUMERIC, value: '1', startIndex: 0 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 2 },
      { type: numeric_testables.LFTokenType.LOGICAL, value: '&', startIndex: 4 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 6 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '10', startIndex: 8 }
    ];
    expect(tokenized).toEqual(expected);
  });

  it('should tokenizeLfConstraint for (>=100 & <=200) | (>=500 & <=900)', () => {
    // Arrange
    const constraint: string = '(>=100 & <=200) | (>=500 & <=900)';

    // Act
    const tokenized = numeric_testables.tokenizeLfConstraint(constraint);

    // Assert
    const expected = [
      { type: numeric_testables.LFTokenType.PARENTHESES, value: '(', startIndex: 0 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '>=', startIndex: 1 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '100', startIndex: 3 },
      { type: numeric_testables.LFTokenType.LOGICAL, value: '&', startIndex: 7 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<=', startIndex: 9 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '200', startIndex: 11 },
      { type: numeric_testables.LFTokenType.PARENTHESES, value: ')', startIndex: 14 },
      { type: numeric_testables.LFTokenType.LOGICAL, value: '|', startIndex: 16 },
      { type: numeric_testables.LFTokenType.PARENTHESES, value: '(', startIndex: 18 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '>=', startIndex: 19 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '500', startIndex: 21 },
      { type: numeric_testables.LFTokenType.LOGICAL, value: '&', startIndex: 25 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<=', startIndex: 27 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '900', startIndex: 29 },
      { type: numeric_testables.LFTokenType.PARENTHESES, value: ')', startIndex: 32 }
    ];
    expect(tokenized).toEqual(expected);
  });

  it('should tokenizeLfConstraint for uppercase and lowercase AND', () => {
    // Arrange
    const constraint: string = '<999 and <999 AnD <999& <999';

    // Act
    const tokenized = numeric_testables.tokenizeLfConstraint(constraint);

    // Assert
    const expected = [
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 0 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 1 },
      { type: numeric_testables.LFTokenType.WORD, value: 'and', startIndex: 5 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 9 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 10 },
      { type: numeric_testables.LFTokenType.WORD, value: 'and', startIndex: 14 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 18 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 19 },
      { type: numeric_testables.LFTokenType.LOGICAL, value: '&', startIndex: 22 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 24 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 25 }
    ];
    expect(tokenized).toEqual(expected);
  });

  it('should tokenizeLfConstraint for uppercase and lowercase OR', () => {
    // Arrange
    const constraint: string = '<999 oR <999 or <999OR <999 |   <999';

    // Act
    const tokenized = numeric_testables.tokenizeLfConstraint(constraint);

    // Assert
    const expected = [
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 0 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 1 },
      { type: numeric_testables.LFTokenType.WORD, value: 'or', startIndex: 5 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 8 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 9 },
      { type: numeric_testables.LFTokenType.WORD, value: 'or', startIndex: 13 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 16 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 17 },
      { type: numeric_testables.LFTokenType.WORD, value: 'or', startIndex: 20 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 23 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 24 },
      { type: numeric_testables.LFTokenType.LOGICAL, value: '|', startIndex: 28 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '<', startIndex: 32 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 33 }
    ];
    expect(tokenized).toEqual(expected);
  });

  it('should tokenizeLfConstraint for uppercase and lowercase NOT', () => {
    // Arrange
    const constraint: string = '!>=999 or NOT >=999 OR not>=999|nOT>=999';

    // Act
    const tokenized = numeric_testables.tokenizeLfConstraint(constraint);

    // Assert
    const expected = [
      { type: numeric_testables.LFTokenType.NOT, value: '!', startIndex: 0 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '>=', startIndex: 1 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 3 },
      { type: numeric_testables.LFTokenType.WORD, value: 'or', startIndex: 7 },
      { type: numeric_testables.LFTokenType.WORD, value: 'not', startIndex: 10 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '>=', startIndex: 14 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 16 },
      { type: numeric_testables.LFTokenType.WORD, value: 'or', startIndex: 20 },
      { type: numeric_testables.LFTokenType.WORD, value: 'not', startIndex: 23 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '>=', startIndex: 26 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 28 },
      { type: numeric_testables.LFTokenType.LOGICAL, value: '|', startIndex: 31 },
      { type: numeric_testables.LFTokenType.WORD, value: 'not', startIndex: 32 },
      { type: numeric_testables.LFTokenType.COMPARER, value: '>=', startIndex: 35 },
      { type: numeric_testables.LFTokenType.NUMERIC, value: '999', startIndex: 37 }
    ];
    expect(tokenized).toEqual(expected);
  });
});
