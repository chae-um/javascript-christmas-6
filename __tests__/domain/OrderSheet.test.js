import { EVENT_ERROR_MESSAGE } from '../../src/constants/ChristmasEventMessage.js';
import OrderSheet from '../../src/domain/OrderSheet.js';

describe('OrderSheet 기능 테스트', () => {
  test.each([
    {
      orderList: [
        { orderItemName: '티본스테이크', orderItemAmount: 2 },
        { orderItemName: '초코케이크', orderItemAmount: 3 },
      ],
      expectOrderTotal: 155_000,
    },
    {
      orderList: [
        { orderItemName: '크리스마스파스타', orderItemAmount: 3 },
        { orderItemName: '아이스크림', orderItemAmount: 4 },
      ],
      expectOrderTotal: 95_000,
    },
  ])('기능 테스트', ({ orderList, expectOrderTotal }) => {
    // given
    const orderSheet = OrderSheet.of();

    orderSheet.validate(orderList);

    // when
    const { orderTotal } = orderSheet.order();

    // then
    expect(orderTotal).toBe(expectOrderTotal);
  });
});

describe('OrderSheet 예외 테스트', () => {
  // given
  test.each([
    { orderList: [{ orderItemName: '', orderItemAmount: 1 }] },
    { orderList: [{ orderItemName: 'abc', orderItemAmount: 1 }] },
    { orderList: [{ orderItemName: '없는메뉴에요', orderItemAmount: 1 }] },
  ])('메뉴 이름 예외 테스트', ({ orderList }) => {
    const orderSheet = OrderSheet.of();

    // when & then
    expect(() => orderSheet.validate(orderList)).toThrow(
      EVENT_ERROR_MESSAGE.invalidOrder
    );
  });

  // given
  test.each([
    {
      orderList: [
        { orderItemName: '양송이수프', orderItemAmount: 12 },
        { orderItemName: '티본스테이크', orderItemAmount: 12 },
      ],
    },
    {
      orderList: [
        { orderItemName: '크리크마스파스타', orderItemAmount: 100 },
        { orderItemName: '초코케이크', orderItemAmount: 30 },
      ],
    },
  ])('메뉴 주문 초과 테스트', ({ orderList }) => {
    const orderSheet = OrderSheet.of();

    // when & then
    expect(() => orderSheet.validate(orderList)).toThrow(
      EVENT_ERROR_MESSAGE.invalidOrder
    );
  });

  // given
  test.each([
    {
      orderList: [
        { orderItemName: '양송이수프', orderItemAmount: 1 },
        { orderItemName: '양송이수프', orderItemAmount: 2 },
      ],
    },
    {
      orderList: [
        { orderItemName: '티본스테이크', orderItemAmount: 1 },
        { orderItemName: '티본스테이크', orderItemAmount: 2 },
      ],
    },
  ])('메뉴 입력 중복 테스트', ({ orderList }) => {
    const orderSheet = OrderSheet.of();

    // when & then
    expect(() => orderSheet.validate(orderList)).toThrow(
      EVENT_ERROR_MESSAGE.invalidOrder
    );
  });

  // given
  test.each([
    {
      orderList: [
        { orderItemName: '초코케이크', orderItemAmount: 2 },
        { orderItemName: '아이스크림', orderItemAmount: 2 },
      ],
    },
    {
      orderList: [
        { orderItemName: '아이스크림', orderItemAmount: 3 },
        { orderItemName: '초코케이크', orderItemAmount: 3 },
      ],
    },
  ])('메뉴 주문 예외 테스트', ({ orderList }) => {
    const orderSheet = OrderSheet.of();

    // when & then
    expect(() => orderSheet.validate(orderList)).toThrow(
      EVENT_ERROR_MESSAGE.invalidOrder
    );
  });

  // given
  test.each([
    { orderList: [{ orderItemName: '티본스테이크', orderItemAmount: 0 }] },
    { orderList: [{ orderItemName: '바비큐립', orderItemAmount: 1.1 }] },
    { orderList: [{ orderItemName: '해산물파스타', orderItemAmount: 9999 }] },
  ])('메뉴 수량 예외 테스트', ({ orderList }) => {
    const orderSheet = OrderSheet.of();

    // when & then
    expect(() => orderSheet.validate(orderList)).toThrow(
      EVENT_ERROR_MESSAGE.invalidOrder
    );
  });
});
