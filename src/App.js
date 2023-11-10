import ChristmasController from './controller/index.js';

class App {
  async run() {
    const christmasController = new ChristmasController();

    christmasController.run();
  }
}

export default App;
