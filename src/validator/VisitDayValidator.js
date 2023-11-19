import { DATE } from '../constants/Calendar.js';
import { EVENT_ERROR_MESSAGE } from '../constants/ChristmasEventMessage.js';
import ValidationError from '../error/ValidationError.js';
import deepFreeze from '../utils/deepFreeze.js';

const VisitDayValidator = deepFreeze({
  /**
   * @param {number} day - 방문 날짜
   * @throws {ValidationError}
   */
  checkValidNumber(day) {
    if (Number.isNaN(day)) {
      throw new ValidationError(EVENT_ERROR_MESSAGE.invalidVisitDay);
    }
  },

  /**
   * @param {number} day - 방문 날짜
   * @throws {ValidationError}
   */
  checkValidNumberType(day) {
    if (!Number.isInteger(day)) {
      throw new ValidationError(EVENT_ERROR_MESSAGE.invalidVisitDay);
    }
  },

  /**
   * @param {number} day - 방문 날짜
   * @throws {ValidationError}
   */
  checkValidVisitDayRange(day) {
    if (day < DATE.startDay || day > DATE.endDay) {
      throw new ValidationError(EVENT_ERROR_MESSAGE.invalidVisitDay);
    }
  },

  /**
   * @param {number} day - 방문 날짜
   * @throws {ValidationError}
   */
  validateVisitDay(day) {
    this.checkValidNumber(day);
    this.checkValidNumberType(day);
    this.checkValidVisitDayRange(day);
  },
});

export default VisitDayValidator;
