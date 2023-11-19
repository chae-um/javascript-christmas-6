import Discount from './Discount.js';

class ChristmasModel {
  #discount;

  constructor(visitDate, userRequestedMenus) {
    this.#discount = new Discount(visitDate, userRequestedMenus);
  }

  calculateDiscount() {
    if (!this.#discount.canDiscount()) return { canDiscount: false };

    const discountData = this.#discount.calculateDiscount();

    return { canDiscount: true, ...discountData };
  }

  getBenefitsAmount() {
    return this.#discount.calculateTotalBenefitsAmount();
  }

  getDiscountedTotalMenuPrice() {
    return this.#discount.calculateDiscountedTotalMenuPrice();
  }

  getEventBadge() {
    return this.#discount.calculateEventBadge();
  }
}

export default ChristmasModel;
