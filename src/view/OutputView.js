import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  print(message) {
    return Console.print(message);
  },

  printOrderedMenu(userRequestedMenus) {
    this.print('\n<주문 메뉴>\n');
    userRequestedMenus.forEach((quantity, menu) => {
      this.print(`${menu} ${quantity}개`);
    });
  },
};

export default OutputView;
