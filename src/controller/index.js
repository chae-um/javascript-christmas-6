import Day from '../model/Day.js';
import UserRequestedMenus from '../model/UserRequestedMenus.js';

class ChristmasController {
  #model;

  #inputView;

  #outputView;

  constructor(inputView, outputView, christmasModel) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#model = christmasModel;
  }

  async run() {
    const order = await this.#receiveOrder();

    this.#printBenefitsContent(order);
  }

  async #receiveOrder() {
    const day = await this.#handleError(() => this.#getDate());
    const userRequestedMenus = await this.#handleError(() => this.#getUserRequestedMenus());

    return { day, userRequestedMenus };
  }

  async #handleError(callback) {
    try {
      return await callback();
    } catch ({ message }) {
      this.#outputView.print(message);

      return this.#handleError(callback);
    }
  }

  async #getDate() {
    const day = await this.#inputView.readDate();

    return Day.of(Number(day));
  }

  async #getUserRequestedMenus() {
    const userRequestedMenus = await this.#inputView.readUserRequestedMenus();

    return UserRequestedMenus.of(userRequestedMenus);
  }

  #printBenefitsContent({ day, userRequestedMenus }) {
    this.#setData(day, userRequestedMenus);
    this.#print(userRequestedMenus);
  }

  #setData(day, userRequestedMenus) {
    this.#model = new this.#model(day, userRequestedMenus);
  }

  #print(userRequestedMenus) {
    this.#outputView.printOrderedMenu(userRequestedMenus.getUserRequestedMenus());
    this.#outputView.printOriginalOrderTotal(userRequestedMenus.getTotalMenuPrice());
    this.#outputView.printGiftMenu(userRequestedMenus.isGiftMenuAvailable());
    this.#outputView.printDiscount(this.#model.calculateDiscount());
    this.#outputView.printBenefitsContent(this.#model.getBenefitsAmount());
    this.#outputView.printDiscountedTotalMenuPrice(this.#model.getDiscountedTotalMenuPrice());
    this.#outputView.printEventBadge(this.#model.getEventBadge());
  }
}

export default ChristmasController;
