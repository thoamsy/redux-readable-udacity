const obj = {
  a: {
    b: 0
  }
};
const { evolve, inc } = require('ramda');

const hh = 'a';
console.log(
  evolve({
    [hh]: {
      c: () => 3
    },
    d: () => 4
  }, obj)
);
