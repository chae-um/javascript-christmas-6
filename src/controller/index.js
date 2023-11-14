import UserRequestedMenus from '../model/UserRequestedMenus.js';
import VisitDate from '../model/VisitDate.js';

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
    const visitDate = await this.#handleError(() => this.#getDate());
    const userRequestedMenus = await this.#handleError(() => this.#getUserRequestedMenus());

    return { visitDate, userRequestedMenus };
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
    this.#printStart();

    const date = await this.#inputView.readDate();

    return VisitDate.of(Number(date));
  }

  async #getUserRequestedMenus() {
    this.#printCautions();

    const userRequestedMenus = await this.#inputView.readUserRequestedMenus();

    return UserRequestedMenus.of(userRequestedMenus);
  }

  #printBenefitsContent({ visitDate, userRequestedMenus }) {
    this.#setData(visitDate, userRequestedMenus);
    this.#print(userRequestedMenus);
  }

  #setData(visitDate, userRequestedMenus) {
    this.#model = new this.#model(visitDate, userRequestedMenus);
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

  #printStart() {
    this.#outputView.printStart();
  }

  #printCautions() {
    this.#outputView.printCautions();
  }
}

export default ChristmasController;
