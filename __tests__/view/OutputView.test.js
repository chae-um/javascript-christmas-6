import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import OutputView from '../../src/view/OutputView.js';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};
describe('OutputView', () => {
  describe('printStart', () => {
    test('printStart 는 "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다."를 출력해야한다.', () => {
      // given
      const logSpy = getLogSpy();

      // when
      OutputView.printStart();

      // then
      const expected = ['안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.'];

      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printCautions', () => {
    test('주어진 주의사항을 모두 출력해야 한다. ', () => {
      // given
      const logSpy = getLogSpy();

      // when
      OutputView.printCautions();

      // then
      const expected = [
        '[이벤트 주의 사항]',
        '총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.',
        '음료만 주문 시, 주문할 수 없습니다.',
        '메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.',
      ];

      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printOrderedMenu', () => {
    test('고객이 주문한 메뉴를 알맞은 포맷에 맞게 출력해야한다.', () => {
      // given
      const logSpy = getLogSpy();
      const input = [
        ['티본스테이크', 2],
        ['크리스마스파스타', 3],
        ['제로콜라', 5],
        ['아이스크림', 1],
      ];
      const userRequestedMenus = new Map(input);

      // when
      OutputView.printOrderedMenu(userRequestedMenus);

      // then
      const expected = [
        '티본스테이크 2개',
        '크리스마스파스타 3개',
        '제로콜라 5개',
        '아이스크림 1개',
      ];

      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printOriginalOrderTotal', () => {
    test('할인 전 총주문 금액을 포맷에 맞게 출력해야한다. ', () => {
      // given
      const logSpy = getLogSpy();
      const input = 112_000;

      // when
      OutputView.printOriginalOrderTotal(input);

      // then
      const expected = ['112,000원'];

      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printGiftMenu', () => {
    test('증정 이벤트에 해당되면 "<증정 메뉴>"와 "삼페인 1개"를 출력해야한다.', () => {
      // given
      const logSpy = getLogSpy();
      const input = true;

      // when
      OutputView.printGiftMenu(input);

      // then
      const expected = ['<증정 메뉴>', '샴페인 1개'];

      expectLogContains(getOutput(logSpy), expected);
    });

    test('증정 이벤트에 해당되지 않으면 "<증정 메뉴>"와 "없음"을 출력해야 한다.', () => {
      // given
      const logSpy = getLogSpy();
      const input = false;

      // when
      OutputView.printGiftMenu(input);

      // then
      const expected = ['<증정 메뉴>', '없음'];

      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printDiscountData', () => {
    test.each([
      {
        input: {
          dDayDiscount: 2400,
          giftDiscount: 25000,
          specialDiscount: 0,
          weeklyDiscount: { amount: 6069, weekly: '주말 할인' },
        },
        expected: [
          '크리스마스 디데이 할인: -2,400원',
          '주말 할인: -6,069원',
          '증정 이벤트: -25,000원',
        ],
      },
      {
        input: {
          dDayDiscount: 0,
          giftDiscount: 25000,
          specialDiscount: 0,
          weeklyDiscount: { amount: 6069, weekly: '주말 할인' },
        },
        expected: ['주말 할인: -6,069원', '증정 이벤트: -25,000원'],
      },
      {
        input: {
          dDayDiscount: 0,
          giftDiscount: 25000,
          specialDiscount: 0,
          weeklyDiscount: { amount: 0, weekly: '평일 할인' },
        },
        expected: ['증정 이벤트: -25,000원'],
      },
      {
        input: {
          dDayDiscount: 0,
          giftDiscount: 0,
          specialDiscount: 0,
          weeklyDiscount: { amount: 0, weekly: '평일 할인' },
        },
        expected: [''],
      },
    ])('주어진 discountData에 따라 결과를 출력해야 한다.', ({ input, expected }) => {
      // given
      const logSpy = jest.spyOn(console, 'log');

      // when
      OutputView.printDiscountData(input);

      // then
      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printBenefitsContent', () => {
    test('총혜택 금액이 존재하면 "-" 부호를 붙여서 출력해야 한다.', () => {
      // given
      const logSpy = getLogSpy();
      const input = 33_000;

      // when
      OutputView.printBenefitsContent(input);

      // then
      const expected = ['<총혜택 금액>', '-33,000원'];

      expectLogContains(getOutput(logSpy), expected);
    });

    test('총혜택 금액이 존재하지 않으면  "-" 부호 없이 "0원"을 출력해야 한다.', () => {
      // given
      const logSpy = getLogSpy();
      const input = 0;

      // when
      OutputView.printBenefitsContent(input);

      // then
      const expected = ['<총혜택 금액>', '0원'];

      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printDiscountedTotalMenuPrice', () => {
    test('할인 후 예상 결제금액이 알맞은 포맷(1300 이라면  1,300원)으로 출력해야한다.', () => {
      // given
      const logSpy = getLogSpy();
      const input = 134_754;

      // when
      OutputView.printDiscountedTotalMenuPrice(input);

      // then
      const expected = ['<할인 후 예상 결제 금액>', '134,754원'];

      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printEventBadge', () => {
    test('이벤트 배지를 출력해야한다. ', () => {
      // given
      const logSpy = getLogSpy();
      const input = '산타';

      // when
      OutputView.printEventBadge(input);

      // then
      const expected = ['<12월 이벤트 배지>', '산타'];

      expectLogContains(getOutput(logSpy), expected);
    });
  });
});
