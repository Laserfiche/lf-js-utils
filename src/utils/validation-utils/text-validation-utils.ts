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
const OR: string = '\|';

const CharacterClass: { [className: string]: string } = {
    '\[\[:alnum:\]\]': '\[0-9A-Za-z\]',
    '\[\[:alpha:\]\]': '\[A-Za-z\]',
    '\[\[:blank:\]\]': '\[ \t\]',
    '\[\[:digit:\]\]': '\\d',
    '\[\[:lower:\]\]': '\[a-z\]',
    '\[\[:print:\]\]': '\[ -~\]',
    '\[\[:punct:\]\]': '\[~`!@#\$%\^&\*()\{\}\[\\];:"\\\'<,\.>\?/\\\\|_\+=\\-\]',
    '\[\[:space:\]\]': '\\s',
    '\[\[:upper:\]\]': '\[A-Z\]',
    '\[\[:xdigit:\]\]': '\[0-9A-Fa-f\]',
    '\[\[:word:\]\]': '\\w'
};

function createStrictRegexConstraint(constraint: string): string {
    let newConstraint = constraint;
    if (constraint?.length > 0) {
        if (constraint.charAt(0) !== '^') {
            newConstraint = '^' + constraint;
        }
        if (constraint.charAt(constraint.length - 1) !== '\$') {
            newConstraint = newConstraint + '\$';
        }
    }
    return newConstraint;
}

function replaceCharacterClasses(constraint: string): string {
    let newConstraint: string = constraint;
    const characterClassRegexString: string = ALNUM + OR + ALPHA + OR + BLANK + OR + DIGIT
        + OR + LOWER + OR + PRINT + OR + PUNCT + OR + SPACE + OR + UPPER + OR + XDIGIT + OR + WORD;
    const characterClassRegex: RegExp = new RegExp(characterClassRegexString, 'g');
    newConstraint = newConstraint.replace(characterClassRegex, (matched) => {
        return CharacterClass[matched];
    });
    return newConstraint;
}

export function formatTextConstraint(textConstraint: string): string {
    const constraintWithReplacedCharClasses: string = replaceCharacterClasses(textConstraint);
    const strictConstraint: string = createStrictRegexConstraint(constraintWithReplacedCharClasses);
    return strictConstraint;
}

export const text_testables = {
    createStrictRegexConstraint,
    replaceCharacterClasses
};
