import * as DatetimeUtils from './datetime-utils.js';

describe('DatetimeUtils', () => {

  it('should deserialize and serialize a date with no offset and not change the value', () => {
    const originalDateString: string = '2021-03-25';
    const deserializedDate: string = DatetimeUtils.deserializeDateValue(originalDateString);
    const dateNoOffset: Date = new Date(deserializedDate);

    const serializedDate: string | undefined = DatetimeUtils.serializeDateValue(dateNoOffset);
    expect(serializedDate).toEqual('2021-03-25T00:00:00');
  });

  it('should serialize a datetime with no offset and not change the value', () => {
    const originalDatetimeString: string = '2021-03-25T01:00:00';
    const datetimeNoOffset: Date = new Date(originalDatetimeString);

    const serializedDatetime: string | undefined = DatetimeUtils.serializeDateValue(datetimeNoOffset);
    expect(serializedDatetime).toEqual('2021-03-25T01:00:00');
  });

  it('should serialize a date with an offset and remove the offset', () => {
    const originalDateString: string = '2021-03-25T00:00:00';
    const origianlDateStringWithOffset = mockDateTimeOffset(originalDateString);
    const dateWithOffset: Date = new Date(origianlDateStringWithOffset);

    const serializedDate: string | undefined = DatetimeUtils.serializeDateValue(dateWithOffset);
    expect(serializedDate).toEqual('2021-03-25T00:00:00');
  });

  it('should serialize a datetime with an offset and remove the offset', () => {
    const originalDatetimeString: string = '2021-03-25T01:00:00';
    const origianlDateStringWithOffset = mockDateTimeOffset(originalDatetimeString);
    const datetimeWithOffset: Date = new Date(origianlDateStringWithOffset);

    const serializedDatetime: string | undefined = DatetimeUtils.serializeDateValue(datetimeWithOffset);
    expect(serializedDatetime).toEqual('2021-03-25T01:00:00');
  });

});

/**
 * 
 * @param originalDateString 
 * @returns timestamp with the offset based on the current timezone
 * example: in PDT, timezone offset is -7 h 
 */
function mockDateTimeOffset(originalDateString: string) : string {
  const dateWithoutOffset: Date = new Date(originalDateString);
  const offset = dateWithoutOffset.getTimezoneOffset();
  const offsetInHours = offset / 60;
  const offsetInMinutes = - offset % 60;
  const offsetSign = (offsetInHours >= 0)? '-' : '+';
  const offsetInHoursString = String(Math.floor(Math.abs(offsetInHours))).padStart(2, '0');
  const offsetInMinutesString = String(offsetInMinutes).padStart(2, '0');
  return `${originalDateString}${offsetSign}${offsetInHoursString}:${offsetInMinutesString}`;
}