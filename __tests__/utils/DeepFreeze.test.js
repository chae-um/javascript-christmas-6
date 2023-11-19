import deepFreeze from '../../src/utils/deepFreeze.js';

describe('deepFreeze 유틸 테스트', () => {
  // given
  test.each([{ object: [[1], [2], [3]] }, { object: [[2], [3], [4]] }])(
    'deepFreeze 동결 테스트',
    ({ object }) => {
      const freezedObject = deepFreeze(object);

      // when & then
      expect(() => freezedObject[0].push(1)).toThrow();
    }
  );
});
