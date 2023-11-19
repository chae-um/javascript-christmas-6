import deepFreeze from '../utils/deepFreeze.js';
import { DATE } from './Calendar.js';
import { UNIT } from './Symbol.js';

export const EVENT_INPUT_NOTIFICATION_MESSAGE = Object.freeze({
  enterVisitDay: `${DATE.month}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해주세요!)\n`,
  enterOrder:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const EVENT_OUTPUT_NOTIFICATION_MESSAGE = Object.freeze({
  welcome: `안녕하세요! 우테코 식당 ${DATE.month}월 이벤트 플래너입니다.`,
  order: '\n<주문 메뉴>',
  totalPriceBeforeEvent: '\n<할인 전 총주문 금액>',
  present: '\n<증정 메뉴>',
  appliedEventList: '\n<혜택 내역>',
  totalEventDiscount: '\n<총혜택 금액>',
  totalPriceAfterEvent: '\n<할인 후 예상 결제 금액>',
  eventBadge: `\n<${DATE.month}월 이벤트 배지>`,
  none: '없음',
});

export const EVENT_OUTPUT_NOTIFICATION_FORMAT = deepFreeze({
  visitDay(day) {
    return `${DATE.month}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`;
  },

  orderMenu(menu, amount) {
    return `${menu} ${amount}${UNIT.amount}`;
  },

  appliedEvent(eventName, discountPrice) {
    return `${eventName}: -${discountPrice.toLocaleString()}${UNIT.won}`;
  },

  itemAmount(itemName, amount) {
    return `${itemName} ${amount}${UNIT.amount}`;
  },

  discountPrice(price) {
    return `-${price.toLocaleString()}${UNIT.won}`;
  },

  normalPrice(price) {
    return `${price.toLocaleString()}${UNIT.won}`;
  },
});

export const EVENT_ERROR_MESSAGE = Object.freeze({
  invalidVisitDay: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});
