import getItemInformationByItemName from '../utils/getItemInformationByItemName.js';
import OrderValidator from '../validator/OrderValidator.js';

export default class OrderSheet {
  /**
   * @private
   * @type {import('../utils/JSDocs.js').orderList}
   */
  #orderList;

  /**
   * @static
   * @returns {OrderSheet} OrderSheet 인스턴스
   */
  static of() {
    return new OrderSheet();
  }

  /**
   * @public
   * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
   */
  validate(orderList) {
    OrderValidator.validateOrder(orderList);
    this.#orderList = orderList;
  }

  /**
   * @public
   * @returns {import('../utils/JSDocs.js').orderResult} 주문 목록 및 금액 합계
   */
  order() {
    return { orderList: this.#orderList, orderTotal: this.#calculate() };
  }

  /**
   * @private
   * @returns {number} 증정 행사를 제외한 할인된 가격의 총합
   */
  #calculate() {
    return this.#orderList.reduce(
      (total, { orderItemName, orderItemAmount }) => {
        const orderItemInformation =
          getItemInformationByItemName(orderItemName);

        return total + orderItemInformation.price * orderItemAmount;
      },
      0
    );
  }
}
