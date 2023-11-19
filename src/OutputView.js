import { Console } from '@woowacourse/mission-utils';
import {
  EVENT_OUTPUT_NOTIFICATION_FORMAT,
  EVENT_OUTPUT_NOTIFICATION_MESSAGE,
} from './constants/ChristmasEventMessage.js';
import { PRESENT_EVENT } from './constants/ChristmasEventOption.js';
import { NONE } from './constants/Symbol.js';

const OutputView = Object.freeze({
  /**
   * @param {string} message - 출력할 메세지
   */
  print(message) {
    Console.print(message);
  },

  printWelcome() {
    this.print(EVENT_OUTPUT_NOTIFICATION_MESSAGE.welcome);
  },

  /**
   * @param {string} day - 입력된 방문 날짜
   */
  printVisitDay(day) {
    this.print(EVENT_OUTPUT_NOTIFICATION_FORMAT.visitDay(day));
  },

  /**
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   */
  printOrderMenu(orderList) {
    this.print(EVENT_OUTPUT_NOTIFICATION_MESSAGE.order);
    orderList.forEach(({ orderItemName, orderItemAmount }) =>
      this.print(
        EVENT_OUTPUT_NOTIFICATION_FORMAT.orderMenu(
          orderItemName,
          orderItemAmount
        )
      )
    );
  },

  /**
   * @param {number} total - 주문 금액 합계
   */
  printTotalPriceBeforeEvent(total) {
    this.print(EVENT_OUTPUT_NOTIFICATION_MESSAGE.totalPriceBeforeEvent);
    this.print(EVENT_OUTPUT_NOTIFICATION_FORMAT.normalPrice(total));
  },

  /**
   * @param {boolean} present - 선물 증정 여부
   */
  printPresent(present) {
    this.print(EVENT_OUTPUT_NOTIFICATION_MESSAGE.present);
    this.checkNone(present, () => {
      this.print(
        EVENT_OUTPUT_NOTIFICATION_FORMAT.itemAmount(
          PRESENT_EVENT.itemName,
          PRESENT_EVENT.itemAmount
        )
      );
    });
  },

  /**
   * @param {import('../utils/JSDocs.js').eventList} eventList - 적용된 이벤트 목록
   */
  printAppliedEventList(eventList) {
    this.print(EVENT_OUTPUT_NOTIFICATION_MESSAGE.appliedEventList);
    this.checkNone(eventList.length, () => {
      eventList.forEach(({ eventName, discountPrice }) => {
        this.print(
          EVENT_OUTPUT_NOTIFICATION_FORMAT.appliedEvent(
            eventName,
            discountPrice
          )
        );
      });
    });
  },

  /**
   * @param {number} total - 적용된 이벤트 할인 금액 합계
   */
  printTotalDiscount(total) {
    this.print(EVENT_OUTPUT_NOTIFICATION_MESSAGE.totalEventDiscount);

    if (total > 0) {
      this.print(EVENT_OUTPUT_NOTIFICATION_FORMAT.discountPrice(total));
    } else {
      this.print(EVENT_OUTPUT_NOTIFICATION_FORMAT.normalPrice(total));
    }
  },

  /**
   * @param {number} total - 최종 결제 예정 금액
   */
  printTotalPriceAfterEvent(total) {
    this.print(EVENT_OUTPUT_NOTIFICATION_MESSAGE.totalPriceAfterEvent);
    this.print(EVENT_OUTPUT_NOTIFICATION_FORMAT.normalPrice(total));
  },

  /**
   * @param {string | 0} badge - 이벤트 뱃지
   */
  printEventBadge(badge) {
    this.print(EVENT_OUTPUT_NOTIFICATION_MESSAGE.eventBadge);
    this.checkNone(badge, () => {
      this.print(badge);
    });
  },

  /**
   * @param {unknown} checkValue - 확인할 값
   * @param {() => void} action - 실행시킬 콜백함수
   * @returns {void} 조건에 따라 함수 실행
   */
  checkNone(checkValue, action) {
    if (!checkValue) {
      return this.print(NONE);
    }

    return action();
  },
});

export default OutputView;
