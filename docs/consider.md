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

## 2. 잘못된 설계

고객이 원하는 메뉴와 개수의 유효성을 확인하는 메서드를 만드는 시간이 정말 오래 걸렸습니다.

가장 큰 원인은 잘못된 설계와 기존의 구현방식 스타일에 끼워 맞출려고 시도해서 그런 것 같습니다.

```
📦validators
 ┣ 📂src
 ┃ ┣ 📂is-empty-string
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜index.test.js
 ┃ ┣ 📂is-integer
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜index.test.js
 ┃ ┣ 📂is-nan
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜index.test.js
 ┃ ┣ 📂is-number-valid-scope
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜index.test.js
 ┃ ┣ 📂is-valid-count
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜index.test.js
 ┃ ┗ 📂is-valid-formatter
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜index.test.js
 ┗ 📜index.js
```

원래는 위와 같이 전부 테스트까지 마치고 적용을 시키는데 이번에는 단순 유효성 체크가 아니라 메뉴 주문 개수가 총 20개가 초과할 경우나 음료만 주문하였을 경우등 여러개의 메뉴를 주문했을 때 한 번 전체 순회해야하는 경우도 발생하기에 아예 처음 구현할 때 부터 하나의 파일에 전부 구현하고 나중에 리팩터링을 한 번에 하는 것도 좋다고 생각했습니다. 아니면 빈문자열이나, 특정 문자가 포함되어있는지 정수인지등 간단한 유효성 체크만 따로 분류해서 만든다음 나머지는 지금처럼 일단 구현먼저 하고 리팩터링 하는 식으로 구현해야 할 것 같습니다. 예를 들어 기능목록에 `[예외] 숫자 외의 문자가 포함되었을 경우 (유틸로 만들기)` 이런식으로 작성해서 한눈에 들어오게 한다면 더 좋을 것 같습니다.
아래 코드는 유틸로 만들 수 있는 부분만 만들고 나머지는 구현에만 집중한 코드입니다. (추후 리팩터링 예정)

```js
class UserRequestedMenus {
  #userRequestedMenus;

  constructor(userRequestedMenus) {
    this.#validate(userRequestedMenus);
    this.#userRequestedMenus = userRequestedMenus;
  }

  #validate(userRequestedMenus) {
    let menuCount = 0;
    const userMenus = [];
    userRequestedMenus.split(',').forEach((userRequestedMenu) => {
      if (!isValidFormatter(userRequestedMenu)) {
        handleValidationError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
      }
      const [menu, quantity] = userRequestedMenu.split('-');

      this.#validateMenu(menu, quantity);
      menuCount += Number(quantity);
      userMenus.push(menu);
    });
    this.#validateMenus(menuCount, userMenus);
  }

  // eslint-disable-next-line class-methods-use-this
  #validateMenu(menu, quantity) {
    if (!isValidCount(quantity)) {
      handleValidationError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
    if (!Object.keys(MENUS).includes(menu)) {
      handleValidationError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #validateMenus(menuCount, userMenus) {
    if (menuCount > 20) {
      handleValidationError('메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.');
    }
    if (userMenus.length !== new Set(userMenus).size) {
      handleValidationError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }

    if (userMenus.every((userMenu) => BEVERAGE_MENUS.includes(userMenu))) {
      handleValidationError('음료만 주문 시, 주문할 수 없습니다.');
    }
  }

  static of(userRequestedMenus) {
    return new UserRequestedMenus(userRequestedMenus);
  }
}
```
