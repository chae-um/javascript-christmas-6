import { Console } from '@woowacourse/mission-utils';
import { validateEmptyString } from '../utils/validators/index.js';

const InputView = {
  async readDate() {
    const date = await Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
    );

    validateEmptyString(date);

    return date;
  },
  // ...
};

export default InputView;
