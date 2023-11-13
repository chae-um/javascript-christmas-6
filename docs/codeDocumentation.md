# Code Documentation

## 1. Controller

### (1). View [CH-1]

> 초기 코드

```js
class ChristmasController {
  #model;

  #inputView;

  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  ...
}
```

> 수정된 코드

```js
class ChristmasController {
  #model;

  #inputView;

  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }
```

`Controller`를 구현하면서 `view`를 `controller`내부에서 import하고 클래스 필드를 통해 사용할지 아니면 외부에서 주입을 해줄지 아니면 필드를 사용하지 않고 직접 import하여 사용할지 고민이 있었습니다.  
그러다가 2주차에 미션을 할 때 의존성 주입을 사용해서 InputView와 outputView를 `controller`에 주입해 주었던 것처럼 이번에도 `ChristmasController` 의존성을 주입하기로 하였습니다.

물론 작은 프로젝트나 빠른 프로타입개발에서는 직접 import를 통해 바로 사용하는게 좋을 수 있습니다. 간단하고 빠르게 작성할 수 있고 클래스 필드를 사용하지 않아도 되서 가독성 측면에서도 향상될 수 있습니다. 그럼에도 불구하고 클래스 필드와 의존성 주입을 사용한 이유는 유연성과 테스트 때문입니다. 의존성을 주입한다면 다른 모듈로 대체하기 쉽고 테스트 할때 가짜 객체를 주입하기가 쉽습니다. 예를들어 현재 미션에서 개발팀이 받은 메일에서는 1주일간 테스트를 진행하고 오픈할 예정이라고 되어있다. 따라서 다양한 outputView를 요구할 수 있습니다. 그럴때 코드를 계속 바꾸는 것이아니라 의존성을 주입하기 때문에 OutputView를 여러개 만들고 바로 바로 교체하면서 테스트할 수 있습니다.

## 4. utils

### (1). deepFreeze [UH-1]

함께나누기 글을 보던중 [Object.freeze()는 정말 얼려줄까?](https://velog.io/@brgndy/Object.freeze%EB%8A%94-%EC%A0%95%EB%A7%90-%EC%96%BC%EB%A0%A4%EC%A4%84%EA%B9%8C)라는 글을 읽게 되었고 관련 링크로 넘어가서 [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#%EC%98%88%EC%A0%9C)에 자세하게 설명되어있는 `deepFreeze`에대해서 읽어보았습니다. 사실 객체안에 객체가 있을 때는 이중으로 `Object.freeze()`를 사용했는데 추후 3중이나 중첩 객체가 여러개이면 일일이 하는것도 보통일이 아니라고 생각했습니다. 그래서 블로그와 MDN을 참고하여 `deepFreeze` 객체를 만들었습니다.

```js
/**
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#%EC%98%88%EC%A0%9C
 * @param {object} object
 * @returns {object}
 */
export default function deepFreeze(object) {
  Object.keys(object).forEach((key) => {
    const value = object[key];

    if (typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  return Object.freeze(object);
}
```
