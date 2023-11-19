import VisitDate from '../../src/model/VisitDate.js';

describe('VisitDate', () => {
  describe('getDate', () => {
    test('올바른 날짜를 입력하였을 때 getDate()를하면 올바른 날짜 그대로를 리턴해야 한다.', () => {
      // given
      const input = 15;
      const visitDate = new VisitDate(input);

      // when
      // then
      expect(visitDate.getDate()).toBe(input);
    });
  });

  describe('#validate', () => {
    test('숫자가 아닌 값을 입력하였을 때 예외를 발생시키면서 "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요" 을 출력해야한다.', () => {
      // given
      const input = 'invalid';

      // when
      // then
      expect(() => new VisitDate(input)).toThrow(
        '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      );
    });

    test('정수가 아닐 때 예외를 발생시키면서 "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요" 을 출력해야한다.', () => {
      // given
      const input = 2.2;

      // when
      // then
      expect(() => new VisitDate(input)).toThrow(
        '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      );
    });

    test('유효한 방문할 날짜가 아닐 경우 에외를 발생시키면서  "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요" 을 출력해야한다.', () => {
      // given
      const input = 33;

      // when
      // then
      expect(() => new VisitDate(input)).toThrow(
        '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      );
    });
  });

  describe('of', () => {
    test('올바른 인스턴스를 생성해야 합니다.', () => {
      // given
      const input = 5;
      const visitDate = VisitDate.of(input);

      // when
      // then
      expect(visitDate).toBeInstanceOf(VisitDate);
    });
  });

  describe('isChristmasDDayDiscount', () => {
    test.each([
      { input: 13, expected: true },
      { input: 1, expected: true },
      { input: 26, expected: false },
      { input: 31, expected: false },
    ])(
      '1~25일이면 크리스마스 디데이 할일이 적용이되어 true 이외라면 false를 리턴해야 합니다.',
      ({ input, expected }) => {
        expect(VisitDate.of(input).isChristmasDDayDiscount()).toBe(expected);
      },
    );
  });
  describe('isWeekdays', () => {
    test.each([
      { input: 13, expected: true },
      { input: 15, expected: false },
    ])('평일 이면 true 주말이면 false를 리턴해야 한다.', ({ input, expected }) => {
      expect(VisitDate.of(input).isWeekdays()).toBe(expected);
    });
  });

  describe('isSpecialDiscount', () => {
    test.each([
      { input: 10, expected: true },
      { input: 25, expected: true },
      { input: 12, expected: false },
    ])(
      '특별 할인에 해당되는 날이면 true 아니면 false를 반환해야 합니다.',
      ({ input, expected }) => {
        expect(VisitDate.of(input).isSpecialDiscount()).toBe(expected);
      },
    );
  });
});
