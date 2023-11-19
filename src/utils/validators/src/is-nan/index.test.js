import isNan from './index.js';

describe('isNan', () => {
  test('NaN이면 true를 리턴합니다.', () => {
    expect(isNan(NaN)).toBeTruthy();
  });

  test('숫자이면 false를 리턴합니다.', () => {
    expect(isNan(32)).toBeFalsy();
  });
});
