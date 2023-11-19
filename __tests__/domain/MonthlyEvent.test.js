import MonthlyEvent from '../../src/domain/MonthlyEvent.js';
import { EVENT_ERROR_MESSAGE } from '../../src/constants/ChristmasEventMessage.js';

describe('MonthlyEvent 기능 테스트', () => {
  test.each([
    {
      orderList: [
        { orderItemName: '티본스테이크', orderItemAmount: 2 },
        { orderItemName: '초코케이크', orderItemAmount: 3 },
      ],
      orderTotal: 155_000,
      day: 5,
      expectResult: {
        eventList: [
          { eventName: '크리스마스 디데이 할인', discountPrice: 1_400 },
          { eventName: '평일 할인', discountPrice: 6_069 },
          { eventName: '증정 이벤트', discountPrice: 25_000 },
        ],
        totalEventDiscount: 32_469,
        present: true,
      },
    },
    {
      orderList: [
        { orderItemName: '크리스마스파스타', orderItemAmount: 3 },
        { orderItemName: '아이스크림', orderItemAmount: 4 },
      ],
      orderTotal: 95_000,
      day: 7,
      expectResult: {
        eventList: [
          { eventName: '크리스마스 디데이 할인', discountPrice: 1_600 },
          { eventName: '평일 할인', discountPrice: 8_092 },
        ],
        totalEventDiscount: 9_692,
        present: false,
      },
    },
  ])('apply 기능 테스트', ({ orderList, orderTotal, day, expectResult }) => {
    // given
    const monthlyEvent = MonthlyEvent.of();

    monthlyEvent.validate(day);

    // when
    const result = monthlyEvent.apply(orderList, orderTotal);

    // then
    expect(result).toEqual(expectResult);
  });

  // given
  test.each([
    {
      eventList: [
        { eventName: '크리스마스 디데이 할인', discountPrice: 1_400 },
        { eventName: '평일 할인', discountPrice: 6_069 },
        { eventName: '증정 이벤트', discountPrice: 25_000 },
      ],
      orderTotal: 155_000,
      expectPayResult: 147_531,
    },
    {
      eventList: [
        { eventName: '크리스마스 디데이 할인', discountPrice: 1_600 },
        { eventName: '평일 할인', discountPrice: 8_092 },
      ],
      orderTotal: 95_000,
      expectPayResult: 85_308,
    },
  ])('payResult 기능 테스트', ({ eventList, orderTotal, expectPayResult }) => {
    const monthlyEvent = MonthlyEvent.of();
    // when
    const result = monthlyEvent.payResult(eventList, orderTotal);

    // then
    expect(result).toBe(expectPayResult);
  });

  // given
  test.each([
    { totalEventDiscount: 30000, expectBadge: '산타' },
    { totalEventDiscount: 10000, expectBadge: '트리' },
    { totalEventDiscount: 6000, expectBadge: '별' },
    { totalEventDiscount: 2023, expectBadge: 0 },
  ])('badge 기능 테스트', ({ totalEventDiscount, expectBadge }) => {
    const monthlyEvent = MonthlyEvent.of();
    // when
    const badge = monthlyEvent.badge(totalEventDiscount);

    // then
    expect(badge).toBe(expectBadge);
  });
});

describe('MonthlyEvent 예외 테스트', () => {
  // given
  test.each([{ day: 0 }, { day: 1.1 }, { day: 9999 }])(
    '방문 날짜 예외 테스트',
    ({ day }) => {
      const monthlyEvent = MonthlyEvent.of();

      // when & then
      expect(() => monthlyEvent.validate(day)).toThrow(
        EVENT_ERROR_MESSAGE.invalidVisitDay
      );
    }
  );
});
