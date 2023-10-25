// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

import { text_testables, formatTextConstraint, isNullOrEmpty } from './text-validation-utils.js';

describe('TextValidationUtils', () => {
  it('should add ^ to beginning if not present', () => {
    // Arrange
    const constraint: string = '\\d\\d\\d$';

    // Act
    const newConstraint: string = text_testables.createStrictRegexConstraint(constraint);

    // Assert
    const expected: string = '^\\d\\d\\d$';
    expect(newConstraint).toEqual(expected);
  });

  it('should add $ to end if not present', () => {
    // Arrange
    const constraint: string = '^\\d\\d\\d';

    // Act
    const newConstraint: string = text_testables.createStrictRegexConstraint(constraint);

    // Assert
    const expected: string = '^\\d\\d\\d$';
    expect(newConstraint).toEqual(expected);
  });

  it('should add ^ to beginning and $ to end if not present', () => {
    // Arrange
    const constraint: string = '\\d\\d\\d';

    // Act
    const newConstraint: string = text_testables.createStrictRegexConstraint(constraint);

    // Assert
    const expected: string = '^\\d\\d\\d$';
    expect(newConstraint).toEqual(expected);
  });

  it('should not add ^ to beginning and $ to end if both are present', () => {
    // Arrange
    const constraint: string = '^\\d\\d\\d$';

    // Act
    const newConstraint: string = text_testables.createStrictRegexConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = constraint;
    expect(newConstraint).toEqual(expected);
    expect(regex.test('111')).toBeTruthy();
    expect(regex.test('a111')).toBeFalsy();
    expect(regex.test('abc')).toBeFalsy();
  });

  it('should respect character class [[:alnum:]]', () => {
    // Arrange
    const goodVal: string = 'ab1';
    const tooShortVal: string = '2';
    const tooLongVal: string = 'abcd';
    const notAlnumVal: string = '\\';
    const constraint: string = '[[:alnum:]][[:alnum:]][[:alnum:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^[0-9A-Za-z][0-9A-Za-z][0-9A-Za-z]$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notAlnumVal)).toBeFalsy();
  });

  it('should respect character class [[:alpha:]]', () => {
    // Arrange
    const goodVal: string = 'aaaBaaaC';
    const tooShortVal: string = 'aaaBaaa';
    const tooLongVal: string = 'aaaBaaaCa';
    const notAlphaVal: string = 'aaa1aaa2';
    const constraint: string = 'aaa[[:alpha:]]aaa[[:alpha:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^aaa[A-Za-z]aaa[A-Za-z]$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notAlphaVal)).toBeFalsy();
  });

  it('should respect character class [[:blank:]]', () => {
    // Arrange
    const goodValSpaces: string = ' bbb ';
    const goodValTabs: string = '\tbbb\t';
    const tooShortVal: string = ' bbb';
    const tooLongVal: string = ' bbb  ';
    const notBlankVal: string = 'sad';
    const constraint: string = '[[:blank:]]bbb[[:blank:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^[ \t]bbb[ \t]$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodValSpaces)).toBeTruthy();
    expect(regex.test(goodValTabs)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notBlankVal)).toBeFalsy();
  });

  it('should respect character class [[:digit:]]', () => {
    // Arrange
    const goodVal: string = '123';
    const tooShortVal: string = '12';
    const tooLongVal: string = '1234';
    const notDigitVal: string = 'sad';
    const constraint: string = '[[:digit:]][[:digit:]][[:digit:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^\\d\\d\\d$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notDigitVal)).toBeFalsy();
  });

  it('should respect character class [[:lower:]]', () => {
    // Arrange
    const goodVal: string = 'lllaa';
    const tooShortVal: string = 'llla';
    const tooLongVal: string = 'lllaaa';
    const notLowerVal: string = 'lllAA';
    const constraint: string = 'lll[[:lower:]][[:lower:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^lll[a-z][a-z]$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notLowerVal)).toBeFalsy();
  });

  it('should respect character class [[:print:]]', () => {
    // Arrange
    const goodVal: string = 'ppp||';
    const tooShortVal: string = 'pppa';
    const tooLongVal: string = 'pppaaa';
    const notPrintVal: string = 'ppp\t\t';
    const constraint: string = 'ppp[[:print:]][[:print:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^ppp[ -~][ -~]$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notPrintVal)).toBeFalsy();
  });

  it('should respect character class [[:punct:]]', () => {
    // Arrange
    const goodVal: string = '\\ppp|';
    const tooShortVal: string = '!ppp';
    const tooLongVal: string = '!ppp??';
    const notPunctVal: string = 'ppppp';
    const constraint: string = '[[:punct:]]ppp[[:punct:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string =
      '^[~`!@#$%^&*(){}[\\];:"\\\'<,.>?/\\\\|_+=\\-]ppp[~`!@#$%^&*(){}[\\];:"\\\'<,.>?/\\\\|_+=\\-]$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notPunctVal)).toBeFalsy();
  });

  it('should respect character class [[:space:]]', () => {
    // Arrange
    const goodVal: string = '     ';
    const tooShortVal: string = '    ';
    const tooLongVal: string = '      ';
    const notSpaceVal: string = 'p p p';
    const constraint: string = '[[:space:]] [[:space:]] [[:space:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^\\s \\s \\s$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notSpaceVal)).toBeFalsy();
  });

  it('should respect character class [[:upper:]]', () => {
    // Arrange
    const goodVal: string = 'ABC';
    const tooShortVal: string = 'AB';
    const tooLongVal: string = 'ABCD';
    const notUpperVal: string = 'abc';
    const constraint: string = '[[:upper:]][[:upper:]][[:upper:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^[A-Z][A-Z][A-Z]$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notUpperVal)).toBeFalsy();
  });

  it('should respect character class [[:xdigit:]]', () => {
    // Arrange
    const goodVal: string = 'ABC';
    const tooShortVal: string = 'AB';
    const tooLongVal: string = 'ABCD';
    const notXdigitVal: string = '!#%';
    const constraint: string = '[[:xdigit:]][[:xdigit:]][[:xdigit:]]';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notXdigitVal)).toBeFalsy();
  });

  it('should respect character class [[:word:]]', () => {
    // Arrange
    const goodVal: string = 'wwwABCwww';
    const tooShortVal: string = 'wwwABwww';
    const tooLongVal: string = 'wwwABCDwww';
    const notWordVal: string = 'www!#%www';
    const constraint: string = 'www[[:word:]][[:word:]][[:word:]]www';

    // Act
    const newConstraint: string = formatTextConstraint(constraint);
    const regex: RegExp = new RegExp(newConstraint);

    // Assert
    const expected: string = '^www\\w\\w\\wwww$';

    expect(newConstraint).toEqual(expected);
    expect(regex.test(goodVal)).toBeTruthy();
    expect(regex.test(tooShortVal)).toBeFalsy();
    expect(regex.test(tooLongVal)).toBeFalsy();
    expect(regex.test(notWordVal)).toBeFalsy();
  });

  it('isNullOrEmpty returns true if the input is an empty string', () => {
    //Arrange
    const value = '';
    //Act
    const result = isNullOrEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('isNullOrEmpty returns true if the input contains only empty space character', () => {
    //Arrange
    const value = '    ';
    //Act
    const result = isNullOrEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('isNullOrEmpty returns true if the input is a tab character', () => {
    //Arrange
    const value = '\t';
    //Act
    const result = isNullOrEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('isNullOrEmpty returns true if the input is null', () => {
    //Arrange
    const value = null;
    //Act
    const result = isNullOrEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('isNullOrEmpty returns true if the input is undefined', () => {
    //Arrange
    const value = undefined;
    //Act
    const result = isNullOrEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('isNullOrEmpty returns true if the input is a end of line char', () => {
    //Arrange
    const value = '\n';
    //Act
    const result = isNullOrEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('isNullOrEmpty returns false if the input contains any character other than space', () => {
    //Arrange
    const validInputField = [
      ' a b c ',
      'a',
      ' a',
      'a ',
      'a\n'
    ];
    //Act
    for (const input of validInputField) {
      expect(isNullOrEmpty(input)).toBe(false);
    }
  });
});
