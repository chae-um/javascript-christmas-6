import UserRequestedMenus from '../../src/model/UserRequestedMenus.js';

describe('UserRequestedMenus', () => {
  // Define test cases here

  test('올바른 인스턴스를 생성해야 합니다.', () => {
    const userRequestedMenus = new UserRequestedMenus('양송이수프-2,타파스-1');
    expect(userRequestedMenus).toBeInstanceOf(UserRequestedMenus);
  });

  test('하나의 메뉴만 입력해도 예외가 발생하지 않아야 합니다.', () => {
    expect(() => new UserRequestedMenus('양송이수프-2')).not.toThrow();
  });
  test('메뉴 형식에 맞지 않은 주문시 예외를 발생해야 합니다.', () => {
    expect(() => new UserRequestedMenus('양송이수프2,타파스-1')).toThrow('[ERROR]');
  });

  test('하나의 메뉴를 20개를 초과하여 주문시 예외가 발생해야 합니다.', () => {
    expect(() => new UserRequestedMenus('양송이수프-21,타파스-1')).toThrow(
      '유효하지 않은 주문입니다. 다시 입력해 주세요.',
    );
  });

  test('메뉴에 없는 메뉴를 주문시 예외가 발생해야 합니다.', () => {
    expect(() => new UserRequestedMenus('제육볶음-3,돈가스-3')).toThrow(
      '유효하지 않은 주문입니다. 다시 입력해 주세요.',
    );
  });

  test('중복되는 메뉴를 주문시 예외가 발생해야합니다.', () => {
    expect(() => new UserRequestedMenus('양송이수프-5,타파스-6,양송이수프-3')).toThrow(
      '유효하지 않은 주문입니다. 다시 입력해 주세요.',
    );
  });

  test('총 메뉴의 개수가 20개를 초과한다면 예외를 발생해야 합니다.', () => {
    expect(() => new UserRequestedMenus('양송이수프-5,타파스-16')).toThrow(
      '메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.',
    );
  });

  test('음료만 주문시 예외를 발생해야 합니다.', () => {
    expect(() => new UserRequestedMenus('제로콜라-5,레드와인-6,샴페인-3')).toThrow(
      '음료만 주문 시, 주문할 수 없습니다.',
    );
  });
  // Add more test cases for other scenarios
});
