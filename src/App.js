import ChristmasController from './controller/index.js';
import OutputView from './view/OutputView.js';
import InputView from './view/InputView.js';
import ChristmasModel from './model/index.js';

class App {
  async run() {
    await new ChristmasController(InputView, OutputView, ChristmasModel).run();
  }
}

export default App;
