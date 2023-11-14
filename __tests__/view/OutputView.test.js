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

      const expected = [
        '[이벤트 주의 사항]',
        '총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.',
        '음료만 주문 시, 주문할 수 없습니다.',
        '메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.',
      ];

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
});
