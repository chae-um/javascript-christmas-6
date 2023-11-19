import isInteger from './index.js';

describe('isInteger', () => {
  test.each([[1.1], [0.3], [-1.1]])('정수가 아니면 false를 리턴합니다.', (input) => {
    expect(isInteger(input)).toBeFalsy();
  });

  test.each([[10], [-99], [0]])('정수이면 true를 리턴합니다', (input) => {
    expect(isInteger(input)).toBeTruthy();
  });
});
