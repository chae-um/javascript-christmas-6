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

  printGiftMenu(isGiftMenuAvailable) {
    this.print('\n<증점 메뉴>');
    if (isGiftMenuAvailable) {
      this.print('샴페인 1개');
    } else {
      this.print('없음');
    }
  },
};

export default OutputView;
