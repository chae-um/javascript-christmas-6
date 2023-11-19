import { DIVIDER } from '../constants/Symbol.js';
import OrderSheet from '../domain/OrderSheet.js';
import deepFreeze from '../utils/deepFreeze.js';

const OrderService = deepFreeze({
  /**
   * @type {OrderSheet} - OrderSheet 인스턴스
   */
  orderSheet: OrderSheet.of(),

  /**
   * @param {string} order - 입력받은 주문 입력
   */
  initialize(order) {
    const parsedOrderList = this.parsingOrderString(order);

    this.orderSheet.validate(parsedOrderList);
  },

  /**
   * @returns {import('../utils/JSDocs.js').orderResult}} 주문 목록 및 금액 합계
   */
  orderMenu() {
    return this.orderSheet.order();
  },

  /**
   * @param {string} order - 입력받은 주문 입력
   * @returns {import('../utils/JSDocs.js').orderList} 주문 목록
   */
  parsingOrderString(order) {
    return order.split(DIVIDER.comma).map((combinedOrder) => {
      const [orderItemName, orderItemAmount] = combinedOrder.split(
        DIVIDER.hyphen
      );

      return { orderItemName, orderItemAmount: Number(orderItemAmount) };
    });
  },
});

export default OrderService;
