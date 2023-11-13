import ChristmasController from './controller/index.js';
import OutputView from './view/OutputView.js';
import InputView from './view/InputView.js';

class App {
  async run() {
    await new ChristmasController(InputView, OutputView).run();
  }
}

export default App;
