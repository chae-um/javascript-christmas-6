class DefaultError extends Error {
  /**
   * @static
   * @type {string}
   */
  static prefix = '[ERROR]';

  /**
   * @param {string} message
   */
  constructor(message) {
    super(`${DefaultError.prefix} ${message}`);
    this.name = this.constructor.name;
  }
}

export default DefaultError;
