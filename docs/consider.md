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

## 3. 구현후

### (1) 테스트 코드

이 정도 난이도는 아직 TDD가 불가능한 것 같다. 기능 목록을 생각하고 구현에만 초점을 맞췄음에도 불구하도 정말 수십번 코드를 변경했다. 그렇기에 간단한 로직만 테스트 코드를 만들고 규모가 있는 것은 수동으로 테스트했다. 어느정도 머릿속에 확립이되면 테스트코드를 같이 작성할 수 있겠지만 정말 구조가 계속 바뀌었다. 처음에는 `ChristmasModel`에서 구현하면 되겠지 했다가 `Day`로 옮겼다가 다시 `Discount`로 옮겼다. 그러다 중간에 로직 변경이 필요해서 `UserRequestedMenus`로 다시 옮겼다. 이처럼 아직 초보단계라서 처음 기능목록을 작성할 때 완벽한 설계를 할 수가 없다. 그래서 변경점이 많을 것으로 예상되는 곳에는 테스트코드를 작성하지 않고 진행하였다. ([Reference : 테스트 코드가 발목을 잡을 때가 있다.](https://youtu.be/cVxqrGHxutU?t=2580)) 즉 아직 설계를 제대로하는 실력이 되지않아서 그 상태로 테스트코드를 짜면 나중에 변경해야하는 부분들이 많아서 발목을 잡을 수가 있다. 물론 단점도 있다. 직접 수동으로 테스트를 해야하기 때문에 테스트 시간이 더 걸리기는 한다. 하지만 테스트코드를 만들고 테스트하고 설계가 변경되었을 때 지우고 다시만드는 시간보다는 적게든다. 그래서 결론은 작은 단위의 테스트는 하지만 변경점이 많은 부분 설계가 명확하지 않는 부분은 테스토 코드 작성을 보류하였다. 정리하자면 돌아가는 쓰레기를 만들고 리팩터링하기전에 설계를 다시 생각해보고 변경점이 적은 로직부터 테스트 코드를 만들면서 리팩토링하자고 생각하였다.

### (2) 기능 목록은 무조건 필요하다

이번 구현을 하면서 계속 기능목록에 있는대로 구현하려고 노력하였습니다. 물론 중간 중간 예상치 못한 부분은 수정 및 제거를 해주고 추가 커밋으로 구현하기는 했지만 처음에 명확한 구조는 세울 수 없으나 기능목록을 토대로 계속 구현할 수 있었습니다. 다만 처음에 만들 때 너무 막 코딩을 하지말고 어느정도 객체를 나누면서 하자고 생각하였고 실제로 각 객체에 어느정도 책임을 주고 어떤일을 맡길지 고민에 고민을 하느라 시간이 많이 걸렸습니다.

## 4. 작은 실수도 조심

### (1) Date() 객체를 만들어버리다

처음에 아래와 같은 `isWeekdays` 메서드가 존재했습니다. 하지만 진짜 바보처럼 `Date`라는 클래스를 만들어서 고객이 입력한 방문 날짜를 관리하려고 하였으나 나중에 에러가 발생하여 보니 객체 이름같기에 오버라이딩되어 에러가 발생하였습니다. 정말 어이없는 실수지만 조금 더 조심 해야할 것 같습니다.

> 리팩터링 전
> Day.js

```js
isWeekdays(month = 12, year = 2023) {
    const days = ['일', '월', '화', '수', '목'];
    const specificDate = new Date(year, month - 1, this.#date);
    const dayIndex = specificDate.getDay();

    return Boolean(days[dayIndex]);
  }
```

### (2) 불필요한 eslint 규칙

테스트 코드를 작동시키는데 await가 제대로 되지 않았습니다.  
`'require-await': 'error'` 이 규칙을 적용했는데도 알아차리지 못했습니다.

```js
async run() {
    const christmasController = new ChristmasController();

    christmasController.run();
}
```

알고보니 이전부터 `class-methods-use-this` 규칙 때문에 이미 파일이 빨간색으로 표기되어서 알아채지 못했습니다. `airbnb style guide`에는 이렇게 [설명](https://github.com/airbnb/javascript#classes--methods-use-this)되어있습니다. 인스턴스 메서드라는 것은 수신자의 속성에 따라 다르게 동작한다는 것을 나타내야 합니다. 그리고 아래와 같은 예시를 안내해줍니다.

```js
// bad
class Foo {
  bar() {
    console.log('bar');
  }
}

// good - static methods aren't expected to use this
class Foo {
  static bar() {
    console.log('bar');
  }
}
```

처음 `bar()` 메서드는 수신자의 속성에 따라 고정적으로 동작하기때문에 `static`을 사용하는게 맞습니다.

하지만 아래와 같은 경우는 `static`이 필요없는데 규칙에의해 에러표시가 나타납니다.

```js
class Day {
  #date;

  /**
   * @param {number} date
   */
  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  // eslint-disable-next-line
  #validate(date) {
    if (isNan(date)) {
      return handleValidationError('유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
    if (!isInteger(date)) {
      return handleValidationError('유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
    if (!isNumberValidScope(date)) {
      return handleValidationError('유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }
  ...
}
```

위의 validate는 규칙에의해 `this`를 사용하지 않기때문에 `static`을 적용하라고 `eslint`에러가 발생합니다. 하지만 `validate`메서드는 인스턴스의 속성을 검증하는 용로도 사용되고 있습니다. 즉 해당 인스턴스의 속성에 의존하고 있으므로, 인스턴스 메서드로 유지하는 것이 적절합니다. 정적 메서드는 일반적으로 클래스의 인스턴스를 생성하지 않고 클래스 자체에서 호출하거나, 클래스의 상태와 무관한 작업을 수행해야 할 때 정적 메서드를 만드는 것이 적합합니다. 따라서 이 규칙은 `eslint`의 도움보다 제가 스스로 판단해서 사용하기로 결정했습니다.

## 5. 데이터를 꺼내지(get)말고 메시지를 던지도록 구조를 바꿔 데이터를 가지는 객체가 일하도록 한다

이 부분은 저번 로또 부분에서 부터 연습했던 부분이고 이번 크리스마스 미션에서도 적용시켜보았습니다.

데이터를 꺼내서 사용하지않고 최대한 메시지를 던지도록 구조를 바꿔 데이터를 가지는 객체가 일하도록 구현을 하였습니다.

[포비도 이런 말을 하였습니다.](https://tecoble.techcourse.co.kr/post/2020-04-28-ask-instead-of-getter/)  
[영상 링크](https://www.youtube.com/watch?v=bIeqAlmNRrA)

```text
상태를 가지는 객체를 추가했다면 객체가 제대로 된 역할을 하도록 구현해야 한다.
객체가 로직을 구현하도록 해야한다.
상태 데이터를 꺼내 로직을 처리하도록 구현하지 말고 객체에 메시지를 보내 일을 하도록 리팩토링한다.
```

> 리팩터링 전
> Day.js

```js
class Day {
  #date;

  /**
   * @param {number} date
   */
  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  ...

  isChristmasDDayDiscount() {
    return this.#date >= 1 && this.#date <= 25;
  }

  isWeekdays(month = 12, year = 2023) {
    const days = ['일', '월', '화', '수', '목'];
    const specificDate = new Date(year, month - 1, this.#date);
    const dayIndex = specificDate.getDay();

    return Boolean(days[dayIndex]);
  }

  isSpecialDiscount() {
    const specialDay = [3, 10, 17, 24, 25, 31];

    return specialDay.includes(this.#date);
  }

}
```

## 6. 리팩터링 할 때 개선해야할 점

### (1) 에러처리 메서드로 따로 분류

<img width="800" alt="image" src="https://github.com/Ryan-Dia/javascript-christmas-6-Ryan-Dia/assets/76567238/111a230e-ad49-484b-b5d1-cb813178f0c6">

> 이전 미션 코드

```js
  #onError(message, process, arg) {
    LottoController.#printError(message);

    if (process === LOTTO_PROCESS.bonus) {
      return this.#getBonusNumber(arg);
    }

    if (process === LOTTO_PROCESS.winning) {
      return this.#getWinningNumbers();
    }

    return this.#purchaseLotto();
  }
```

저번 레이싱미션 때 이와 같은 피드백을 받았고 다른 분들 코드를 보면서 제가 했던 방식보다. 훨씬 더 가독성이 좋고 미래에 확장된다면 더 관리하기 수월하여 이번 미션에서 에러 핸들링 로직을 저번 미션과 다르게 구현할 생각 입니다.

### (2) JSDoc을 더 잘 활용

<img width="708" alt="image" src="https://github.com/Ryan-Dia/javascript-christmas-6-Ryan-Dia/assets/76567238/3f7ddb8e-8010-4743-ba48-0b87be295b8a">

> 저번 미션 코드

```js

const InputView = {
  /**
   * @async
   * @returns {string}
...
}
```

저번 레이싱 미션에서 `async`를 통한 반환을 `Promise<string>`이 아닌 `string`으로 해서 부정확한 정보를 제공했기에 이번에는 제대로 작성해보고자 합니다. 또한 객체를 return할 때 JSDoc을 통해서 정보를 더 자세하게 줄 예정입니다. 실제로 코드 리뷰하면서 `return`값이나 매개변수가 무엇인지 궁금할 때 JSDoc이 잘 작성되어있으면 빠르게 해당 내용을 인지할 수 있기에 가독성도 올라가는 것을 직접 느꼈기 때문입니다.
