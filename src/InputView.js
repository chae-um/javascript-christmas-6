import { Console } from '@woowacourse/mission-utils';
import { EVENT_INPUT_NOTIFICATION_MESSAGE } from './constants/ChristmasEventMessage.js';

const InputView = Object.freeze({
  /**
   * @param {string} message - 입력 문구
   * @returns {promise<string>} 입력 데이터
   */
  readLine: (message) => Console.readLineAsync(message),

  /**
   * @returns {promise<string>} 입력된 방문 날짜
   */
  readVisitDay: () =>
    InputView.readLine(EVENT_INPUT_NOTIFICATION_MESSAGE.enterVisitDay),

  /**
   * @returns {promise<string>} 입력된 주문 목록
   */
  readOrder: () =>
    InputView.readLine(EVENT_INPUT_NOTIFICATION_MESSAGE.enterOrder),
});

export default InputView;
