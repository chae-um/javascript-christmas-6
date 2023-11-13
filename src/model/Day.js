import handleValidationError from '../utils/error/index.js';
import { isInteger, isNan, isNumberValidScope } from '../utils/validators/index.js';

class Day {
  #date;

  /**
   * @param {number} date
   */
  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  // eslint-disable-next-line
  #validate(date) {
    if (isNan(date)) {
      return handleValidationError('유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
    if (!isInteger(date)) {
      return handleValidationError('유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
    if (!isNumberValidScope(date)) {
      return handleValidationError('유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  static of(date) {
    return new Day(date);
  }

  isChristmasDDayDiscount() {
    return this.#date >= 1 && this.#date <= 25;
  }

  getDate() {
    return this.#date;
  }

  isWeekdays(month = 12, year = 2023) {
    const days = ['일', '월', '화', '수', '목'];
    const specificDate = new Date(year, month - 1, this.#date);
    const dayIndex = specificDate.getDay();

    return Boolean(days[dayIndex]);
  }

  isSpecialDiscount() {
    const specialDay = [3, 10, 17, 24, 25, 31];

    return specialDay.includes(this.#date);
  }
}

export default Day;
