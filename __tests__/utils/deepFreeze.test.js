// deepFreeze 함수를 가져옵니다.

import deepFreeze from '../../src/utils/deepFreeze.js';

describe('deepFreeze', () => {
  test('단일 객체를 얼려야 합니다.', () => {
    // given
    const obj = {
      prop1: 'A',
      prop2: 'B',
    };
    const frozenObj = deepFreeze(obj);

    // when
    const attemptToChange = () => {
      frozenObj.prop1 = 'new value';
    };

    // then
    expect(attemptToChange).toThrow(TypeError);
    expect(frozenObj.prop1).toBe('A');
  });

  test('중첩 객체를 얼려야 합니다.', () => {
    // given
    const nestedObj = {
      prop1: 'A',
      nestedProp: {
        prop2: 'B',
      },
    };
    const frozenNestedObj = deepFreeze(nestedObj);

    // when
    const attemptToChange = () => {
      frozenNestedObj.nestedProp.prop2 = 'C';
    };

    // then
    expect(attemptToChange).toThrow(TypeError);
    expect(frozenNestedObj.nestedProp.prop2).toBe('B');
  });
});
