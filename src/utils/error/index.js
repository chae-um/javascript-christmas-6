import ValidationError from './ValidationError.js';
import TypeError from './typeError.js';

/**
 * @param {string} message
 * @throws {ValidationError}
 */
export function handleValidationError(message) {
  throw new ValidationError(message);
}

/**
 * @param {string} message
 * @throws {ValidationError}
 */
export function handleTypeError(message) {
  throw new TypeError(message);
}
