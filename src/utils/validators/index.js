import { ERROR_MESSAGE } from '../../constants/Messages.js';
import handleValidationError from '../error/index.js';
import isEmptyString from './src/is-empty-string/index.js';

export { default as isEmptyString } from './src/is-empty-string/index.js';

/**
 * @param {string} input
 */
export function validateEmptyString(input) {
  if (isEmptyString(input)) {
    handleValidationError(ERROR_MESSAGE.emptyString);
  }
}
