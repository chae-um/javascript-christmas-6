import { validateEmptyString } from '../../src/utils/validators/index.js';

describe('validateEmptyString', () => {
  test.each([{ input: '' }, { input: ' ' }])('빈문자열이면 예외를 발생시킵니다.', ({ input }) => {
    expect(() => validateEmptyString(input)).toThrow('[ERROR]');
  });

  test('빈문자열이 아니면 예외를 발생시키지 않습니다.', () => {
    // given
    const input = 'test';

    // when
    // then
    expect(() => validateEmptyString(input)).not.toThrow();
  });
});
