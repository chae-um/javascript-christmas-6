import handleValidationError from '../utils/error/index.js';
import { isInteger, isNan, isNumberValidScope } from '../utils/validators/index.js';

class Date {
  #date;

  /**
   * @param {number} date
   */
  constructor(date) {
    this.#validate(date);
  }

  // eslint-disable-next-line
  #validate(date) {
    if (isNan(date)) {
      return handleValidationError('숫자만 입력하실 수 있습니다');
    }
    if (!isInteger(date)) {
      return handleValidationError('정수만 입력하실 수 있습니다');
    }
    if (!isNumberValidScope(date)) {
      return handleValidationError('유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  static of(date) {
    return new Date(date);
  }
}

export default Date;
