import ChristmasModel from '../model/index.js';
import InputView from '../view/InputView.js';

class ChristmasController {
  #model;

  #inputView;

  constructor() {
    this.#model = new ChristmasModel();
    this.#inputView = InputView;
  }

  async run() {
    const date = await this.#readDate();

    this.#model.validateDate(date);
  }

  async #readDate() {
    const date = await this.#inputView.readDate();

    return Number(date);
  }
}

export default ChristmasController;
