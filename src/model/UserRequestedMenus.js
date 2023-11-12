import { BEVERAGE_MENUS, MENUS } from '../constants/Symbol.js';
import handleValidationError from '../utils/error/index.js';
import { isValidCount, isValidFormatter } from '../utils/validators/index.js';

class UserRequestedMenus {
  #userRequestedMenus;

  #totalMenuPrice;

  constructor(userRequestedMenus) {
    this.#validate(userRequestedMenus);
    this.#organizeMenus(userRequestedMenus.split(','));
  }

  #validate(userRequestedMenus) {
    let menuCount = 0;
    const userMenus = [];
    userRequestedMenus.split(',').forEach((userRequestedMenu) => {
      if (!isValidFormatter(userRequestedMenu)) {
        handleValidationError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
      }
      const [menu, quantity] = userRequestedMenu.split('-');

      this.#validateMenu(menu, quantity);
      menuCount += Number(quantity);
      userMenus.push(menu);
    });
    this.#validateMenus(menuCount, userMenus);
  }

  // eslint-disable-next-line class-methods-use-this
  #validateMenu(menu, quantity) {
    if (!isValidCount(quantity)) {
      handleValidationError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
    if (!Object.keys(MENUS).includes(menu)) {
      handleValidationError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #validateMenus(menuCount, userMenus) {
    if (menuCount > 20) {
      handleValidationError('메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.');
    }
    if (userMenus.length !== new Set(userMenus).size) {
      handleValidationError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }

    if (userMenus.every((userMenu) => BEVERAGE_MENUS.includes(userMenu))) {
      handleValidationError('음료만 주문 시, 주문할 수 없습니다.');
    }
  }

  static of(userRequestedMenus) {
    return new UserRequestedMenus(userRequestedMenus);
  }

  #organizeMenus(userRequestedMenus) {
    this.#userRequestedMenus = this.#cleanMenus(userRequestedMenus);
    this.#totalMenuPrice = this.#calculateTotalMenuPrice(userRequestedMenus);
  }

  // eslint-disable-next-line class-methods-use-this
  #cleanMenus(userRequestedMenus) {
    return userRequestedMenus.reduce((acc, userRequestedMenu) => {
      const [menu, quantity] = userRequestedMenu.split('-');

      acc.set(menu, quantity);

      return acc;
    }, new Map());
  }

  // eslint-disable-next-line class-methods-use-this
  #calculateTotalMenuPrice(userRequestedMenus) {
    return userRequestedMenus.reduce((acc, cur) => acc + MENUS[cur.split('-')[0]], 0);
  }

  getUserRequestedMenus() {
    return this.#userRequestedMenus;
  }
}

export default UserRequestedMenus;
