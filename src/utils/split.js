import { SYMBOL } from '../constants/Symbol.js';
import { handleTypeError } from './error/index.js';

/**
 * @param {string} string
 * @param {string} delimiter
 * @returns {string[]}
 */
export default function split(string, delimiter) {
  if (typeof string !== 'string') {
    handleTypeError('string만 입력이 가능합니다.');
  }

  if (delimiter === SYMBOL.emptyString) {
    return [...string];
  }

  return string.split(delimiter);
}
