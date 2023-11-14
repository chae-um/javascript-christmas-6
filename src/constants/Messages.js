import { SYMBOL } from './Symbol.js';
import { DISCOUNT_LIMIT, EVENT_DATE, ORDER_LIMIT } from './System.js';

export const ERROR_MESSAGE = {
  emptyString: '값을 입력해주세요',
  invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
};

export const INPUT_MESSAGE = {
  menu: `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)${SYMBOL.escapeSequence}`,
};

export const INPUT_MESSAGE_FUNCTION = {
  date(month) {
    return `${month}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)${SYMBOL.escapeSequence}`;
  },
};

export const OUTPUT_MESSAGE = {
  title: {
    userRequestedMenus: `${SYMBOL.escapeSequence}<주문 메뉴>`,
    totalMenuPrice: `${SYMBOL.escapeSequence}<할인 전 총주문 금액>`,
    giftMenu: `${SYMBOL.escapeSequence}<증정 메뉴>`,
    discount: `${SYMBOL.escapeSequence}<혜택 내역>`,
    benefitsContent: `${SYMBOL.escapeSequence}<총혜택 금액>`,
    discountedTotalMenuPrice: `${SYMBOL.escapeSequence}<할인 후 예상 결제 금액>`,
    eventBadge: `${SYMBOL.escapeSequence}<${EVENT_DATE.month}월 이벤트 배지>`,
  },
  nothing: '없음',
  giftMenu: '샴페인 1개',
  cautions: {
    title: `${SYMBOL.escapeSequence}[이벤트 주의 사항]`,
    totalOrderAmount: `총주문 금액 ${DISCOUNT_LIMIT.totalMenuPrice.toLocaleString(
      'ko-KR',
    )}원 이상부터 이벤트가 적용됩니다.`,
    beverage: '음료만 주문 시, 주문할 수 없습니다.',
    menu: `메뉴는 한 번에 최대 ${ORDER_LIMIT.maxMenuCount}개까지만 주문할 수 있습니다.${SYMBOL.escapeSequence}`,
  },
  start: `안녕하세요! 우테코 식당 ${EVENT_DATE.month}월 이벤트 플래너입니다.`,
};

export const OUTPUT_MESSAGE_FUNCTION = {
  discountFormat(data, title, minus = true) {
    if (title) {
      return `${title}: -${data.toLocaleString('ko-KR')}원`;
    }
    if (data && minus) {
      return `-${data.toLocaleString('ko-KR')}원`;
    }

    return `${data.toLocaleString('ko-KR')}원`;
  },

  orderedMenu(menu, quantity) {
    return `${menu} ${quantity}개`;
  },
};
