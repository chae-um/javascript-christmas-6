/**
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#%EC%98%88%EC%A0%9C
 * @param {object} object
 * @returns {object}
 */
export default function deepFreeze(object) {
  Object.keys(object).forEach((key) => {
    const value = object[key];

    if (typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  return Object.freeze(object);
}
