import split from '../../src/utils/split.js';

test.each([
  { input: 'apple,orange,banana', secondInput: ',', expected: ['apple', 'orange', 'banana'] },
  { input: '스테이크-3', secondInput: '-', expected: ['스테이크', '3'] },
  { input: '', secondInput: ',', expected: [''] },
  { input: '', secondInput: '', expected: [] },
  { input: 'I💖U', secondInput: '', expected: ['I', '💖', 'U'] },
])(
  'string이 주어졌을 때 구분자로 문자열을 나누어 배열로 반환해야 한다',
  ({ input, secondInput, expected }) => {
    expect(split(input, secondInput)).toEqual(expected);
  },
);

test.each([
  { input: [1, 2, 3], secondInput: ',' },
  { input: { hi: 23, hello: 33 }, secondInput: '' },
  { input: 3000, secondInput: ',' },
  { input: true, secondInput: '-' },
])('string이 아닌 다른 값이 주어졌을 때 예외를 발생시켜야 한다', ({ input, secondInput }) => {
  expect(() => split(input, secondInput)).toThrow('[ERROR]');
});
