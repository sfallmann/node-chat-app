const expect = require('expect');
const {isRealString} = require('./validation');


describe('isRealString', () => {

  it('isRealString should reject non-string values', () => {
    expect(isRealString(5)).toBe(false);
  });

  it('isRealString should reject strings with only whitespace', () => {
    expect(isRealString('  ')).toBe(false);
  });

  it('isRealString should allow strings with non-whitespace', () => {
    expect(isRealString(' real string ')).toBe(true);
  });

});
