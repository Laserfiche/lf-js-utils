// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

const ALNUM: string = '\\[\\[:alnum:\\]\\]';
const ALPHA: string = '\\[\\[:alpha:\\]\\]';
const BLANK: string = '\\[\\[:blank:\\]\\]';
const DIGIT: string = '\\[\\[:digit:\\]\\]';
const LOWER: string = '\\[\\[:lower:\\]\\]';
const PRINT: string = '\\[\\[:print:\\]\\]';
const PUNCT: string = '\\[\\[:punct:\\]\\]';
const SPACE: string = '\\[\\[:space:\\]\\]';
const UPPER: string = '\\[\\[:upper:\\]\\]';
const XDIGIT: string = '\\[\\[:xdigit:\\]\\]';
const WORD: string = '\\[\\[:word:\\]\\]';
const OR: string = '|';

const CharacterClass: { [className: string]: string } = {
  '[[:alnum:]]': '[0-9A-Za-z]',
  '[[:alpha:]]': '[A-Za-z]',
  '[[:blank:]]': '[ \t]',
  '[[:digit:]]': '\\d',
  '[[:lower:]]': '[a-z]',
  '[[:print:]]': '[ -~]',
  '[[:punct:]]': '[~`!@#$%^&*(){}[\\];:"\\\'<,.>?/\\\\|_+=\\-]',
  '[[:space:]]': '\\s',
  '[[:upper:]]': '[A-Z]',
  '[[:xdigit:]]': '[0-9A-Fa-f]',
  '[[:word:]]': '\\w',
};

function createStrictRegexConstraint(constraint: string): string {
  let newConstraint = constraint;
  if (constraint?.length > 0) {
    if (constraint.charAt(0) !== '^') {
      newConstraint = '^' + constraint;
    }
    if (constraint.charAt(constraint.length - 1) !== '$') {
      newConstraint = newConstraint + '$';
    }
  }
  return newConstraint;
}

function replaceCharacterClasses(constraint: string): string {
  let newConstraint: string = constraint;
  const characterClassRegexString: string =
    ALNUM +
    OR +
    ALPHA +
    OR +
    BLANK +
    OR +
    DIGIT +
    OR +
    LOWER +
    OR +
    PRINT +
    OR +
    PUNCT +
    OR +
    SPACE +
    OR +
    UPPER +
    OR +
    XDIGIT +
    OR +
    WORD;
  const characterClassRegex: RegExp = new RegExp(characterClassRegexString, 'g');
  newConstraint = newConstraint.replace(characterClassRegex, (matched) => {
    return CharacterClass[matched];
  });
  return newConstraint;
}

/**
 * Given a string representing a laserfiche text constraint, returns the corresponding regex as string
 * @param textConstraint // e.g. '\[\[:alnum:\]\]\[\[:alnum:\]\]\[\[:alnum:\]\]'. Please reference the laserfiche documentation
 * for more information:
 * https://www.laserfiche.com/support/webhelp/Laserfiche/10/en-US/administration/#../Subsystems/LFAdmin/Content/Restricting_Field_Data_to_a_Specific_Format.htm?Highlight=constraintformat
 * @returns the corresponding regex
 * @example
 * ```typescript
 * const newContraint = formatTextConstraint('\[\[:alnum:\]\]\[\[:alnum:\]\]\[\[:alnum:\]\]');
 * // newContraint -> ^\[0-9A-Za-z\]\[0-9A-Za-z\]\[0-9A-Za-z\]\$
 * const regex = new RegExp(newContraint);
 * regex.test('ab1'); // true
 * regex.test('a'); // false
 * ```
 *
 */
export function formatTextConstraint(textConstraint: string): string {
  const constraintWithReplacedCharClasses: string = replaceCharacterClasses(textConstraint);
  const strictConstraint: string = createStrictRegexConstraint(constraintWithReplacedCharClasses);
  return strictConstraint;
}

/**
 *
 * @param str Function to check if an input is empty
 * @returns true if the input is null, undefined, or consisted only of whitespace characters, false otherwise
 * @example
 * ```typescript
 * isNullOrEmpty(''); // true
 * isNullOrEmpty(' '); // true
 * isNullOrEmpty('abc'); // false
 * ```
 */
 export function isNullOrEmpty(str: string | null | undefined ): boolean {
  if (!str) {
    return true;
  }
  const trimmed = str.trim();
  return trimmed.length === 0;
}

/** @internal */
export const text_testables = {
  createStrictRegexConstraint,
  replaceCharacterClasses,
};
