import isValidCount from './index.js';

describe('isValidCount', () => {
  test.each(['0', '21'])('범위 내의 숫자가 아닐 시 false를 리턴 합니다.', (input) => {
    expect(isValidCount(input)).toBeFalsy();
  });

  test.each(['1', '15', '20'])('범위 내의 숫자일 때 true를 리턴 합니다.', (input) => {
    expect(isValidCount(input)).toBeTruthy();
  });
});
