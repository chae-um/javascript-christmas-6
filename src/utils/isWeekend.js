import { DAY, WEEK } from '../constants/Calendar.js';

/**
 * @param {number} day - 방문 날짜
 * @returns {import('../utils/JSDocs.js').check} 평일/주말 여부
 */
const isWeekend = (day) => {
  const selectedDayOfTheWeek = DAY.dayOfTheWeek[day % DAY.amount];

  if (DAY.weekend.includes(selectedDayOfTheWeek)) {
    return WEEK.weekend;
  }

  return WEEK.weekday;
};

export default isWeekend;
