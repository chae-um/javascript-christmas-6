module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:jsdoc/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 규칙 변경

    // ESM 사용으로 인한 파일 확장자 표기 의무화
    // https://github.com/woowacourse-precourse/javascript-racingcar-6/pull/4
    'import/extensions': ['error', 'always', { ignorePackages: true }],

    // static을 사용하지 말하야 하는 곳도 에러 표시됨 따라서 eslint 규칙에 도움 받지 않고 자의적 판단
    // airbnb style guide 설명 : 인스턴스 메서드라는 것은 수신자의 속성에 따라 다르게 동작한다는 것을 나타내야 합니다.
    // https://github.com/airbnb/javascript#classes--methods-use-this
    'class-methods-use-this': 'off',

    // 구현 완료후 규칙 적용 예정
    // https://github.com/airbnb/javascript#modules--prefer-default-export
    'import/prefer-default-export': 'off',

    // 규칙 추가

    // async/await 실수 방지
    'require-await': 'error',

    // 프리코스 프로그래밍 요구사항 보다 -1 (함수 분리를 더 연습하기 위해)
    'max-depth': ['error', 1],
    'max-lines-per-function': ['error', 15],

    // extends 규칙 무시

    // JSDoc과 관련된 불필요한 규칙 무시
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off',
  },

  // 테스트 코드에 불필요한 규칙 적용 x
  overrides: [
    {
      files: ['__tests__/**/*.js', 'src/utils/validators/src/**/*.js'],
      rules: {
        'max-lines-per-function': 'off',
        'no-new': 'off',
        'no-undef': 'off',
        'arrow-body-style': 'off',
        'import/export': 0,
      },
    },
  ],
};
