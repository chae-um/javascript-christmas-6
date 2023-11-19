import MonthlyEvent from '../domain/MonthlyEvent.js';
import deepFreeze from '../utils/deepFreeze.js';

// 날짜, 총 주문 금액, 주문 리스트
const EventService = deepFreeze({
  /**
   * @type {MonthlyEvent} - MonthlyEvent 인스턴스
   */
  monthlyEvent: MonthlyEvent.of(),

  /**
   * @param {string} day - 입력된 방문 일자
   */
  initialize(day) {
    this.monthlyEvent.validate(Number(day));
  },

  /**
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   * @param {number} orderTotal - 주문 금액 합계
   * @returns {import('../utils/JSDocs.js').appliedEvent} 적용된 이벤트 목록과 총 할인 금액
   */
  applyEvents(orderList, orderTotal) {
    return this.monthlyEvent.apply(orderList, orderTotal);
  },

  /**
   * @param {import('../utils/JSDocs.js').eventList} eventList - 적용된 이벤트 목록
   * @param {number} orderTotal - 주문 금액 합계
   * @param {number} totalEventDiscount - 적용된 이벤트 할인 금액 합계
   * @returns {import('../utils/JSDocs.js').totalResults} 이벤트 뱃지와 최종 결제 예정 금액
   */
  totalResults(eventList, orderTotal, totalEventDiscount) {
    return {
      payTotal: this.monthlyEvent.payResult(eventList, orderTotal),
      badge: this.monthlyEvent.badge(totalEventDiscount),
    };
  },
});

export default EventService;
