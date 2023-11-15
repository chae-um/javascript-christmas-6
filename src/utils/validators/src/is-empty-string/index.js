import SYMBOL from '../../../../constants/Symbol.js';

/**
 * @param {string} input
 * @returns {boolean}
 */
export default function isEmptyString(input) {
  return input.trim() === SYMBOL.emptyString;
}
