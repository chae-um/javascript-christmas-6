import getItemInformationByItemName from '../../src/utils/getItemInformationByItemName.js';

describe('getItemInformationByItemName 유틸 테스트', () => {
  // given
  test.each([
    { targetItemName: '티본스테이크', expectItemPrice: 55_000 },
    { targetItemName: '바비큐립', expectItemPrice: 54_000 },
    { targetItemName: '초코케이크', expectItemPrice: 15_000 },
  ])('탐색 테스트', ({ targetItemName, expectItemPrice }) => {
    // when
    const { price } = getItemInformationByItemName(targetItemName);

    // then
    expect(price).toBe(expectItemPrice);
  });
});
