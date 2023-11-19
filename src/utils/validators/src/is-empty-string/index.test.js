import isEmptyString from './index.js';

describe('isEmptyString', () => {
  test.each([[''], [' ']])('빈문자열이면 true를 반환한다', (input) => {
    expect(isEmptyString(input)).toBeTruthy();
  });

  test('빈문자열이면 false', () => {
    expect(isEmptyString('테스트')).toBeFalsy();
  });
});
