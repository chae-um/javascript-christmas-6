/**
 * @param {string}input
 * @param {number} start
 * @param {number} end
 * @returns {boolean}
 */
export default function isValidCount(input, start = 1, end = 20) {
  return Number(input) >= start && Number(input) <= end;
}
