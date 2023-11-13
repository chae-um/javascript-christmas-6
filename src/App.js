import ChristmasController from './controller/index.js';

class App {
  async run() {
    const christmasController = new ChristmasController();

    await christmasController.run();
  }
}

export default App;
