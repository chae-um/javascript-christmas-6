import isNumberValidScope from './index.js';

describe('isNumberValidScop', () => {
  test.each([0, 32])('유효한 숫자가 아니면 false를 리턴한다', (input) => {
    expect(isNumberValidScope(input)).toBeFalsy();
  });

  test.each([1, 31, 22])('유효한 숫자가 아니면 true를 리턴한다.', (input) => {
    expect(isNumberValidScope(input)).toBeTruthy();
  });
});
