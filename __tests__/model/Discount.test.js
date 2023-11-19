import VisitDate from '../../src/model/VisitDate.js';
import UserRequestedMenus from '../../src/model/UserRequestedMenus.js';
import Discount from '../../src/model/Discount.js';

describe('Discount', () => {
  describe('canDiscount', () => {
    test.each([
      { input: '양송이수프-1,제로콜라-1', expected: false },
      { input: '티본스테이크-1,아이스크림-1', expected: true },
    ])('주문 총액이 만원이 넘으면 true 넘지않으면 false를 리턴합니다.', ({ input, expected }) => {
      // given
      const discount = new Discount(VisitDate.of(13), UserRequestedMenus.of(input));

      // when
      // then
      expect(discount.canDiscount()).toBe(expected);
    });
  });

  describe('calculateDiscount', () => {
    test('올바른 할인 내역을 계산해줘야한다.', () => {
      // given
      const date = 15;
      const menus = '바비큐립-1,해산물파스타-2,레드와인-1';
      const result = {
        dDayDiscount: 2400,
        giftDiscount: 25000,
        specialDiscount: 0,
        weeklyDiscount: { amount: 6069, weekly: '주말 할인' },
      };

      // when
      const discount = new Discount(VisitDate.of(date), UserRequestedMenus.of(menus));

      // then
      expect(discount.calculateDiscount()).toEqual(result);
    });
  });

  describe('calculateTotalBenefitsAmount', () => {
    test('총 혜택 받은 금액을 정확하게 리턴해야한다.', () => {
      // given
      const date = 15;
      const menus = '바비큐립-1,해산물파스타-2,레드와인-1';
      const result = 33469;

      // when
      const discount = new Discount(VisitDate.of(date), UserRequestedMenus.of(menus));

      // then
      expect(discount.calculateTotalBenefitsAmount()).toBe(result);
    });
  });

  describe('calculateEventBadge', () => {
    test.each([
      { input: '해산물파스타-2,레드와인-1,초코케이크-1', expected: '산타' },
      { input: '크리스마스파스타-4', expected: '트리' },
      { input: '해산물파스타-2,초코케이크-1', expected: '별' },
      { input: '티본스테이크-1,제로콜라-1', expected: '없음' },
    ])(
      '총혜택금액이 5천원 이상이면 별, 1만원 이상이면 트리, 2만원 이상이면 산타가 리턴되어야 한다. $input',
      ({ input, expected }) => {
        // given
        const discount = new Discount(VisitDate.of(15), UserRequestedMenus.of(input));

        // when
        // then
        expect(discount.calculateEventBadge()).toBe(expected);
      },
    );
  });
});
