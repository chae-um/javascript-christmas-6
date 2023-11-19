import { Console } from '@woowacourse/mission-utils';

import { OUTPUT_MESSAGE, OUTPUT_MESSAGE_FUNCTION } from '../constants/Messages.js';
import { DISCOUNT } from '../constants/System.js';

const OutputView = {
  /**
   * @param {string} message
   */
  print(message) {
    Console.print(message);
  },

  printStart() {
    this.print(OUTPUT_MESSAGE.start);
  },

  printCautions() {
    this.print(OUTPUT_MESSAGE.cautions.title);
    this.print(OUTPUT_MESSAGE.cautions.totalOrderAmount);
    this.print(OUTPUT_MESSAGE.cautions.beverage);
    this.print(OUTPUT_MESSAGE.cautions.menu);
  },

  /**
   * @param {Map} userRequestedMenus
   */
  printOrderedMenu(userRequestedMenus) {
    this.print(OUTPUT_MESSAGE.title.userRequestedMenus);
    userRequestedMenus.forEach((quantity, menu) => {
      this.print(OUTPUT_MESSAGE_FUNCTION.orderedMenu(menu, quantity));
    });
  },

  /**
   * @param {number} totalMenuPrice
   */
  printOriginalOrderTotal(totalMenuPrice) {
    this.print(OUTPUT_MESSAGE.title.totalMenuPrice);
    this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(totalMenuPrice, false, false));
  },

  /**
   * @param {boolean} isGiftMenuAvailable
   */
  printGiftMenu(isGiftMenuAvailable) {
    this.print(OUTPUT_MESSAGE.title.giftMenu);

    if (isGiftMenuAvailable) {
      this.print(OUTPUT_MESSAGE.giftMenu);
    } else {
      this.print(OUTPUT_MESSAGE.nothing);
    }
  },

  /**
   * Object representing various discounts.
   * @typedef {object} discountData
   * @property {boolean} canDiscount
   * @property {number} dDayDiscount
   * @property {number} giftDiscount
   * @property {number} specialDiscount
   * @property {object} weeklyDiscount
   * @property {number} weeklyDiscount.amount
   * @property {string} weeklyDiscount.weekly
   */

  /**
   * Example result object with discount information.
   * @param {discountData} discountData
   */
  printDiscount(discountData) {
    this.print(OUTPUT_MESSAGE.title.discount);

    if (!discountData.canDiscount) {
      this.print(OUTPUT_MESSAGE.nothing);
      return;
    }

    this.printDiscountData(discountData);
  },

  printDiscountData({ dDayDiscount, weeklyDiscount, specialDiscount, giftDiscount }) {
    if (dDayDiscount) {
      this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(dDayDiscount, DISCOUNT.title.dDay));
    }
    if (weeklyDiscount.amount) {
      const { weekly, amount } = weeklyDiscount;
      this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(amount, weekly));
    }
    if (specialDiscount) {
      this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(specialDiscount, DISCOUNT.title.special));
    }
    if (giftDiscount) {
      this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(giftDiscount, DISCOUNT.title.gift));
    }
  },

  /**
   * @param {number} benefitsContent
   */
  printBenefitsContent(benefitsContent) {
    this.print(OUTPUT_MESSAGE.title.benefitsContent);
    this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(benefitsContent));
  },

  /**
   * @param {number} discountedTotalMenuPrice
   */
  printDiscountedTotalMenuPrice(discountedTotalMenuPrice) {
    this.print(OUTPUT_MESSAGE.title.discountedTotalMenuPrice);
    this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(discountedTotalMenuPrice, false, false));
  },

  /**
   * @param {string} eventBadge
   */
  printEventBadge(eventBadge) {
    this.print(OUTPUT_MESSAGE.title.eventBadge);
    this.print(eventBadge);
  },
};

export default OutputView;
