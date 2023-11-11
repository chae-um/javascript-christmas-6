/**
 * @param {string} input
 * @returns {boolean}
 */
export default function isValidFormatter(input) {
  const korean = '(?=.*[가-힣])';
  const delimiter = '(?=.*[-])';
  const number = '(?=.*[0-9])';

  const regExp = new RegExp(`^${korean}${delimiter}${number}.*$`, 'g');

  return regExp.test(input);
}
