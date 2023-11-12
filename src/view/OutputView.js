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

  printOriginalOrderTotal(totalMenuPrice) {
    this.print('\n<할인 전 총주문 금액>');
    this.print(`${totalMenuPrice.toLocaleString('ko-KR')}원`);
  },
};

export default OutputView;
