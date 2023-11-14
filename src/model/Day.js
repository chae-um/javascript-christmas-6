import { ERROR_MESSAGE } from '../constants/Messages.js';
import { EVENT_DATE } from '../constants/System.js';

import { handleValidationError } from '../utils/error/index.js';
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

  static of(date) {
    return new Day(date);
  }

  isChristmasDDayDiscount() {
    return this.#date >= EVENT_DATE.christmasDDayStart && this.#date <= EVENT_DATE.christmasDDayEnd;
  }

  getDate() {
    return this.#date;
  }

  isWeekdays(month = EVENT_DATE.month, year = EVENT_DATE.year) {
    const { days } = EVENT_DATE;
    const specificDate = new Date(year, month - 1, this.#date);
    const dayIndex = specificDate.getDay();

    return Boolean(days[dayIndex]);
  }

  isSpecialDiscount() {
    const { specialDay } = EVENT_DATE;

    return specialDay.includes(this.#date);
  }
}

export default Day;
