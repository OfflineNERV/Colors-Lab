const { isValidColorName } = require('../public/js/code.js');

test('accepts a normal color name', () => {
  expect(isValidColorName('Blue')).toBe(true);
});

test('rejects empty or blank input', () => {
  expect(isValidColorName('')).toBe(false);
  expect(isValidColorName('   ')).toBe(false);
});
