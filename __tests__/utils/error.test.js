import handleValidationError from '../../src/utils/error/index.js';

describe('validationError', () => {
  test('에러가 발생하면 "[ERROR]"을 포함한 에러 메시지를 출력해야한다', () => {
    expect(() => handleValidationError('유효성 에러')).toThrowError('[ERROR]');
  });
});
