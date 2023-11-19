/**
 * @typedef {orderItem[]} orderList
 */

/**
 * @typedef {eventItem[]} eventList
 */

/**
 * @typedef {object} orderItem
 * @property {string} orderItemName - 주문한 메뉴의 이름
 * @property {number} orderItemAmount - 주문한 메뉴의 수량
 */

/**
 * @typedef {object} eventItem
 * @property {string} eventName - 적용된 이벤트의 이름
 * @property {number} discountPrice - 이벤트로 적용된 할인 가격
 */

/**
 * @typedef {object} orderResult
 * @property {orderList} orderList - 주문 목록
 * @property {number} orderTotal - 주문 금액 합계
 */

/**
 * @typedef {object} appliedEvent
 * @property {eventList} eventList - 적용된 이벤트 목록
 * @property {number} totalEventDiscount - 적용된 이벤트 할인 금액 합계
 */

/**
 * @typedef {object} totalResults
 * @property {string | 0} badge - 이벤트 뱃지
 * @property {number} payTotal - 최종 결제 예정 금액
 */

/**
 * @typedef {object} event
 * @property {string} name - 이벤트 이름
 * @property {number} price - 이벤트 할인 가격
 * @property {number} startDay - 이벤트 시작일
 * @property {number} endDay - 이벤트 종료일
 */

/**
 * @typedef {menu[]} category
 */

/**
 * @typedef {object} menu
 * @property {string} name - 메뉴 이름
 * @property {number} price - 메뉴 가격
 */

/**
 * @typedef {0 | 1} check
 */
