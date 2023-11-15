import { ERROR_MESSAGE } from '../constants/Messages.js';
import { EVENT_DATE } from '../constants/System.js';

import { handleValidationError } from '../utils/error/index.js';
import { isInteger, isNan, isNumberValidScope } from '../utils/validators/index.js';

class VisitDate {
  /**
   * @private
   * @type {number}
   */
  #date;

  /**
   * @param {number} date - 유저가 방문하기 원하늘 날짜
   */
  constructor(date) {
    this.#validate(date);

    this.#date = date;
  }

  /**
   * @private
   * @param {number} date
   */
  #validate(date) {
    if (isNan(date)) {
      handleValidationError(ERROR_MESSAGE.invalidDate);
    }
    if (!isInteger(date)) {
      handleValidationError(ERROR_MESSAGE.invalidDate);
    }
    if (!isNumberValidScope(date)) {
      handleValidationError(ERROR_MESSAGE.invalidDate);
    }
  }

  /**
   * @static
   * @param {number} date
   * @returns {VisitDate}
   */
  static of(date) {
    return new VisitDate(date);
  }

  /**
   * @public
   * @returns {boolean}
   */
  isChristmasDDayDiscount() {
    return this.#date >= EVENT_DATE.dDayStart && this.#date <= EVENT_DATE.dDayEnd;
  }

  /**
   * @public
   * @returns {number}
   */
  getDate() {
    return this.#date;
  }

  /**
   * 평일/주말 할인이 가능한지 판별해주는 메서드
   * @public
   * @param {number} month
   * @param {number} year
   * @returns {boolean}
   */
  isWeekdays(month = EVENT_DATE.month, year = EVENT_DATE.year) {
    const { days } = EVENT_DATE;
    const specificDate = new Date(year, month - 1, this.#date);
    const dayIndex = specificDate.getDay();

    return Boolean(days[dayIndex]);
  }

  /**
   * @public
   * @returns {boolean}
   */
  isSpecialDiscount() {
    const { specialDay } = EVENT_DATE;

    return specialDay.includes(this.#date);
  }
}

export default VisitDate;
