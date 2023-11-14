import ValidationError from './ValidationError.js';

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
