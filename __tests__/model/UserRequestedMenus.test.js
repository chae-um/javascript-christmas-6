import UserRequestedMenus from '../../src/model/UserRequestedMenus.js';

describe('UserRequestedMenus', () => {
  // 각 테스트에 이유를 명확히 드러내기위해 test.each를 사용하지 않았습니다.

  test('올바른 인스턴스를 생성해야 합니다.', () => {
    // given
    const input = '양송이수프-2,타파스-1';

    // when
    // then
    const userRequestedMenus = new UserRequestedMenus(input);
    expect(userRequestedMenus).toBeInstanceOf(UserRequestedMenus);
  });
  describe('validate', () => {
    test('하나의 메뉴만 입력해도 예외가 발생하지 않아야 합니다.', () => {
      // given
      const input = '양송이수프-2';

      // when
      // then
      expect(() => new UserRequestedMenus(input)).not.toThrow();
    });
    test('메뉴 형식에 맞지 않은 주문시 예외를 발생해야 합니다.', () => {
      // given
      const input = '양송이수프2,타파스-1';

      // when
      // then
      expect(() => new UserRequestedMenus(input)).toThrow('[ERROR]');
    });

    test('하나의 메뉴를 20개를 초과하여 주문시 예외가 발생해야 합니다.', () => {
      // given
      const input = '양송이수프-21,타파스-1';

      // when
      // then
      expect(() => new UserRequestedMenus(input)).toThrow(
        '유효하지 않은 주문입니다. 다시 입력해 주세요.',
      );
    });

    test('메뉴에 없는 메뉴를 주문시 예외가 발생해야 합니다.', () => {
      // given
      const input = '제육볶음-3,돈가스-3';

      // when
      // then
      expect(() => new UserRequestedMenus(input)).toThrow(
        '유효하지 않은 주문입니다. 다시 입력해 주세요.',
      );
    });

    test('중복되는 메뉴를 주문시 예외가 발생해야합니다.', () => {
      // given
      const input = '양송이수프-5,타파스-1,양송이수프-2';

      // when
      // then
      expect(() => new UserRequestedMenus(input)).toThrow(
        '유효하지 않은 주문입니다. 다시 입력해 주세요.',
      );
    });

    test('총 메뉴의 개수가 20개를 초과한다면 예외를 발생해야 합니다.', () => {
      // given
      const input = '양송이수프-5,타파스-16';

      // when
      // then
      expect(() => new UserRequestedMenus(input)).toThrow(
        '메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.',
      );
    });

    test('음료만 주문시 예외를 발생해야 합니다.', () => {
      // given
      const input = '제로콜라-5,레드와인-6,샴페인-3';

      // when
      // then
      expect(() => new UserRequestedMenus(input)).toThrow('음료만 주문 시, 주문할 수 없습니다.');
    });
  });

  describe('getDesertQuantity', () => {
    test.each([
      { input: '초코케이크-3,아이스크림-4', expected: 7 },
      { input: '초코케이크-1,티본스테이크-3,아이스크림-2', expected: 3 },
    ])('주문한 디저트 개수의 총합을 리턴해야합니다.', ({ input, expected }) => {
      expect(UserRequestedMenus.of(input).getDesertQuantity()).toBe(expected);
    });
  });

  describe('getMainQuantity', () => {
    test.each([
      {
        input: '티본스테이크-3,해산물파스타-2,크리스마스파스타-4,초코케이크-3,제로콜라-2',
        expected: 9,
      },
      {
        input: '바비큐립-5,해산물파스타-2,타파스-3,양송이수프-2',
        expected: 7,
      },
      {
        input: '크리스마스파스타-2,시저샐러드-1,레드와인-3',
        expected: 2,
      },
      {
        input: '타파스-3,초코케이크-2,양송이수프-2',
        expected: 0,
      },
    ])(
      '고객이 주문한 메뉴들중에 메인 메뉴의 개수만 계산해서 리턴 해야한다. ',
      ({ input, expected }) => {
        expect(UserRequestedMenus.of(input).getMainQuantity()).toBe(expected);
      },
    );
  });

  describe('canDiscount', () => {
    test.each([
      { input: '초코케이크-1,티본스테이크-3,아이스크림-2', expected: true },
      { input: '타파스-1,제로콜라-1', expected: false },
    ])(
      '총주문 금액이 10,000원 이상이면 true를 이하이면 false를 리턴해야합니다',
      ({ input, expected }) => {
        expect(UserRequestedMenus.of(input).canDiscount()).toBe(expected);
      },
    );
  });

  describe('isGiftMenuAvailable', () => {
    test.each([
      { input: '티본스테이크-2,해산물파스타-3,제로콜라-3', expected: true },
      { input: '해산물파스타-2,크리스마스파스타-1,초코케이크-1', expected: false },
    ])(
      '총주문 금액이 12만원이 넘으면 true 넘지 못하면 false를 리턴해야합니다',
      ({ input, expected }) => {
        expect(UserRequestedMenus.of(input).isGiftMenuAvailable()).toBe(expected);
      },
    );
  });
});
