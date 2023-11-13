import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  print(message) {
    return Console.print(message);
  },

  printOrderedMenu(userRequestedMenus) {
    this.print('\n<주문 메뉴>');
    userRequestedMenus.forEach((quantity, menu) => {
      this.print(`${menu} ${quantity}개`);
    });
  },

  printOriginalOrderTotal(totalMenuPrice) {
    this.print('\n<할인 전 총주문 금액>');
    this.print(`${totalMenuPrice.toLocaleString('ko-KR')}원`);
  },

  printGiftMenu(isGiftMenuAvailable) {
    this.print('\n<증정 메뉴>');
    if (isGiftMenuAvailable) {
      this.print('샴페인 1개');
    } else {
      this.print('없음');
    }
  },

  printDiscount({ canDiscount, weeklyDiscount, specialDiscount, dDayDiscount, giftDiscount }) {
    this.print('\n<혜택 내역>');
    if (!canDiscount) {
      this.print('없음');
      return;
    }
    if (dDayDiscount) {
      this.print(`크리스마스 디데이 할인: -${dDayDiscount.toLocaleString('ko-KR')}원`);
    }
    if (weeklyDiscount.amount) {
      this.print(`${weeklyDiscount.weekly}: -${weeklyDiscount.amount.toLocaleString('ko-KR')}원`);
    }
    if (specialDiscount) this.print(`특별 할인: -${specialDiscount.toLocaleString('ko-KR')}원`);
    if (giftDiscount) this.print(`증정 이벤트: -${giftDiscount.toLocaleString('ko-KR')}원`);
  },

  printBenefitsContent(benefitsContent) {
    this.print('\n<총혜택 금액>');
    this.print(`-${benefitsContent.toLocaleString('ko-KR')}원`);
  },
};

export default OutputView;
