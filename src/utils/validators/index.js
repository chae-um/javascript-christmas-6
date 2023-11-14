import { ERROR_MESSAGE } from '../../constants/Messages.js';

import { handleValidationError } from '../error/index.js';
import isEmptyString from './src/is-empty-string/index.js';

export { default as isEmptyString } from './src/is-empty-string/index.js';
export { default as isNan } from './src/is-nan/index.js';
export { default as isInteger } from './src/is-integer/index.js';
export { default as isNumberValidScope } from './src/is-number-valid-scope/index.js';
export { default as isValidCount } from './src/is-valid-count/index.js';
export { default as isValidFormatter } from './src/is-valid-formatter/index.js';

/**
 * @param {string} input
 */
export function validateEmptyString(input) {
  if (isEmptyString(input)) {
    handleValidationError(ERROR_MESSAGE.emptyString);
  }
}
