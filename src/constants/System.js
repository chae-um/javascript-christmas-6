import deepFreeze from '../utils/deepFreeze.js';

export const BADGE = deepFreeze({
  santa: {
    text: '산타',
    minAmount: 20000,
  },
  tree: {
    text: '트리',
    minAmount: 10000,
  },
  start: {
    text: '별',
    minAmount: 5000,
  },
  nothing: '없음',
});

/**
 * @typedef {object} DISCOUNT
 * @property {object} weekly - 주간 할인 정보
 * @property {string} weekly.weekday - 평일 할인 텍스트
 * @property {string} weekly.weekend - 주말 할인 텍스트
 * @property {number} weekly.amount - 주간 할인 금액
 * @property {number} special - 특별 할인 금액
 * @property {object} dDay - D-Day 할인 정보
 * @property {number} dDay.default - 기본 D-Day 할인 금액
 * @property {number} dDay.unitAmount - D-Day 단위 할인 금액
 * @property {number} giftMenu - 증정 메뉴 가격
 * @property {number} nothing - 할인 없음을 나타내는 값
 * @property {object} title - 할인 제목
 * @property {string} title.dDay - 크리스마스 디데이 할인
 * @property {string} title.gift - 증정 이벤트
 */

/** @type {DISCOUNT} */
export const DISCOUNT = deepFreeze({
  weekly: {
    weekday: '평일 할인',
    weekend: '주말 할인',
    amount: 2023,
  },
  special: 1000,
  dDay: {
    default: 1000,
    unitAmount: 100,
  },
  giftMenu: 25000,
  nothing: 0,
  title: {
    dDay: '크리스마스 디데이 할인',
    special: '특별 할인',
    gift: '증정 이벤트',
  },
});

/**
 * @typedef {object} MenuByCategory
 * @property {string[]} desert - 디저트 항목의 메뉴 배열
 * @property {string[]} main - 주 메뉴 항목의 메뉴 배열
 */

/**
 * 카테고리별 메뉴를 저장하는 객체입니다.
 * @type {MenuByCategory}
 * @constant
 */
export const MENU_BY_CATEGORY = deepFreeze({
  desert: ['초코케이크', '아이스크림'],
  main: ['티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타'],
});

export const DISCOUNT_LIMIT = Object.freeze({
  totalMenuPrice: 10_000,
  giftMenu: 120_000,
});

export const ORDER_LIMIT = Object.freeze({
  maxMenuCount: 20,
});

export const EVENT_DATE = Object.freeze({
  days: ['일', '월', '화', '수', '목'],
  specialDay: [3, 10, 17, 24, 25, 31],
  year: 2023,
  month: 12,
  dDayStart: 1,
  dDayEnd: 25,
});
