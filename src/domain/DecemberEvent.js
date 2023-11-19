import { WEEK } from '../constants/Calendar.js';
import {
  D_DAY_EVENT_DISCOUNT_PER_DAY,
  EVENT_OPTION,
  PRESENT_EVENT,
  SPECIAL_EVENT_DAY,
} from '../constants/ChristmasEventOption.js';
import { EVENT_INFORMATION } from '../constants/DecemberEventList.js';
import { DESSERT, MAIN_DISH } from '../constants/Dish.js';
import getItemKindByOrderList from '../utils/getItemKindByOrderList.js';
import isWeekend from '../utils/isWeekend.js';

export default class DecemberEvent {
  /**
   * @static
   * @returns {DecemberEvent} DecemberEvent 인스턴스
   */
  static of() {
    return new DecemberEvent();
  }

  /**
   * @public
   * @param {number} day - 방문 날짜
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   * @param {number} orderTotal - 주문 금액 합계
   * @returns {import('../utils/JSDocs.js').eventList | never[]} eventList - 이벤트 목록
   */
  apply(day, orderList, orderTotal) {
    const eventStatus = [];

    if (orderTotal > EVENT_OPTION.eventMinimumOrderPrice) {
      const check = isWeekend(day);

      this.christmasDDayEvent(eventStatus, day);
      this.weekdayEvent(eventStatus, check, orderList);
      this.weekendEvent(eventStatus, check, orderList);
      this.specialEvent(eventStatus, day);
      this.presentEvent(eventStatus, orderTotal);
    }

    return eventStatus;
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').eventList} eventStatus - 이벤트 저장 배열
   * @param {number} day - 방문 날짜
   */
  christmasDDayEvent(eventStatus, day) {
    if (
      day <= EVENT_INFORMATION.dDay.endDay &&
      day >= EVENT_INFORMATION.dDay.startDay
    ) {
      this.applyEvent(
        eventStatus,
        EVENT_INFORMATION.dDay.name,
        EVENT_INFORMATION.dDay.price + D_DAY_EVENT_DISCOUNT_PER_DAY * (day - 1)
      );
    }
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').eventList} eventStatus - 이벤트 저장 배열
   * @param {import('../utils/JSDocs.js').check} check - 평일/주말 여부
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   */
  weekdayEvent(eventStatus, check, orderList) {
    if (check !== WEEK.weekday) {
      return;
    }

    const selectedAmount = getItemKindByOrderList(orderList, DESSERT);

    if (selectedAmount > 0) {
      this.applyEvent(
        eventStatus,
        EVENT_INFORMATION.weekday.name,
        EVENT_INFORMATION.weekday.price * selectedAmount
      );
    }
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').eventList} eventStatus - 이벤트 저장 배열
   * @param {import('../utils/JSDocs.js').check} check - 평일/주말 여부
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   */
  weekendEvent(eventStatus, check, orderList) {
    if (check !== WEEK.weekend) {
      return;
    }

    const selectedAmount = getItemKindByOrderList(orderList, MAIN_DISH);

    if (selectedAmount > 0) {
      this.applyEvent(
        eventStatus,
        EVENT_INFORMATION.weekend.name,
        EVENT_INFORMATION.weekend.price * selectedAmount
      );
    }
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').eventList} eventStatus - 이벤트 저장 배열
   * @param {number} day - 방문 날짜
   */
  specialEvent(eventStatus, day) {
    if (SPECIAL_EVENT_DAY.includes(day)) {
      this.applyEvent(
        eventStatus,
        EVENT_INFORMATION.special.name,
        EVENT_INFORMATION.special.price
      );
    }
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').eventList} eventStatus - 이벤트 저장 배열
   * @param {number} orderTotal - 주문 금액 합계
   */
  presentEvent(eventStatus, orderTotal) {
    if (orderTotal >= PRESENT_EVENT.minimumOrderPrice) {
      this.applyEvent(
        eventStatus,
        EVENT_INFORMATION.present.name,
        EVENT_INFORMATION.present.price * PRESENT_EVENT.itemAmount
      );
    }
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').eventList} eventStatus - 이벤트 저장 배열
   * @param {string} eventName - 적용할 이벤트 이름
   * @param {number} discountPrice - 이벤트로 할인된 가격
   */
  // eslint-disable-next-line class-methods-use-this
  applyEvent(eventStatus, eventName, discountPrice) {
    eventStatus.push({ eventName, discountPrice });
  }
}
