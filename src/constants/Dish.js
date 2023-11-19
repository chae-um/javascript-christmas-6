import deepFreeze from '../utils/deepFreeze.js';

/**
 * @type {{ name: string, price: number }[]}
 */
export const APPETIZER = deepFreeze([
  { name: '양송이수프', price: 6_000 },
  { name: '타파스', price: 5_500 },
  { name: '시저샐러드', price: 8_000 },
]);

/**
 * @type {{ name: string, price: number }[]}
 */
export const MAIN_DISH = deepFreeze([
  { name: '티본스테이크', price: 55_000 },
  { name: '바비큐립', price: 54_000 },
  { name: '해산물파스타', price: 35_000 },
  { name: '크리스마스파스타', price: 25_000 },
]);

/**
 * @type {{ name: string, price: number }[]}
 */
export const DESSERT = deepFreeze([
  { name: '초코케이크', price: 15_000 },
  { name: '아이스크림', price: 5_000 },
]);

/**
 * @type {{ name: string, price: number }[]}
 */
export const BEVERAGE = deepFreeze([
  { name: '제로콜라', price: 3_000 },
  { name: '레드와인', price: 60_000 },
  { name: '샴페인', price: 25_000 },
]);

export const DISH_CATEGORY = deepFreeze([
  APPETIZER,
  MAIN_DISH,
  DESSERT,
  BEVERAGE,
]);
