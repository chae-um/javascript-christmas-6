# 고려사항 및 이슈

## 1. 컨트롤러에서 타입 변환후 가져오기

이전 미션에서는 도메인 로직에서 원하는 타입으로 변환하고 사용을 하였습니다. node.js에서는 입력 값을 전부 `string` 타입으로 가져오기 때문에 필요한 타입에 맞게 변환을 해줘야합니다. 하지만 이렇게 도메인 로직에서 하게되면 지금 내가 받아오는 값이 `string` 인지 변환된 타입인지 헷갈릴때가 많았습니다. 또한 타입 착각으로 오류가 발생한 적도 종종 있었습니다.

```js
class Lotto {
  /**
   * @private
   * @type {number[]}
   */
  #numbers;

  /**
   * @param {string[]} numbers
   */
  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = Lotto.convertNumber(numbers);
  }
  // ...
}
```

이번미션에서는 아예 controller에서 원하는 타입으로 변경한 후에 도메인 로직으로 가져와서 사용하였습니다. 이렇게 하니 처음에 받아오는 input의 타입은 컨트롤러에서만 신경쓰고 도메인 로직에서는 신경쓸 필요가 없기 때문에 훨씬 유지보수가 쉬워졌습니다.

> ChristmasController.js

```js
async #getDate() {
    try {
      const date = await this.#inputView.readDate();

      return Date.of(Number(date));
    } catch ({ message }) {
      return this.#onError(message, 'date');
    }
  }
```
