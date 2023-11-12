import Date from '../model/Date.js';
import UserRequestedMenus from '../model/UserRequestedMenus.js';
import ChristmasModel from '../model/index.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class ChristmasController {
  #model;

  #inputView;

  #outputView;

  constructor() {
    this.#model = new ChristmasModel();
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async run() {
    const order = await this.#receiveOrder();
  }

  async #receiveOrder() {
    const date = await this.#getDate();
    const userRequestedMenus = await this.#getUserRequestedMenus();

    return { date, userRequestedMenus };
  }

  async #getDate() {
    try {
      const date = await this.#inputView.readDate();

      return Date.of(Number(date));
    } catch ({ message }) {
      return this.#onError(message, 'date');
    }
  }

  async #getUserRequestedMenus() {
    try {
      const userRequestedMenus = await this.#inputView.readUserRequestedMenus();

      return UserRequestedMenus.of(userRequestedMenus);
    } catch ({ message }) {
      return this.#onError(message, 'menus');
    }
  }

  async #onError(message, process) {
    this.#outputView.print(message);

    if (process === 'date') {
      await this.#getDate();
    }

    if (process === 'menus') {
      await this.#getUserRequestedMenus();
    }
  }
}

export default ChristmasController;
