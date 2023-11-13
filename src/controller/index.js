import Day from '../model/Day.js';
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

    this.#printBenefitsContent(order);
  }

  async #receiveOrder() {
    const day = await this.#getDate();
    const userRequestedMenus = await this.#getUserRequestedMenus();

    return { day, userRequestedMenus };
  }

  async #getDate() {
    try {
      const day = await this.#inputView.readDate();

      return Day.of(Number(day));
    } catch ({ message }) {
      return this.#onError(message, 'date');
    }
  }

  async #getUserRequestedMenus() {
    try {
      const userRequestedMenus = await this.#inputView.readUserRequestedMenus();

      return UserRequestedMenus.of(userRequestedMenus);
    } catch ({ message }) {
      return this.#onError(message);
    }
  }

  #onError(message, process) {
    this.#outputView.print(message);

    if (process === 'date') {
      return this.#getDate();
    }

    return this.#getUserRequestedMenus();
  }

  #printBenefitsContent({ day, userRequestedMenus }) {
    this.#outputView.printOrderedMenu(userRequestedMenus.getUserRequestedMenus());
    this.#outputView.printOriginalOrderTotal(userRequestedMenus.getTotalMenuPrice());
    this.#outputView.printGiftMenu(userRequestedMenus.isGiftMenuAvailable());
    this.#model.calculateDiscount(day, userRequestedMenus);
  }
}

export default ChristmasController;
