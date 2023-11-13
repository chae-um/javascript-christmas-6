import deepFreeze from '../utils/deepFreeze.js';

export const BADGE = deepFreeze({
  santa: {
    text: '산타',
    minAmount: 20000,
  },
  tree: {
    text: 'tree',
    minAmount: 10000,
  },
  start: {
    text: '별',
    minAmount: 5000,
  },
  nothing: '없음',
});
