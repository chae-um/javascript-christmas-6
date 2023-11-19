import deepFreeze from '../utils/deepFreeze.js';
import getItemInformationByItemName from '../utils/getItemInformationByItemName.js';
import { PRESENT_EVENT } from './ChristmasEventOption.js';

export const EVENT_INFORMATION = deepFreeze({
  dDay: {
    name: '크리스마스 디데이 할인',
    price: 1_000,
    startDay: 1,
    endDay: 25,
  },
  special: {
    name: '특별 할인',
    price: 1_000,
    startDay: 1,
    endDay: 31,
  },
  weekday: {
    name: '평일 할인',
    price: 2_023,
    startDay: 1,
    endDay: 31,
  },
  weekend: {
    name: '주말 할인',
    price: 2_023,
    startDay: 1,
    endDay: 31,
  },
  present: {
    name: '증정 이벤트',
    price: getItemInformationByItemName(PRESENT_EVENT.itemName).price,
    startDay: 1,
    endDay: 31,
  },
});

/**
 * @type {{ name: string, price: number, startDay: number, endDay: Number }[]}
 */
export const EVENT_LIST = Object.values(EVENT_INFORMATION);

export const DISCOUNT_EVENT_EXCEPTION_LIST = Object.freeze([
  EVENT_INFORMATION.present.name,
]);
