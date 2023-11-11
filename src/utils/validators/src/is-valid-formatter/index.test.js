import isValidFormatter from './index.js';

describe('isValidFormatter', () => {
  test.each(['티본스테이크-1', '바비큐립-1', '제로콜라-1', '초코케이크-1'])(
    '올바른 값을 입력하였을 때 true를 반환합니다.',
    (input) => {
      expect(isValidFormatter(input)).toBeTruthy();
    },
  );

  test.each([
    '티본스테이크2',
    '-1',
    '티본스테이크1',
    '1',
    '티본스테이크',
    '초코케이크,1',
    '제로콜라=2',
  ])('올바르지 않은 값을 입력하였을 때 true를 리턴합니다.', (input) => {
    expect(isValidFormatter(input)).toBeFalsy();
  });
});
