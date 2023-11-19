import { WEEK } from '../../src/constants/Calendar.js';
import isWeekend from '../../src/utils/isWeekend.js';

describe('isWeekend 유틸 테스트', () => {
  // given
  test.each([
    { day: 1, expectResult: WEEK.weekend },
    { day: 3, expectResult: WEEK.weekday },
    { day: 17, expectResult: WEEK.weekday },
  ])('주말/평일 여부 테스트', ({ day, expectResult }) => {
    // when
    const check = isWeekend(day);

    // then
    expect(check).toBe(expectResult);
  });
});
