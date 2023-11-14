import { ERROR_MESSAGE } from '../constants/Messages.js';
import { BEVERAGE_MENUS, MENUS, SYMBOL } from '../constants/Symbol.js';
import { DISCOUNT_LIMIT, MENU_BY_CATEGORY, ORDER_LIMIT } from '../constants/System.js';

import { handleValidationError } from '../utils/error/index.js';
import split from '../utils/split.js';
import { isValidCount, isValidFormatter } from '../utils/validators/index.js';

class UserRequestedMenus {
  #userRequestedMenus;

  #totalMenuPrice;

  constructor(userRequestedMenus) {
    this.#validate(split(userRequestedMenus, SYMBOL.comma));
    this.#organizeMenus(split(userRequestedMenus, SYMBOL.comma));
  }

  #validate(userRequestedMenus) {
    const { menuCount, userMenus } = this.#getMenuInfo(userRequestedMenus);

    this.#validateMenus(menuCount, userMenus);
  }

  #getMenuInfo(userRequestedMenus, userMenus = []) {
    let menuCount = 0;

    userRequestedMenus.forEach((userRequestedMenu) => {
      this.#validateFormatter(userRequestedMenu);

      const [menu, quantity] = split(userRequestedMenu, SYMBOL.hyphen);

      this.#validateMenu(menu, quantity);
      menuCount += Number(quantity);
      userMenus.push(menu);
    });

    return { menuCount, userMenus };
  }

  #validateFormatter(userRequestedMenu) {
    if (!isValidFormatter(userRequestedMenu)) {
      handleValidationError(ERROR_MESSAGE.invalidOrder);
    }
  }

  #validateMenu(menu, quantity) {
    if (!isValidCount(quantity)) {
      handleValidationError(ERROR_MESSAGE.invalidOrder);
    }
    if (!Object.keys(MENUS).includes(menu)) {
      handleValidationError(ERROR_MESSAGE.invalidOrder);
    }
  }

  #validateMenus(menuCount, userMenus) {
    if (menuCount > ORDER_LIMIT.maxMenuCount) {
      handleValidationError(
        `메뉴는 한 번에 최대 ${ORDER_LIMIT.maxMenuCount}개까지만 주문할 수 있습니다.`,
      );
    }
    if (userMenus.length !== new Set(userMenus).size) {
      handleValidationError(ERROR_MESSAGE.invalidOrder);
    }
    if (userMenus.every((userMenu) => BEVERAGE_MENUS.includes(userMenu))) {
      handleValidationError('음료만 주문 시, 주문할 수 없습니다.');
    }
  }

  #organizeMenus(userRequestedMenus) {
    this.#userRequestedMenus = this.#cleanMenus(userRequestedMenus);
    this.#totalMenuPrice = this.#calculateTotalMenuPrice(userRequestedMenus);
  }

  #cleanMenus(userRequestedMenus) {
    return userRequestedMenus.reduce((acc, userRequestedMenu) => {
      const [menu, quantity] = split(userRequestedMenu, SYMBOL.hyphen);

      acc.set(menu, Number(quantity));

      return acc;
    }, new Map());
  }

  #calculateTotalMenuPrice(userRequestedMenus) {
    return userRequestedMenus.reduce((acc, cur) => {
      const [menu, quantity] = split(cur, SYMBOL.hyphen);

      return acc + MENUS[menu] * quantity;
    }, 0);
  }

  static of(userRequestedMenus) {
    return new UserRequestedMenus(userRequestedMenus);
  }

  getDesertQuantity() {
    let count = 0;
    const { desert } = MENU_BY_CATEGORY;

    this.#userRequestedMenus.forEach((quantity, menu) => {
      if (desert.includes(menu)) {
        count += quantity;
      }
    });

    return count;
  }

  getMainQuantity() {
    let count = 0;
    const { main } = MENU_BY_CATEGORY;

    this.#userRequestedMenus.forEach((quantity, menu) => {
      if (main.includes(menu)) {
        count += quantity;
      }
    });

    return count;
  }

  canDiscount() {
    return this.#totalMenuPrice >= DISCOUNT_LIMIT.totalMenuPrice;
  }

  getUserRequestedMenus() {
    return this.#userRequestedMenus;
  }

  getTotalMenuPrice() {
    return this.#totalMenuPrice;
  }

  isGiftMenuAvailable() {
    return this.#totalMenuPrice >= DISCOUNT_LIMIT.giftMenu;
  }
}

export default UserRequestedMenus;
