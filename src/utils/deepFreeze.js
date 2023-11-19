/**
 * @param {object} target - 동결시킬 객체
 * @returns {object} 깊은 동결된 객체
 */
const deepFreeze = (target) => {
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    Object.keys(target).forEach((key) => deepFreeze(target[key]));
  }

  return target;
};

export default deepFreeze;
