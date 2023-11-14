import { BADGE, DISCOUNT } from '../constants/System.js';

class Discount {
  #visitDate;

  #userRequestedMenus;

  constructor(visitDate, userRequestedMenus) {
    this.#visitDate = visitDate;
    this.#userRequestedMenus = userRequestedMenus;
  }

  canDiscount() {
    return this.#userRequestedMenus.canDiscount();
  }

  calculateDiscount() {
    const weeklyDiscount = this.#calculateWeeklyDiscount();
    const specialDiscount = this.#calculateSpecialDisCount();
    const dDayDiscount = this.#calculateChristmasDDayDiscount();
    const giftDiscount = this.#calculateGiftMenuDiscount();

    return { weeklyDiscount, specialDiscount, dDayDiscount, giftDiscount };
  }

  calculateTotalBenefitsAmount() {
    const { weeklyDiscount, specialDiscount, dDayDiscount, giftDiscount } =
      this.calculateDiscount();

    return weeklyDiscount.amount + specialDiscount + dDayDiscount + giftDiscount;
  }

  calculateDiscountedTotalMenuPrice() {
    const { weeklyDiscount, specialDiscount, dDayDiscount } = this.calculateDiscount();
    const discountSum = weeklyDiscount.amount + specialDiscount + dDayDiscount;

    return this.#userRequestedMenus.getTotalMenuPrice() - discountSum;
  }

  calculateEventBadge() {
    const benefitsAmount = this.calculateTotalBenefitsAmount();

    if (benefitsAmount >= BADGE.santa.minAmount) return BADGE.santa.text;
    if (benefitsAmount >= BADGE.tree.minAmount) return BADGE.tree.text;
    if (benefitsAmount >= BADGE.start.minAmount) return BADGE.start.text;

    return BADGE.nothing;
  }

  #calculateWeeklyDiscount() {
    if (this.#visitDate.isWeekdays()) {
      return {
        weekly: DISCOUNT.weekly.weekday,
        amount: this.#userRequestedMenus.getDesertQuantity() * DISCOUNT.weekly.amount,
      };
    }

    return {
      weekly: DISCOUNT.weekly.weekend,
      amount: this.#userRequestedMenus.getMainQuantity() * DISCOUNT.weekly.amount,
    };
  }

  #calculateSpecialDisCount() {
    if (this.#visitDate.isSpecialDiscount()) {
      return DISCOUNT.special;
    }

    return DISCOUNT.nothing;
  }

  #calculateChristmasDDayDiscount() {
    if (this.#visitDate.isChristmasDDayDiscount()) {
      return DISCOUNT.dDay.default + (this.#visitDate.getDate() - 1) * DISCOUNT.dDay.unitAmount;
    }

    return DISCOUNT.nothing;
  }

  #calculateGiftMenuDiscount() {
    if (this.#userRequestedMenus.isGiftMenuAvailable()) {
      return DISCOUNT.giftMenu;
    }

    return DISCOUNT.nothing;
  }
}

export default Discount;
