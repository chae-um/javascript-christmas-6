export const D_DAY_EVENT_DISCOUNT_PER_DAY = 100;

export const SPECIAL_EVENT_DAY = Object.freeze([3, 10, 17, 24, 25, 31]);

export const EVENT_OPTION = Object.freeze({
  eventMinimumOrderPrice: 10_000,
  maximumOrderAmount: 20,
});

export const EVENT_BADGE = Object.freeze([
  { name: '산타', require: 20_000 },
  { name: '트리', require: 10_000 },
  { name: '별', require: 5_000 },
]);

export const PRESENT_EVENT = Object.freeze({
  minimumOrderPrice: 120_000,
  itemName: '샴페인',
  itemAmount: 1,
});
