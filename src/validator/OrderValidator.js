import { EVENT_ERROR_MESSAGE } from '../constants/ChristmasEventMessage.js';
import { EVENT_OPTION } from '../constants/ChristmasEventOption.js';
import { DESSERT } from '../constants/Dish.js';
import ValidationError from '../error/ValidationError.js';
import deepFreeze from '../utils/deepFreeze.js';
import getItemInformationByItemName from '../utils/getItemInformationByItemName.js';

const OrderValidator = deepFreeze({
  /**
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   * @throws {ValidationError}
   */
  checkValidOrderMenu(orderList) {
    orderList.forEach((item) => {
      const itemInformation = getItemInformationByItemName(item.orderItemName);

      if (!itemInformation) {
        throw new ValidationError(EVENT_ERROR_MESSAGE.invalidOrder);
      }
    });
  },

  /**
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   * @throws {ValidationError}
   */
  checkValidOrderAmount(orderList) {
    orderList.forEach(({ orderItemAmount }) => {
      if (Number.isNaN(orderItemAmount)) {
        throw new ValidationError(EVENT_ERROR_MESSAGE.invalidOrder);
      }

      if (!Number.isInteger(orderItemAmount)) {
        throw new ValidationError(EVENT_ERROR_MESSAGE.invalidOrder);
      }

      if (orderItemAmount === 0) {
        throw new ValidationError(EVENT_ERROR_MESSAGE.invalidOrder);
      }
    });
  },

  /**
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   * @throws {ValidationError}
   */
  checkOrderAmountExceed(orderList) {
    const totalOrderAmount = orderList.reduce(
      (acc, { orderItemAmount }) => acc + orderItemAmount,
      0
    );

    if (totalOrderAmount > EVENT_OPTION.maximumOrderAmount) {
      throw new ValidationError(EVENT_ERROR_MESSAGE.invalidOrder);
    }
  },

  /**
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   * @throws {ValidationError}
   */
  checkOrderMenuDuplication(orderList) {
    const orderMenuList = orderList.map(({ orderItemName }) => orderItemName);
    const orderMenuSet = new Set(orderMenuList);

    if (orderMenuList.length !== orderMenuSet.size) {
      throw new ValidationError(EVENT_ERROR_MESSAGE.invalidOrder);
    }
  },

  /**
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   * @throws {ValidationError}
   */
  checkOrderMenuIsOnlyDessert(orderList) {
    const dessertMenuList = orderList.filter(({ orderItemName }) =>
      DESSERT.some((menu) => menu.name === orderItemName)
    );

    if (orderList.length === dessertMenuList.length) {
      throw new ValidationError(EVENT_ERROR_MESSAGE.invalidOrder);
    }
  },

  /**
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   */
  validateOrder(orderList) {
    this.checkValidOrderMenu(orderList);
    this.checkValidOrderAmount(orderList);
    this.checkOrderAmountExceed(orderList);
    this.checkOrderMenuDuplication(orderList);
    this.checkOrderMenuIsOnlyDessert(orderList);
  },
});

export default OrderValidator;
