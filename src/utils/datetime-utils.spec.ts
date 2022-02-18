import { DatetimeUtils } from './datetime-utils.js';

describe('DatetimeUtils', () => {

  it('should create an instance', () => {
    expect(new DatetimeUtils()).toBeTruthy();
  });

  it('should deserialize and serialize a date with no offset and not change the value', () => {
    const originalDateString: string = '2021-03-25';
    const deserializedDate: string = DatetimeUtils.deserializeDateValue(originalDateString);
    const dateNoOffset: Date = new Date(deserializedDate);

    const serializedDate: string | undefined = DatetimeUtils.serializeDateValue(dateNoOffset);
    const isValid = DatetimeUtils.isValidDate(dateNoOffset)
    expect(isValid).toBeTruthy();
  });

  it('should serialize a datetime with no offset and not change the value', () => {
    const originalDatetimeString: string = '2021-03-25T01:00:00';
    const datetimeNoOffset: Date = new Date(originalDatetimeString);
    console.log("time zone", Intl.DateTimeFormat().resolvedOptions().timeZone)

    const serializedDatetime: string | undefined = DatetimeUtils.serializeDateValue(datetimeNoOffset);
    expect(serializedDatetime).toEqual('2021-03-25T01:00:00');
  });

  it('should serialize a date with an offset and remove the offset', () => {
    const originalDateString: string = '2021-03-25T00:00:00-07:00';
    const dateWithOffset: Date = new Date(originalDateString);

    const serializedDate: string | undefined = DatetimeUtils.serializeDateValue(dateWithOffset);
    expect(serializedDate).toEqual('2021-03-25T00:00:00');
  });

  it('should serialize a datetime with an offset and remove the offset', () => {
    const originalDatetimeString: string = '2021-03-25T01:00:00-07:00';
    const datetimeWithOffset: Date = new Date(originalDatetimeString);

    const serializedDatetime: string | undefined = DatetimeUtils.serializeDateValue(datetimeWithOffset);
    expect(serializedDatetime).toEqual('2021-03-25T01:00:00');
  });

});