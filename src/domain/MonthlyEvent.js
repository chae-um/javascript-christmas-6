import { EVENT_BADGE } from '../constants/ChristmasEventOption.js';
import {
  DISCOUNT_EVENT_EXCEPTION_LIST,
  EVENT_INFORMATION,
} from '../constants/DecemberEventList.js';
import VisitDayValidator from '../validator/VisitDayValidator.js';
import DecemberEvent from './DecemberEvent.js';

export default class MonthlyEvent {
  /**
   * @private
   * @type {number} - 방문 날짜
   */
  #day;

  /**
   * @private
   * @type {{decemberEvent: DecemberEvent}} - 적용중인 이벤트 목록
   */
  #events = {
    decemberEvent: DecemberEvent.of(),
  };

  /**
   * @static
   * @returns {MonthlyEvent} MonthlyEvent 인스턴스
   */
  static of() {
    return new MonthlyEvent();
  }

  /**
   * @public
   * @param {number} day - 방문 날짜
   */
  validate(day) {
    VisitDayValidator.validateVisitDay(day);
    this.#day = day;
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   * @param {number} orderTotal - 주문 합계 금액
   * @returns {import('../utils/JSDocs.js').appliedEvent} 적용된 이벤트 목록과 총 할인금액
   */
  apply(orderList, orderTotal) {
    const eventList = this.#events.decemberEvent.apply(
      this.#day,
      orderList,
      orderTotal
    );

    const present = this.#present(eventList);

    return {
      eventList,
      totalEventDiscount: this.#calculate(eventList),
      present,
    };
  }

  /**
   * @param {import('../utils/JSDocs.js').eventList} eventList - 적용된 이벤트 목록
   * @returns {number} 총 할인 금액
   */
  // eslint-disable-next-line class-methods-use-this
  #calculate(eventList) {
    return eventList.reduce((acc, { discountPrice }) => acc + discountPrice, 0);
  }

  /**
   * @private
   * @param {import('../utils/JSDocs.js').eventList} eventList - 적용된 이벤트 목록
   * @returns {boolean} 선물 증정 여부
   */
  // eslint-disable-next-line class-methods-use-this
  #present(eventList) {
    return eventList.some(
      ({ eventName }) => eventName === EVENT_INFORMATION.present.name
    );
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').eventList} eventList - 적용된 이벤트 목록
   * @param {number} orderTotal - 주문 금액 합계
   * @returns {number} 이벤트 적용 후 지불 예정 금액
   */
  // eslint-disable-next-line class-methods-use-this
  payResult(eventList, orderTotal) {
    const discountTotal = eventList.reduce(
      (acc, { eventName, discountPrice }) => {
        if (DISCOUNT_EVENT_EXCEPTION_LIST.includes(eventName)) {
          return acc;
        }

        return acc + discountPrice;
      },
      0
    );

    return orderTotal - discountTotal;
  }

  /**
   * @public
   * @param {number} totalEventDiscount - 총 할인 금액
   * @returns {string | 0} 이벤트 뱃지
   */
  // eslint-disable-next-line class-methods-use-this
  badge(totalEventDiscount) {
    const find = EVENT_BADGE.find(
      (badge) => badge.require <= totalEventDiscount
    );

    return find ? find.name : 0;
  }
}
