import EventController from './controller/EventController.js';

export default class App {
  #eventController;

  constructor() {
    this.#eventController = new EventController();
  }

  async run() {
    await this.#eventController.start();
  }
}
