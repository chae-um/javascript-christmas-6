import deepFreeze from '../utils/deepFreeze.js';

export const BADGE = deepFreeze({
  santa: {
    text: '산타',
    minAmount: 20000,
  },
  tree: {
    text: 'tree',
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
});
