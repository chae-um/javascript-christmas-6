import { DISH_CATEGORY } from '../constants/Dish.js';

/**
 * @param {string} targetItemName - 찾을 메뉴 이름
 * @returns {import('../utils/JSDocs.js').menu} - 찾은 메뉴 정보
 */
const getItemInformationByItemName = (targetItemName) => {
  let itemInformation;

  DISH_CATEGORY.forEach((category) => {
    const find = category.find((item) => item.name === targetItemName);

    if (find) {
      itemInformation = find;
    }
  });

  return itemInformation || 0;
};

export default getItemInformationByItemName;
