import DecemberEvent from '../../src/domain/DecemberEvent.js';

describe('DecemberEvent 도메인 테스트', () => {
  // given
  test.each([
    {
      day: 5,
      orderList: [{ orderItemName: '티본스테이크', orderItemAmount: 2 }],
      orderTotal: 110_000,
      expectEventList: [
        { eventName: '크리스마스 디데이 할인', discountPrice: 1_400 },
      ],
    },
    {
      day: 6,
      orderList: [
        { orderItemName: '해산물파스타', orderItemAmount: 2 },
        { orderItemName: '레드와인', orderItemAmount: 1 },
        { orderItemName: '초코케이크', orderItemAmount: 1 },
      ],
      orderTotal: 145_000,
      expectEventList: [
        { eventName: '크리스마스 디데이 할인', discountPrice: 1_500 },
        { eventName: '평일 할인', discountPrice: 2_023 },
        { eventName: '증정 이벤트', discountPrice: 25_000 },
      ],
    },
  ])('기능 테스트', ({ day, orderList, orderTotal, expectEventList }) => {
    const decemberEvent = DecemberEvent.of();
    // when
    const result = decemberEvent.apply(day, orderList, orderTotal);

    // then
    expect(result).toEqual(expectEventList);
  });
});
