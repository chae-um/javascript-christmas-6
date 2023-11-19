import { DESSERT, MAIN_DISH } from '../../src/constants/Dish.js';
import getItemKindByOrderList from '../../src/utils/getItemKindByOrderList.js';

describe('getItemKindByOrderList 유틸 테스트', () => {
  // given
  test.each([
    {
      orderList: [
        { orderItemName: '티본스테이크', orderItemAmount: 2 },
        { orderItemName: '바비큐립', orderItemAmount: 2 },
        { orderItemName: '초코케이크', orderItemAmount: 3 },
      ],
      category: MAIN_DISH,
      expectAmount: 4,
    },
    {
      orderList: [
        { orderItemName: '티본스테이크', orderItemAmount: 2 },
        { orderItemName: '바비큐립', orderItemAmount: 2 },
        { orderItemName: '초코케이크', orderItemAmount: 3 },
      ],
      category: DESSERT,
      expectAmount: 3,
    },
  ])('탐색 테스트', ({ orderList, category, expectAmount }) => {
    // when
    const result = getItemKindByOrderList(orderList, category);

    // then
    expect(result).toBe(expectAmount);
  });
});
