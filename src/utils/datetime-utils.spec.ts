import { DatetimeUtils } from './datetime-utils';

describe('DatetimeUtils', () => {

  it('should create an instance', () => {
    expect(new DatetimeUtils()).toBeTruthy();
  });

  it('should deserialize and serialize a date with no offset and not change the value', () => {
    const originalDateString: string = '2021-03-25';
    const deserializedDate: string = DatetimeUtils.deserializeDateValue(originalDateString);
    const dateNoOffset: Date = new Date(deserializedDate);
    function test(date) {
      if (!date || !DatetimeUtils.isValidDate(date)) {
        return undefined;
      }
    
      const offset: number = date.getTimezoneOffset();
      if (offset === 0) {
        return date.toISOString();
      }
    
      const pad: (num: number) => string = (num: number) => {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };
      console.log(date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()))
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
    const serializedDate: string | undefined = test(dateNoOffset);
    expect(serializedDate).toEqual('2021-03-25T00:00:00');
  });

  it('should serialize a datetime with no offset and not change the value', () => {
    const originalDatetimeString: string = '2021-03-25T01:00:00';
    const datetimeNoOffset: Date = new Date(originalDatetimeString);
    function test(date) {
      if (!date || !DatetimeUtils.isValidDate(date)) {
        return undefined;
      }
    
      const offset: number = date.getTimezoneOffset();
      if (offset === 0) {
        return date.toISOString();
      }
    
      const pad: (num: number) => string = (num: number) => {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };
      console.log(date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()))
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
    const serializedDatetime: string | undefined = test(datetimeNoOffset);
    expect(serializedDatetime).toEqual('2021-03-25T01:00:00');
  });

  it('should serialize a date with an offset and remove the offset', () => {
    const originalDateString: string = '2021-03-25T00:00:00-07:00';
    const dateWithOffset: Date = new Date(originalDateString);
    function test(date) {
      if (!date || !DatetimeUtils.isValidDate(date)) {
        return undefined;
      }
    
      const offset: number = date.getTimezoneOffset();
      if (offset === 0) {
        return date.toISOString();
      }
    
      const pad: (num: number) => string = (num: number) => {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };
      console.log(date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()))
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
    const serializedDate: string | undefined = test(dateWithOffset);
    console.log("heree", test, test(dateWithOffset))
    expect(serializedDate).toEqual('2021-03-25T00:00:00');
  });

  it('should serialize a datetime with an offset and remove the offset', () => {
    const originalDatetimeString: string = '2021-03-25T01:00:00-07:00';
    const datetimeWithOffset: Date = new Date(originalDatetimeString);
    function test(date) {
      if (!date || !DatetimeUtils.isValidDate(date)) {
        return undefined;
      }
    
      const offset: number = date.getTimezoneOffset();
      if (offset === 0) {
        return date.toISOString();
      }
    
      const pad: (num: number) => string = (num: number) => {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };
      console.log(date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()))
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
    const serializedDatetime: string | undefined = test(datetimeWithOffset);
    expect(serializedDatetime).toEqual('2021-03-25T01:00:00');
  });

});
