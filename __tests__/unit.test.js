// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2
describe('Functions from unit-test-me.js', () => {
    test('isPhoneNumber function', () => {
      expect(functions.isPhoneNumber('123-456-7890')).toBe(true);
      expect(functions.isPhoneNumber('(123) 456-7890')).toBe(true);
      expect(functions.isPhoneNumber('123')).toBe(false);
      expect(functions.isPhoneNumber('123-45-7890')).toBe(false);
    });
  
    test('isEmail function', () => {
      expect(functions.isEmail('test@example.com')).toBe(true);
      expect(functions.isEmail('test123@example.com')).toBe(true);
      expect(functions.isEmail('test@com')).toBe(false);
      expect(functions.isEmail('testexample.com')).toBe(false);
    });
  
    test('isStrongPassword function', () => {
      expect(functions.isStrongPassword('Test123')).toBe(true);
      expect(functions.isStrongPassword('Test1234')).toBe(true);
      expect(functions.isStrongPassword('1234')).toBe(false);
      expect(functions.isStrongPassword('9874')).toBe(false);
    });
  
    test('isDate function', () => {
      expect(functions.isDate('12/12/2023')).toBe(true);
      expect(functions.isDate('1/1/2023')).toBe(true);
      expect(functions.isDate('12-12-2023')).toBe(false);
      expect(functions.isDate('2023/12/12')).toBe(false);
    });
  
    test('isHexColor function', () => {
      expect(functions.isHexColor('#123ABC')).toBe(true);
      expect(functions.isHexColor('#123')).toBe(true);
      expect(functions.isHexColor('123ABAAAAAC')).toBe(false);
      expect(functions.isHexColor('#123ABCG')).toBe(false);
    });
  });