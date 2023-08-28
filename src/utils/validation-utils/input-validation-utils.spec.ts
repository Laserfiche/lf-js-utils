import { inputIsEmpty } from "./input-validation-utils";

describe('inputValidationUtils', () => {
  it('inputIsEmpty returns true if the input is an empty string', () => {
    //Arrange
    const value = '';
    //Act
    const result = inputIsEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('inputIsEmpty returns true if the input contains only empty space character', () => {
    //Arrange
    const value = '    ';
    //Act
    const result =inputIsEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('inputIsEmpty returns true if the input is a tab character', () => {
    //Arrange
    const value = '\t';
    //Act
    const result =inputIsEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('inputIsEmpty returns true if the input is a end of line char', () => {
    //Arrange
    const value = '\n';
    //Act
    const result =inputIsEmpty(value);
    //Assert
    expect(result).toBe(true);
  });

  it('inputIsEmpty returns false if the input contains any character other than space', () => {
    //Arrange
    const validInputField = [
      ' a b c ',
      'a',
      ' a',
      'a ',
      'a\n'
    ]
    //Act
    for (const input of validInputField) {
      expect(inputIsEmpty(input)).toBe(false);
    }
  });
});
