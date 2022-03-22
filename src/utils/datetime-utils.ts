/**
 * Given a string that represents a date object with no timezone offset,
 * adds the offset based on the client's current timezone, and returns it as a string
 * @param date e.g. 2021-03-25, PDT timezone
 * @returns the date with an added offset of the current time "2021-03-25T07:00:00.000Z"
 */
export function deserializeDateValue(date: string | undefined): string { //TODO: add more unit tests
  if (!date) {
    return '';
  }
  const fieldValueAsDate: Date = new Date(date);
  if (isNaN(fieldValueAsDate.getTime())) {
    return date;
  }
  const offset: number = fieldValueAsDate.getTimezoneOffset();
  if (offset === 0) {
    return fieldValueAsDate.toISOString();
  }
  else {
    const offsetMs: number = offset * 60000;
    const dateAsNumber: number = fieldValueAsDate.getTime() + offsetMs;
    const dateWithoutOffset: Date = new Date(dateAsNumber);
    return dateWithoutOffset.toISOString();
  }
}

/**
 * Given a date object, returns a corresponding ISO8601 representating the localtime without offset
 * @param date 
 * @returns a corresponding ISO8601 string representating the localtime without offset 
 */
export function serializeDateValue(date: Date | undefined): string | undefined {
  if (!date || !isValidDate(date)) {
    return undefined;
  }

  const pad: (num: number) => string = (num: number) => {
    const norm = Math.floor(Math.abs(num));
    return (norm < 10 ? '0' : '') + norm;
  };
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds())
  );
}


/**
 * Returns true if the date object contains a valid value
 * @param date 
 * @returns 
 */
export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

/**
 *Compares two string formated dates/times
  * @param first 
  * @param second 
  * @returns true if the string formated dates/times represent the same date/time
  */
export function compareDateStrings(first: string, second: string): boolean {
  const firstDate = new Date(first);
  const secondDate = new Date(second);
  if (!isValidDate(firstDate) || !isValidDate(secondDate)) {
    return false;
  }
  return firstDate.getTime() === secondDate.getTime();
}
