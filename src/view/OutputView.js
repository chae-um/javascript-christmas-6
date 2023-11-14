import { Console } from '@woowacourse/mission-utils';

import { OUTPUT_MESSAGE, OUTPUT_MESSAGE_FUNCTION } from '../constants/Messages.js';
import { DISCOUNT } from '../constants/System.js';

const OutputView = {
  print(message) {
    return Console.print(message);
  },

  printOrderedMenu(userRequestedMenus) {
    this.print(OUTPUT_MESSAGE.title.userRequestedMenus);
    userRequestedMenus.forEach((quantity, menu) => {
      this.print(OUTPUT_MESSAGE_FUNCTION.orderedMenu(menu, quantity));
    });
  },

  printOriginalOrderTotal(totalMenuPrice) {
    this.print(OUTPUT_MESSAGE.title.totalMenuPrice);
    this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(totalMenuPrice, false, false));
  },

  printGiftMenu(isGiftMenuAvailable) {
    this.print(OUTPUT_MESSAGE.title.giftMenu);

    if (isGiftMenuAvailable) {
      this.print(OUTPUT_MESSAGE.giftMenu);
    } else {
      this.print(OUTPUT_MESSAGE.nothing);
    }
  },

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

  printBenefitsContent(benefitsContent) {
    this.print(OUTPUT_MESSAGE.title.benefitsContent);
    this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(benefitsContent));
  },

  printDiscountedTotalMenuPrice(discountedTotalMenuPrice) {
    this.print(OUTPUT_MESSAGE.title.discountedTotalMenuPrice);
    this.print(OUTPUT_MESSAGE_FUNCTION.discountFormat(discountedTotalMenuPrice, false, false));
  },

  printEventBadge(eventBadge) {
    this.print(OUTPUT_MESSAGE.title.eventBadge);
    this.print(eventBadge);
  },
};

export default OutputView;
