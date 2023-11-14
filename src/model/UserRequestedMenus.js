import { ERROR_MESSAGE } from '../constants/Messages.js';
import { BEVERAGE_MENUS, MENUS, SYMBOL } from '../constants/Symbol.js';

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
    if (menuCount > 20) {
      handleValidationError('메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.');
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

  // eslint-disable-next-line class-methods-use-this
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
    const desert = ['초코케이크', '아이스크림'];

    this.#userRequestedMenus.forEach((quantity, menu) => {
      if (desert.includes(menu)) {
        count += quantity;
      }
    });

    return count;
  }

  getMainQuantity() {
    let count = 0;
    const main = ['티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타'];

    this.#userRequestedMenus.forEach((quantity, menu) => {
      if (main.includes(menu)) {
        count += quantity;
      }
    });

    return count;
  }

  canDiscount() {
    return this.#totalMenuPrice >= 10000;
  }

  getUserRequestedMenus() {
    return this.#userRequestedMenus;
  }

  getTotalMenuPrice() {
    return this.#totalMenuPrice;
  }

  isGiftMenuAvailable() {
    return this.#totalMenuPrice >= 120000;
  }
}

export default UserRequestedMenus;
