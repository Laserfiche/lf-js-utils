// Copyright (c) Laserfiche.
// Licensed under the MIT License. See LICENSE in the project root for license information.

/**
 * Given a string that represents a date object with no timezone offset,
 * adds the offset based on the client's current timezone, and returns it as a string
 * @param date e.g. 2021-03-25, PDT timezone
 * @returns the date with an added offset of the current time "2021-03-25T07:00:00.000Z"
 * @example
 * ```typescript
 * // suppose the timezone is PDT
 * const originalDateString: string = '2021-03-25';
 * const originalDate: Date = new Date(originalDateString); 
 * // originalDate -> Wed Mar 24 2021 17:00:00 GMT-0700 (Pacific Daylight Time)
 *  
 * const deserializedDateString: string = deserializeDateValue(originalDateString);
 * const deserializedDate: Date = new Date(deserializedDateString); 
 * // deserializedDate -> Thu Mar 25 2021 00:00:00 GMT-0700 (Pacific Daylight Time)
 * ```
 */
export function deserializeDateValue(date: string | undefined): string {
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
 * @example
 * ```typescript
 * const originalDatetimeString: string = '2021-03-25T01:00:00-07:00';
 * const datetimeNoOffset: Date = new Date(originalDatetimeString);
 * // datetimeNoOffset -> Thu Mar 25 2021 01:00:00 GMT-0700 (Pacific Daylight Time)
 * 
 * const serializedDatetime: string | undefined = serializeDateValue(datetimeNoOffset);
 * // serializedDatetime -> 2021-03-25T01:00:00
 * ```
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
 * @example
 * ```typescript
 * const datetimeString1: string = '2021-03-25T01:00:00';
 * const datetime1: Date = new Date(datetimeString1);
 * isValidDate(datetime1); // true
 * 
 * const datetimeString2: string = '2021-03-25T26:00:72';
 * const datetime2: Date = new Date(datetimeString2);
 * isValidDate(datetime2); // false
 * ```
 */
export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

/**
 * Compares two string formated dates/times
  * @param first 
  * @param second 
  * @returns true if the string formated dates/times represent the same date/time
  * @example
  * ```typescript
  * // suppose the timezone is PDT
  * const datetimeString1 = '2021-03-25';
  * const datetimeString2 = '2021-03-24T17:00:00';
  * compareDateStrings(datetimeString1, datetimeString2); // true
  * ```
  */
export function compareDateStrings(first: string, second: string): boolean {
  const firstDate = new Date(first);
  const secondDate = new Date(second);
  if (!isValidDate(firstDate) || !isValidDate(secondDate)) {
    return false;
  }
  return firstDate.getTime() === secondDate.getTime();
}
