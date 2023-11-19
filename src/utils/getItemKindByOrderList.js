/**
 * @param {import('../utils/JSDocs.js').orderList} orderList - 주문 목록
 * @param {import('../utils/JSDocs.js').category} category - 선택된 카테고리
 * @returns {number} 선택된 카테고리에 해당하는 메뉴 개수
 */
const getItemKindByOrderList = (orderList, category) =>
  orderList.reduce((acc, { orderItemName, orderItemAmount }) => {
    const find = category.find((item) => item.name === orderItemName);

    if (find) {
      return acc + orderItemAmount;
    }
    return acc;
  }, 0);

export default getItemKindByOrderList;
