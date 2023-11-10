import InputView from '../view/InputView.js';

class ChristmasController {
  async run() {
    const date = await InputView.readDate();
 
  }
}

export default ChristmasController;
