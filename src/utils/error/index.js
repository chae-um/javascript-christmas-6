import CustomTypeError from './CustomTypeError.js';
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
 * @throws {CustomTypeError}
 */
export function handleTypeError(message) {
  throw new CustomTypeError(message);
}
