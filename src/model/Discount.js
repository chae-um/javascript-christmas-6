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

  calculateWeeklyDiscount() {
    if (this.#day.isWeekdays()) {
      return { weekly: '평일 할인', amount: this.#userRequestedMenus.getDesertQuantity() * 2023 };
    }

    return { weekly: '주말 할인', amount: this.#userRequestedMenus.getMainQuantity() * 2023 };
  }

  calculateSpecialDisCount() {
    if (this.#day.isSpecialDiscount()) {
      return 1000;
    }

    return 0;
  }

  calculateChristmasDDayDiscount() {
    if (this.#day.isChristmasDDayDiscount()) {
      return 1000 + (this.#day.getDate() - 1) * 100;
    }

    return 0;
  }

  calculateGiftMenuDiscount() {
    if (this.#userRequestedMenus.isGiftMenuAvailable()) {
      return 25000;
    }

    return 0;
  }
}

export default Discount;
