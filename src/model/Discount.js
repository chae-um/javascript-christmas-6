class Discount {
  #day;

  #userRequestedMenus;

  constructor(day, userRequestedMenus) {
    this.#day = day;
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

  #calculateWeeklyDiscount() {
    if (this.#day.isWeekdays()) {
      return { weekly: '평일 할인', amount: this.#userRequestedMenus.getDesertQuantity() * 2023 };
    }

    return { weekly: '주말 할인', amount: this.#userRequestedMenus.getMainQuantity() * 2023 };
  }

  #calculateSpecialDisCount() {
    if (this.#day.isSpecialDiscount()) {
      return 1000;
    }

    return 0;
  }

  #calculateChristmasDDayDiscount() {
    if (this.#day.isChristmasDDayDiscount()) {
      return 1000 + (this.#day.getDate() - 1) * 100;
    }

    return 0;
  }

  #calculateGiftMenuDiscount() {
    if (this.#userRequestedMenus.isGiftMenuAvailable()) {
      return 25000;
    }

    return 0;
  }
}

export default Discount;
