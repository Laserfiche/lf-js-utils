import { clone } from './clone.js';

describe('clone', () => {
  it('a number', () => {
    expect(clone(1)).toEqual(1);
  });

  it('clone of object with nested object is equal by value but not by reference', () => {
    // Arrange
    const initialObject = {
      hello: 'world',
      innerObject: { innerHello: 'innerWorld' },
    };

    // Act
    const clonedObject = clone(initialObject);

    // Assert
    expect(clonedObject).not.toBeUndefined();
    expect(initialObject).toEqual(clonedObject!);
    expect(initialObject).not.toBe(clonedObject!);
    expect(initialObject.innerObject).not.toBe(clonedObject!.innerObject);
  });

  it('clones falsy values', () => {
    expect(clone(0)).toEqual(0);
    expect(clone([])).toEqual([]);
    expect(clone(false)).toEqual(false);
    expect(clone(undefined)).toBeUndefined();
    expect(clone(null)).toBeNull();
  });
});
