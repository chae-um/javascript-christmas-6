import deepFreeze from '../utils/deepFreeze.js';

export const DATE = Object.freeze({
  month: 12,
  startDay: 1,
  endDay: 31,
});

export const DAY = deepFreeze({
  dayOfTheWeek: ['목', '금', '토', '일', '월', '화', '수'],
  weekday: ['일', '월', '화', '수', '목'],
  weekend: ['금', '토'],
  amount: 7,
});

export const WEEK = Object.freeze({
  weekday: 0,
  weekend: 1,
});
