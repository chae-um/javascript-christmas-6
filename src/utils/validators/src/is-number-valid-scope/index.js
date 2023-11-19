/**
 * @param {number} input
 * @param {number} start
 * @param {number} end
 * @returns {boolean}
 */
export default function isNumberValidScope(input, start = 1, end = 31) {
  return input >= start && input <= end;
}
