import { BADGE, DISCOUNT } from '../constants/System.js';
import UserRequestedMenus from './UserRequestedMenus.js';
import VisitDate from './VisitDate.js';

class Discount {
  /**
   * @private
   * @type {VisitDate}
   */
  #visitDate;

  /**
   * @private
   * @type {UserRequestedMenus}
   */
  #userRequestedMenus;

  constructor(visitDate, userRequestedMenus) {
    this.#visitDate = visitDate;
    this.#userRequestedMenus = userRequestedMenus;
  }

  /**
   * @returns {boolean}
   */
  canDiscount() {
    return this.#userRequestedMenus.canDiscount();
  }

  /**
   * @returns {object}
   * @property {object} weeklyDiscount
   * @property {string} weeklyDiscount.weekly
   * @property {number} weeklyDiscount.amount
   * @property {number} specialDiscount
   * @property {number} dDayDiscount
   * @property {number} giftDiscount
   */
  calculateDiscount() {
    const weeklyDiscount = this.#calculateWeeklyDiscount();
    const specialDiscount = this.#calculateSpecialDisCount();
    const dDayDiscount = this.#calculateDDayDiscount();
    const giftDiscount = this.#calculateGiftMenuDiscount();

    return { weeklyDiscount, specialDiscount, dDayDiscount, giftDiscount };
  }

  /**
   * @returns {number}
   */
  calculateTotalBenefitsAmount() {
    const { weeklyDiscount, specialDiscount, dDayDiscount, giftDiscount } =
      this.calculateDiscount();

    return weeklyDiscount.amount + specialDiscount + dDayDiscount + giftDiscount;
  }

  /**
   * @returns {number}
   */
  calculateDiscountedTotalMenuPrice() {
    const { weeklyDiscount, specialDiscount, dDayDiscount } = this.calculateDiscount();
    const discountSum = weeklyDiscount.amount + specialDiscount + dDayDiscount;

    return this.#userRequestedMenus.getTotalMenuPrice() - discountSum;
  }

  /**
   * @returns {string}
   */
  calculateEventBadge() {
    const benefitsAmount = this.calculateTotalBenefitsAmount();

    if (benefitsAmount >= BADGE.santa.minAmount) return BADGE.santa.text;
    if (benefitsAmount >= BADGE.tree.minAmount) return BADGE.tree.text;
    if (benefitsAmount >= BADGE.start.minAmount) return BADGE.start.text;

    return BADGE.nothing;
  }

  /**
   * @returns {object}
   * @property {string} weekly
   * @property {number} amount
   */
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

  /**
   * @returns {number}
   */
  #calculateSpecialDisCount() {
    if (this.#visitDate.isSpecialDiscount()) {
      return DISCOUNT.special;
    }

    return DISCOUNT.nothing;
  }

  /**
   * @returns {number}
   */
  #calculateDDayDiscount() {
    if (this.#visitDate.isChristmasDDayDiscount()) {
      return DISCOUNT.dDay.default + (this.#visitDate.getDate() - 1) * DISCOUNT.dDay.unitAmount;
    }

    return DISCOUNT.nothing;
  }

  /**
   * @returns {number}
   */
  #calculateGiftMenuDiscount() {
    if (this.#userRequestedMenus.isGiftMenuAvailable()) {
      return DISCOUNT.giftMenu;
    }

    return DISCOUNT.nothing;
  }
}

export default Discount;
