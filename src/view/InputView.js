import { Console } from '@woowacourse/mission-utils';
import { validateEmptyString } from '../utils/validators/index.js';
import { INPUT_MESSAGE, INPUT_MESSAGE_FUNCTION } from '../constants/Messages.js';
import { EVENT_DATE } from '../constants/System.js';

const InputView = {
  async readDate() {
    const date = await Console.readLineAsync(INPUT_MESSAGE_FUNCTION.date(EVENT_DATE.month));

    validateEmptyString(date);

    return date;
  },

  async readUserRequestedMenus() {
    const userRequestedMenus = await Console.readLineAsync(INPUT_MESSAGE.menu);

    validateEmptyString(userRequestedMenus);

    return userRequestedMenus;
  },
};

export default InputView;
